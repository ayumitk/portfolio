// Gulp
const gulp = require('gulp');

// Local server
const browserSync = require('browser-sync').create();

// CSS
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const sass = require('gulp-sass');

// Images
const imagemin = require('gulp-imagemin');

// Webpack
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');


// --------------------------------------------------------------------
// Tasks
// --------------------------------------------------------------------


// Local Server + Watch
gulp.task('server', ['webpack', 'sass', 'images', 'html'], () => {
  browserSync.init({
    server: './docs/',
    cors: true
  });

  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['webpack']);
  gulp.watch('src/images/*.{png,jpg,svg}', ['images']);
  gulp.watch('src/*.html', ['html']);
});

// Webpack
gulp.task('webpack', () => webpackStream(webpackConfig, webpack)
  .pipe(gulp.dest('./docs/js'))

  .pipe(browserSync.reload({
    stream: true,
  })));

// Copy HTML
gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./docs/'))

    .pipe(browserSync.reload({
      stream: true,
    }));
});

// Compile sass into CSS & Auto-inject into browsers
gulp.task('sass', () => gulp.src('src/scss/*.scss')

  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))

  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))

  .pipe(csscomb())

  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))

  .pipe(gulp.dest('./docs/css'))

  .pipe(browserSync.reload({
    stream: true,
  })));

// Image Optimize
gulp.task('images', () => {
  gulp.src('src/images/*.{png,jpg,svg}')

    .pipe(imagemin([

      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: true
        },
        {
          cleanupIDs: false
        }
        ]
      })
    ]))

    .pipe(gulp.dest('./docs/images'));
});

gulp.task('default', ['server']);