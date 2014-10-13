var gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglifyjs'),
    livereload = require('gulp-livereload'),
    server = require('tiny-lr')(),
    nodemon = require('gulp-nodemon'),
    testplugin = require('gulp-testplugin');

var filepaths = {
    scripts: [ 'src/app/js/**/*.js', '!src/app/js/combined*.js' ]
};

gulp.task('styles', function(){
    gulp.src('src/app/less/main.less')
        .pipe(less({ cleancss: true }))
        .pipe(prefix())
        .pipe(rename('combined-gulp.min.css'))
        .pipe(gulp.dest('src/app/css/'))
        .pipe(livereload());
});

gulp.task('scripts', function(){
    gulp.src(filepaths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify('combined-gulp.min.js', { mangle: false }))
        .pipe(gulp.dest('src/app/js/'))
        .pipe(livereload());
});

gulp.task('nodemon', function(){
    nodemon({ script: 'src/server.js' });
});

gulp.task('watch', [ 'nodemon' ], function(){
    livereload.listen();

    gulp.watch('src/app/less/**/*.less', [ 'styles' ]);
    gulp.watch(filepaths.scripts, [ 'scripts' ]);
});

gulp.task('default', [ 'watch' ]);

gulp.task('test', function() {
    gulp.src('test/src/test.js')
    .pipe(testplugin('/* Comment added with Gulp */'))
    .pipe(rename('test/result/test.gulp.js'))
    .pipe(gulp.dest('./'));
});
