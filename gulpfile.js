var gulp = require('gulp');                 //gọi gulp
var sass = require('gulp-sass');            //chuyển sass thành css
var cssmin = require('gulp-cssmin');        //nén min file
var jsmin = require('gulp-jsmin');          //nén min file
var concat = require("gulp-concat");        //nối nội dung file
var bust = require('gulp-buster');          //tạo bộ nhớ cache
var imagemin = require('gulp-imagemin');    //nén ảnh
var cache = require('gulp-cache');          //tạo cache lưu ảnh trên local
var del = require('del');                   //xoá
var runSequence = require('run-sequence');  //đảm bảo các task chạy tuần tự trong default gulp
var watch = require('watch');               //theo dõi sự thay đổi của file va tu dong gulp
var swig = require("gulp-swig");            //truyền file, truyền biến như trong php, laravel blade

//gulp css
gulp.task('css', function(){
    return gulp.src([
        'assets/css/index.scss',
        // 'assets/css/scss/**/*.scss',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css/'))
});
//gulp thư viện css
gulp.task('css-tool', function(){
    return gulp.src([
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/jquery.meanmenu/meanmenu.min.css',
        'bower_components/slick-carousel/slick/slick-theme.css',
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/venobox/venobox/venobox.css'
        // 'dist/css/style.css',
    ])
    .pipe(cssmin())
    .pipe(concat('tool.min.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(bust({relativePath: './dist/css'}))
    .pipe(gulp.dest('dist/.cache/'))
});
//gulp js
gulp.task('js', function(){
    return gulp.src([
        'assets/js/main.js',
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
});
//gulp thư viện js
gulp.task('js-tool', function(){
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/jquery.meanmenu/jquery.meanmenu.min.js',
        'bower_components/slick-carousel/slick/slick.min.js',
        'bower_components/venobox/venobox/venobox.min.js'
        // 'assets/js/main.js',
    ])
    // .pipe(jsmin()) //min lau lam nen lam khi ban giao khach thoi
    .pipe(concat('tool.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(bust({relativePath: './dist/js'}))
    .pipe(gulp.dest('dist/.cache/'))
});
//nén tất cả dạng ảnh
gulp.task('images', function(){
    return gulp.src([
        'assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
        // 'bower_components/slick-carousel/slick/ajax-loader.gif',
    ])
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});
//coppy fonts
gulp.task('fonts', function() {
    return gulp.src([
        'bower_components/font-awesome/fonts/**/*',
        'assets/fonts/**/*',
    ])
    .pipe(gulp.dest('dist/fonts'))
})


//swig
gulp.task('swig', function(){
    return gulp.src([
        'views/*.swig'
    ])
    .pipe(swig({defaults: {cache: false,},}))
    .pipe(gulp.dest("dist/"))
});


//xoá dist mỗi lần gulp
gulp.task('clean', function() {
    return del.sync('dist');
})
//lệnh gulp default
gulp.task('default', function () {
    runSequence('clean', 'css-tool', 'css', 'js-tool', 'js', 'images', 'fonts', 'swig')
})
//watch
gulp.task('watch', function(){
    gulp.watch('assets/**/*', ['default']); 
})

//gulp-browserify   //kiem tra css
//gulp-rename       //đổi tên file
//gulp-sass-glob    //chọn nhiều file
//gulp-jshint       //kiểm tra code js
//gulp-uglify       //giảm thiểu javascript

