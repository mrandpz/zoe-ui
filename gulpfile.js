const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const ts = require('gulp-typescript');
const watch = require('gulp-watch');
const through2 = require('through2');

const requireJSON5 = require('require-json5');
const tsConfig = requireJSON5('./tsconfig.json');

const cwd = process.cwd();
const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

// =============================== typescript =====================================
// 编译ts文件
function compileTs(stream) {
  // gulp-typescript
  return stream
    .pipe(ts(tsConfig.compilerOptions))
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

// =============================== babel =================

gulp.task('default', gulp.series('watch-tsc'));
