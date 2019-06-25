const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const fs = require('fs');
const merge = require('merge-stream');
const watch = require('gulp-watch');
// 获取路径

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

const scssPath = 'components';

//任务1:sass->css:
gulp.task('compileSass', function() {
  const folders = getFolders(scssPath); // button style 等
  const tasks = folders.map(function(folder) {
    return watch(path.join(scssPath, folder, 'style/*.scss'), () => {
      gulp
        .src(path.join(scssPath, folder, 'style/*.scss'))
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(path.join(scssPath, folder, 'style')));
    });
  });
  return merge(tasks);
});

gulp.task('default', gulp.series('compileSass'));
