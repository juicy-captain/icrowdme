var syntax = 'scss'; // Syntax: sass or scss;

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    runSequence = require('run-sequence'),
    njkRender = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    rsync = require('gulp-rsync');


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'public/'
        },
        notify: false,
        open: false,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
});

gulp.task('styles', function () {
    return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
        .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions', 'IE 8-11']))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
});

gulp.task('nunjucks', function () {
    return gulp.src('app/core/pages/*.+(html|njk|json)')
        .pipe(data(function () {
            return require('./app/core/data.json')
        }))
        .pipe(njkRender({
            path: ['app/core/templates']
        }))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('collect-fonts', function () {
    return gulp.src(`app/fonts/**`)
        .pipe(gulp.dest(`public/fonts`));
});
gulp.task('collect-images', function () {
    return gulp.src('app/img/**')
        .pipe(gulp.dest(`public/img`));
});
gulp.task('collect-styles', function () {
    return gulp.src('app/css/**')
        .pipe(gulp.dest(`public/css`));
});
gulp.task('collect-js', function () {
    return gulp.src(['app/libs/scripts/**',
        'app/libs/jquery/dist/jquery.min.js',
    ])
        .pipe(gulp.dest(`public/js`));
});

gulp.task('clean', function () {
    return gulp.src([`public/`], {read: false})
        .pipe(clean());
});

gulp.task('js', function () {
    return gulp.src([
        'app/js/menu.js',
        'app/js/owl.js',
        'app/js/tabs.js',
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Mifify js (opt.)
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('rsync', function () {
    return gulp.src('app/**')
        .pipe(rsync({
            root: 'app/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Includes files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
});

gulp.task('watch', ['styles', 'js', 'browser-sync', 'nunjucks', 'collect-fonts', 'collect-images', 'collect-styles', 'collect-js'], function () {
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
    gulp.watch(['libs/**/*.js', 'app/js/menu.js'], ['js']);
    gulp.watch('app/core/**/*.+(html|njk|json)', ['nunjucks']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', function () {
    return runSequence(
        ['clean'],
        ['watch']
    )
});
