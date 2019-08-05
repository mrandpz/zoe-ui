const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const ts = require('gulp-typescript');
const watch = require('gulp-watch');
const through2 = require('through2');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const stripCode = require('gulp-strip-code');
const rimraf = require('rimraf');
const webpack = require('webpack');
const merge2 = require('merge2');

const { getProjectPath } = require('./gulpConfig/utils/projectHelper');
const tsConfig = require('./gulpConfig/getTSCommonConfig')();
const BabelCommonConfig = require('./gulpConfig/BabelCommonConfig');
const replaceLib = require('./gulpConfig/replaceLib');

const getConfig = require('./gulpConfig/tool-config');
const { cssInjection } = require('./gulpConfig/utils/styleUtil');
const transformLess = require('./gulpConfig/transformLess');

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

const cwd = process.cwd();
const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

const tsDefaultReporter = ts.reporter.defaultReporter();
// =============================== typescript =====================================
// 编译ts文件
function compileTs(stream) {
  // gulp-typescript
  return stream
    .pipe(ts(tsConfig))
    .js.pipe(
      // 每个流文件编译后，push到
      through2.obj(function(file, encoding, next) {
        // console.log(file.path, file.base);
        file.path = file.path.replace(/\.[jt]sx$/, '.js');
        this.push(file);
        next();
      }),
    )
    .pipe(gulp.dest(process.cwd()));
}

// 编译ts文件
gulp.task('tsc', () =>
  compileTs(
    gulp.src(tsFiles, {
      base: cwd,
    }),
  ),
);

// 启动watch，检测到tsFiles的改动
gulp.task(
  'watch-tsc',
  gulp.series('tsc', () => {
    // 执行tsc任务后
    watch(tsFiles, f => {
      if (f.event === 'unlink') {
        const fileToDelete = f.path.replace(/\.tsx?$/, '.js');
        // ？？
        if (fs.existsSync(fileToDelete)) {
          fs.unlinkSync(fileToDelete);
        }
        return;
      }
      const myPath = path.relative(cwd, f.path);
      compileTs(
        gulp.src([myPath, 'typings/**/*.d.ts'], {
          base: cwd,
        }),
      );
    });
  }),
);
// =============================== typescript =====================================

// =============================== babel =================
// 包分两种 一种是es6，比如在eletron中运行 一种是es5，一种在lib中运行
function babelify(js, modules) {
  const babelConfig = BabelCommonConfig(modules);
  // 如果是打包成lib的加个插件，将源码中的lib转换为es
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }
  // 增加sourcemaps
  let stream = js
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(
      through2.obj(function(file, encoding, next) {
        this.push(file.clone());
        // 如果是style/index.js,就转为 css.js
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);

          // cssInjection将内容中引用style的地方转为引用style/css
          file.contents = Buffer.from(cssInjection(content));

          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
        }
        next();
      }),
    )
    .pipe(sourcemaps.write('.'));
  if (modules === false) {
    // 增加注释
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      }),
    );
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}
// =============================== babel =================

// =============================== compile includes  =================
function compile(modules) {
  // 删除目录
  rimraf.sync(modules === false ? esDir : libDir);
  // 想用sass，但是ant-tool用的是less，为了学习先使用less
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function(file, encoding, next) {
        this.push(file.clone());
        // style/index.less
        // style/v2-compatible-reset.less
        if (
          file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
          file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)
        ) {
          transformLess(file.path)
            .then(css => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  const assets = gulp
    .src(['components/**/*.@(png|svg)'])
    .pipe(gulp.dest(modules === false ? esDir : libDir));

  let error = 0;
  const source = ['components/**/*.tsx', 'components/**/*.ts', 'typings/**/*.d.ts'];

  if (tsConfig.allowJs) {
    source.unshift('components/**/*.jsx');
  }

  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e); // ts 默认的错误报告
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    }),
  );

  function check() {
    if (error && !argv['ignore-error']) {
      // 如果有错误，就失败退出
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);

  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([less, tsFilesStream, tsd, assets]);
}
// =============================== compile includes  end=================

// =============================== dist =================
function dist(done) {
  rimraf.sync(getProjectPath('dist'));
  // 打包dist目录的时候要用到
  process.env.RUN_ENV = 'PRODUCTION';
  // getProject 以便于后面放放在tool下
  const webpackConfig = require(getProjectPath('webpack.config.js'));
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const { dist: { finalize } = {} } = getConfig;
    if (finalize) {
      console.log('[Dist] Finalization...');
      finalize();
    }

    done(0);
  });
}
// =============================== dist end=================

// =============================== task =================
// 编译成 es
gulp.task('compile-with-es', done => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', done);
});

gulp.task('compile-finalize', done => {
  const { compile: { finalize } = {} } = getConfig;
  if (finalize) {
    console.log('[Compile] Finalization...');
    finalize();
  }
  done();
});

gulp.task(
  'dist',
  gulp.series(done => {
    dist(done);
  }),
);

gulp.task(
  'compile',
  gulp.series(gulp.parallel(['compile-with-es', 'compile-with-lib']), 'compile-finalize', 'dist'),
);

// =============================== task end=================
gulp.task('default', gulp.series('compile', 'watch-tsc'));
