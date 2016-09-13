var gulp = require('gulp');
var responsive = require('gulp-responsive');
var imageOptim = require('gulp-imageoptim');
var sizes = [1, 0.75, 0.5, 0.25, 0.2, 0.15, 0.1, 0.05];

gulp.task('images', ['logos', 'screenshots', 'screenshots-16x9', 'covers', 'misc'], function() {
  console.log('building files');
});

gulp.task('logos', function () {
  return gulp.src('originals/logos/*.{png,jpg}')
    .pipe(responsive({
      '*.*': sizes.map(function(size) {
        return {
          width: '' + (size * 100) + '%',
          rename: {
            suffix: size === 1 ? '' : ('@' + size + 'x')
          }
        }
      })
    }))
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('dist/logos'));
});

gulp.task('screenshots', function () {
  return gulp.src('originals/screenshots/*.{png,jpg}')
    .pipe(responsive({
      '*.*': sizes.map(function(size) {
        return {
          width: '' + (size * 100) + '%',
          quality: 85,
          format: 'jpeg',
          rename: {
            suffix: size === 1 ? '' : ('@' + size + 'x'),
            extname: '.jpg'
          }
        }
      })
    }))
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('dist/screenshots'));
});

gulp.task('crop', function() {
  var width = `100%`,
      height = `56.25w`;
  return gulp.src('originals/screenshots/*.{png,jpg}')
    .pipe(responsive({
      '*.*': {
        width: width,
        height: height,
        crop: { type: 'gravity', value: 'north' }
      }
    }))
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('originals/screenshots/16x9'));
});

gulp.task('screenshots-16x9', function () {
  return gulp.src('originals/screenshots/16x9/*.{png,jpg}')
    .pipe(responsive({
      '*.*': sizes.map(function(size) {
        return {
          width: '' + (size * 100) + '%',
          quality: 85,
          format: 'jpeg',
          rename: {
            suffix: (size === 1 ? '' : ('@' + size + 'x')),
            extname: '.jpg'
          }
        }
      })
    }))
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('dist/screenshots/16x9'));
});

gulp.task('covers', function () {
  return gulp.src('originals/covers/*.{png,jpg}')
    .pipe(responsive({
      '*.*': sizes.map(function(size) {
        return {
          width: '' + (size * 100) + '%',
          quality: 85,
          format: 'jpeg',
          rename: {
            suffix: size === 1 ? '' : ('@' + size + 'x'),
            extname: '.jpg'
          }
        }
      })
    }))
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('dist/covers'));
});

gulp.task('misc', function () {
  return gulp.src('originals/misc/*.{png,jpg}')
    .pipe(responsive({
      '*.*': sizes.map(function(size) {
        return {
          width: '' + (size * 100) + '%',
          quality: 85,
          format: 'jpeg',
          rename: {
            suffix: size === 1 ? '' : ('@' + size + 'x'),
            extname: '.jpg'
          }
        }
      })
    }))
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest('dist/misc'));
});
