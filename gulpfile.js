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
        .pipe(gulp.dest("dist/"));
})

/**
 * 2.静态文件
 * 拷贝图片
 */
gulp.task("images", function () {
    return gulp.src("img/**/*")
        .pipe(gulp.dest("dist/images"));
})

/**
 * 3.拷贝多个目录及文件到一个目录中
 */
gulp.task("data", function () {
    return gulp.src(["json/*.json", "xml/*.xml", "!xml/*.bak.xml"])
        .pipe(gulp.dest("dist/data"));
})

/**
 * 4.一次性执行多个任务的操作
 */
gulp.task("build",["copy-html","images","data"],function(){
    console.log("执行任务完毕...");
})