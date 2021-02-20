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

// Gulp css
gulp.task('css', function(){
    return gulp.src([
        'assets/css/index.scss',
        // 'assets/css/scss/**/*.scss',
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css/'))
});
// Gulp thư viện css
gulp.task('css-tool', function(){
    return gulp.src([
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/jquery.meanmenu/meanmenu.min.css',
        'bower_components/slick-carousel/slick/slick-theme.css',
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/venobox/venobox/venobox.css'
    ])
    .pipe(cssmin())
    .pipe(concat('tool.min.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(bust({relativePath: './dist/css'}))
    .pipe(gulp.dest('dist/.cache/'))
});
// Gulp js
gulp.task('js', function(){
    return gulp.src([
        'assets/js/main.js',
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
});
// Gulp thư viện js
gulp.task('js-tool', function(){
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/jquery.meanmenu/jquery.meanmenu.min.js',
        'bower_components/slick-carousel/slick/slick.min.js',
        'bower_components/venobox/venobox/venobox.min.js'
    ])
    // .pipe(jsmin()) //min hơi lâu
    .pipe(concat('tool.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(bust({relativePath: './dist/js'}))
    .pipe(gulp.dest('dist/.cache/'))
});
// Gulp tất cả dạng ảnh
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
// Gulp fonts
gulp.task('fonts', function() {
    return gulp.src([
        'bower_components/font-awesome/fonts/**/*',
        'assets/fonts/**/*',
    ])
    .pipe(gulp.dest('dist/fonts'))
})


// Gulp swig
gulp.task('swig', function(){
    return gulp.src([
        'views/*.swig'
    ])
    .pipe(swig({defaults: {cache: false,},}))
    .pipe(gulp.dest("dist/"))
});


// Clean file, folder mỗi lần gulp
gulp.task('clean', function() {
    return del.sync([
        // 'dist',
        'dist/css/main.css',
        'dist/js/main.js',
        'dist/fonts',
        'dist/images',
    ])
})
// Lệnh gulp default
gulp.task('default', function () {
    runSequence('clean', 'css', 'js', 'images', 'fonts', 'swig')
})
// Lệnh watch default
gulp.task('watch', function(){
    gulp.watch('assets/**/*', ['default']); 
})


// Chia thư viện css,js ra thực thi riêng cho nhẹ task, và nén min luôn 1 lần vì nén lâu
// Clean thư viện css,js mỗi lần gulp
gulp.task('clean-tool', function() {
    return del.sync([
        'dist/css/tool.min.css',
        'dist/js/tool.min.js',
    ])
})
// Lệnh gulp gulp-tool
gulp.task('gulp-tool', function () {
    runSequence('clean-tool', 'css-tool', 'js-tool')
})

//gulp-browserify   //kiem tra css
//gulp-rename       //đổi tên file
//gulp-sass-glob    //chọn nhiều file
//gulp-jshint       //kiểm tra code js
//gulp-uglify       //giảm thiểu javascript

