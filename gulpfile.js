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