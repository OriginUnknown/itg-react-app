const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const babel = require('babel-register');
const sass = require('gulp-sass');
const mocha = require('gulp-mocha');
const server = require('gulp-develop-server');
const tap = require('gulp-tap');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');

gulp.task('js', () =>
    gulp.src(['src/**/*.js', '!src/api', '!src/api/**'], { base:'src/' })
    // transform file objects using gulp-tap plugin then replace file contents with browserify's bundle stream
    .pipe(tap(function (file) {
        file.contents = browserify({ entries: file.path, extensions: ['.js'], debug: true })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle();
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('bundle:js', () =>
    gulp.src('./dist/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('js:watch', () => {
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('sass', () =>
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
);

gulp.task('bundle:css', () =>
    gulp.src('dist/**/*.css')
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('./dist'))
);

gulp.task('copy-images', () =>
    gulp.src('./images/*.{gif,jpg,png,svg}')
        .pipe(gulp.dest('./dist/images'))
    );

gulp.task('sass:watch', () => {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('test', () => {
    return gulp.src('./test/*.spec.js', {read: false})
        .pipe(mocha({
            compilers: babel,
            require: ['./setupTest.js']
        }));
});

gulp.task('server', () => {
    server.listen( { path: './index.js' } );
});

gulp.task('server:watch', () => {
    gulp.watch( [ './server.js' ], server.restart );
});

gulp.task('default', ['sass', 'js'], () => {
  gulp.start('bundle:css', 'sass:watch', 'bundle:js', 'js:watch', 'copy-images', 'server', 'server:watch');
});
