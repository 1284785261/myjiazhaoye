//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),                               // 本地安装gulp
    notify = require("gulp-notify"),                      // 加控制台文字描述
    sass = require('gulp-ruby-sass'),                     // sass文件文件编译
    //sass = require('gulp-sass'),                        // sass文件文件编译
    // less = require('gulp-less'),                          // sass文件文件编译（需要ruby环境）
    cssmin = require('gulp-minify-css'),                  // css压缩
    uglify = require('gulp-uglify'),                      // 压缩js
    concat = require('gulp-concat'),                      // 合并js
    postcss = require('gulp-postcss'),                    // css文件编译后处理
    spritesmith = require('gulp.spritesmith'),            // 拼图插件
    livereload = require('gulp-livereload'),              // 自动刷新
    webserver = require('gulp-webserver'),                // 本地服务器
    autoprefixer = require('autoprefixer'),
    plumber = require('gulp-plumber'),                    // 任务错误中断自动重传
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename');                      // 重命名

//运行错误后自动中断执行
var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);
    this.emit('end');
};

// 合并第三方js库
gulp.task('scripts', function () {
    return gulp.src([
        './src/lib/es5-shim.js',//ECMAScript 5的新特性
        //'./src/lib/accordion.js',//手风琴（可选）
        //'./src/lib/carousel.min.js',//无缝滚动（可选）
        './src/lib/jquery.hDialog.js',//弹框
        './src/lib/jquery.tab1.0.1.js',//tab切换
        //'./src/lib/jquery.easing.min.js',//动画扩展http://www.helloweba.com/demo/easing/
        //'./src/lib/jqueryRtate.2.2.js',//抽奖转盘
        './src/lib/jquery-powerFloat.js',//提示框
        './src/lib/jquery.SuperSlide.2.1.1.js',//轮播
        './src/lib/select.js',//重置选择框
        './src/lib/html5shiv.min.js',//H5标签兼容
        './src/lib/moment.min.js', //H5标签兼容
        './src/lib/WdatePicker.js', //选择日期控件
        //'./src/lib/layer.js',
        //'./src/lib/placeholder.js',
        './src/lib/jquery-placeholder.js'
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify()) //压缩文件，部署时启用
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// 合并photoswipe.js
gulp.task('photoswipe', function () {
    return gulp.src([
        './src/lib/photoswipe/photoswipe.js',
        './src/lib/photoswipe/photoswipe-ui-default.js',
        './src/lib/photoswipe/initPhotoSwipeFromDOM.js'
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('photoswipe.all.js'))
        .pipe(uglify()) //压缩文件，部署时启用
        .pipe(gulp.dest('./dist/js/'))
        //.pipe(uglify()) //压缩文件，部署时启用
        //.pipe(rename({ extname: '.min.js' }))
        //.pipe(gulp.dest('./dist/js/'));
});

// 合并自定义js
gulp.task('customJs', function () {
    return gulp.src('./src/js/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        //.pipe(uglify()) //压缩文件，部署时启用
        .pipe(concat('custom.js'))
        .pipe(gulp.dest('./dist/js'));
});
// 拼图
gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprites.scss',
        cssFormat: 'css',
        imgPath: '../images/sprites/sprite.png'
    }));
    spriteData.img
        .pipe(gulp.dest('./dist/images/sprites'));
    spriteData.css
        .pipe(gulp.dest('./src/scss/help/'));
});

// poatcss
gulp.task('css', function () {
    var processors = [
        autoprefixer("last 50 version","ie >= 8")
        //cssnano
    ];

     return sass('./src/scss/main.scss')
         .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: onError
        }))
        //.pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
         //.pipe(cssmin())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./dist/css'));
});
//搭建本地服务器
gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(webserver({
            port: 1111,
            livereload: true,
            directoryListing: false,
            open: true
        }));
});
//监听项目 即时刷新
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/sprites/*.png', ['sprite']);
    gulp.watch('./src/js/*.js', ['customJs']);
    gulp.watch('./src/lib/*.js', ['scripts']);
    gulp.watch('./dist/index.html');
});
gulp.task('default', ['css','webserver','sprite','customJs','scripts','watch']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径