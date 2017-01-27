// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    scssSources: 'dev/assets/scss',
    outputRoot: 'dist'
};

// Import required dependencies.
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncReload = browserSync.reload,
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify');

var browserSyncConfig = {
    server: {
        baseDir: './' + projectPaths.outputRoot
    },
    files: [
        projectPaths.outputRoot + '/assets/css/*.css',
        projectPaths.outputRoot + '/*.html',
        projectPaths.outputRoot + '/assets/js/*.js'
    ]
};

gulp.task('sass', function() {
    return gulp.src(projectPaths.scssSources + '/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(projectPaths.outputRoot + '/assets/css'))
        .pipe(filter('**/*.css'))
        .pipe(browserSyncReload({stream: true}));
});

gulp.task('scripts', function() {
    gulp.src('./dev/assets/js/**/*.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest(projectPaths.outputRoot + '/assets/js'))
});

gulp.task('images', function () {
    gulp.src('./dev/assets/img/*.*')
        .pipe(gulp.dest(projectPaths.outputRoot + '/assets/img'));
});

//Unico para fonteweson
gulp.task('fonts', function () {
    gulp.src('node_modules/font-awesome/fonts/*.*')
        .pipe(gulp.dest(projectPaths.outputRoot + '/assets/fonts/'));
});

gulp.task('browser-sync', function() {
    browserSync(browserSyncConfig);
});

gulp.task('jade-compile', function () {
    gulp.src('./dev/**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(projectPaths.outputRoot));
});

gulp.task('copy-html', function() {
    gulp.src(['./src/html/**/*.html'])
        .pipe(gulp.dest(projectPaths.outputRoot));
});

gulp.task('watch', function() {
    gulp.watch(projectPaths.scssSources + '/*.scss', ['sass']);

    gulp.watch('dev/assets/js/**/*.js', ['scripts']);

    gulp.watch('dev/**/*.jade', ['jade-compile']);

    gulp.watch('dev/**/*.html', ['copy-html']);
});

gulp.task('default', ['sass', 'scripts', 'jade-compile', 'copy-html', 'images', 'fonts', 'browser-sync', 'watch']);