// Gulp
const gulp = require("gulp");

// Webpack
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config");

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


// --------------------------------------------------------------------
// Tasks
// --------------------------------------------------------------------

// Local Server + Watch
gulp.task('server', ['webpack', 'sass', 'images', 'html'], () => {

	browserSync.init({
		server: "./"
	});

	gulp.watch("src/scss/*.scss", ['sass']);
	gulp.watch("src/js/*.js", ['webpack']);
	gulp.watch("src/images/*.{png,jpg,svg}", ['images']);
	gulp.watch("src/*.html", ['html']);
});

// Webpack
gulp.task('webpack', function () {
	return webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest("./js"))

		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Copy HTML
gulp.task('html', function () {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./'))

		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Compile sass into CSS & Auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src("src/scss/*.scss")

		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))

		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))

		.pipe(csscomb())

		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))

		.pipe(gulp.dest("./css"))

		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Image Optimize
gulp.task('images', function () {
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

		.pipe(gulp.dest('./images'));
});

gulp.task('default', ['server']);