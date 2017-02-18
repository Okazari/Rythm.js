var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rollup = require('rollup').rollup

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('build', function() {
  return rollup({
    entry: './src/rythm.js'
  }).then(function(bundle) {
    bundle.write({
      format: 'umd',
      moduleName: 'Rythm',
      dest: './rythm.js'
    })
  })
})

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['build'])
})

gulp.task('default', ['build', 'serve', 'watch'])