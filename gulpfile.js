const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const fs = require('fs');
const merge2 = require('merge2');
const watch = require('gulp-watch');
const { execSync } = require('child_process');

// 获取路径
const env = process.env.NODE_ENV;
console.log(env);
if (env === 'development') {
  const watchPath = './components/**/style/*.scss';
  // 不用填写后缀
  const outPut = './components/button/style';

  function getFolders(dir) {
    return fs.readdirSync(dir).filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
  }

  const scssPath = 'components';

  //任务1:sass->css:
  gulp.task('compileSass', function() {
    const folders = getFolders(scssPath);
    const tasks = folders.map(function(folder) {
      var inPath = `./${scssPath}/${folder}/style/*.scss`;
      var outPath = `./${scssPath}/${folder}/style`;

      return gulp
        .src(inPath)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(outPath));
    });
    return merge2(tasks);
  });

  gulp.task('default', function() {
    execSync(`rimraf .docz && docz dev`);
    watch(`${scssPath}/**/*.scss`, gulp.series('compileSass'));
  });
} else {
  // 发到正式环境

  const packageJson = fs.readFileSync('./package.json', 'utf-8');

  function tag() {
    console.log('tagging');
    const { version } = JSON.parse(packageJson);
    execSync(`git tag ${version}`);
    execSync(`git push origin ${version}:${version}`);
    execSync('git push origin master:master');
    console.log('tagged');
  }
  gulp.task('default', function(x) {
    tag();
    x();
  });
}
