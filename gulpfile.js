/**
 * 遵循 CommonJs 规范
 * 1.require() 将模块引入
 * 2.使用该模块中定义的函数
 */
const gulp = require("gulp");

//编写第一个任务
/**
 * 第一个参数: 任务的名字 自定义
 * 第二个参数: 回调函数, 任务执行的功能
 */
gulp.task("hello", function () {
    console.log("hello world!");
})

/**
 * gulp.src() 设置源文件路径
 * gulp.dest() 设置目标文件路径, 如果不存在, 会自动创建
 * pipe() 程序运行管道 作用相当于copy
 */

//1.整理html文件
gulp.task("copy-html", function () {
    return gulp.src("index.html")
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
})

/**
 * 2.静态文件
 * 拷贝图片
 */
gulp.task("images", function () {
    return gulp.src("img/**/*")
        .pipe(gulp.dest("dist/images"))
        .pipe(connect.reload());
})

/**
 * 3.拷贝多个目录及文件到一个目录中
 */
gulp.task("data", function () {
    return gulp.src(["json/*.json", "xml/*.xml", "!xml/*.bak.xml"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload());
})

/**
 * 4.一次性执行多个任务的操作
 */
gulp.task("build", ["copy-html", "images", "data"], function () {
    console.log("执行任务完毕...");
})



/**
 * 使用插件的步骤:
 * 1.下载插件到本地 npm i plugin -D
 * 2.通过require()引入文件
 * 3.查阅插件的用法
 */
// 插件一: gulp-sass 编译Sass(Scss)
const sass = require("gulp-sass");
// 插件二: gulp-minify-css 压缩css文件
const minifyCss = require("gulp-minify-css");
// 插件三: gulp-rename 重命名
const rename = require("gulp-rename");

gulp.task("sass", function () {
    return gulp.src("stylesheet/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(minifyCss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
})

/**
 * 处理js文件的插件
 * 插件四: gulp-concat 合并文件
 * 插件五: gulp-uglify 压缩js文件
 */
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("scripts", function () {
    return gulp.src("javascript/*.js")
        .pipe(concat("index.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("index.min.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
})

/**
 * 监听: 如果监听到文件有改动, 会自动去执行相应的任务, 更新数据
 */
gulp.task("watch", function () {
    /**
     * 第一个参数: 文件监听的路径
     * 第二个参数: 将要执行的任务
     */
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch("img/**/*", ["images"]);
    gulp.watch(["json/*.json", "xml/*.xml", "!xml/*.bak.xml"], ["data"]);
    gulp.watch("stylesheet/index.scss", ["sass"]);
    gulp.watch("javascript/*.js", ["scripts"]);
})

/**
 * 插件六: gulp-connect 启动一个服务器
 */
const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "dist", //设置根目录
        port: 8888,
        livereload: true //启动实时刷新功能
    })
})

// 同时启动监听和服务器 default 我们可以在控制台直接通过 gulp 来启动, 后面不需要跟任务名
gulp.task("default", ["watch", "server"]);

/**
 * 后记:
 * 1.JQuery 编写的代码不要合并和压缩
 * 2.给别人代码时, node_modules 删除,
 *   拿到给项目后, 通过 npm install 重新下载依赖
 */