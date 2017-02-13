/**
 * Gulp综合示例
 * 1.LESS编译、压缩、合并
 * 2.JS合并、压缩混淆
 * 3.image复制
 * 4.html压缩、复制
 * 5.浏览器同步：当项目文件被修改时浏览器自动同步刷新
 */

'use strict';

//加载模块
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('browser-sync').create();

//1.LESS编译、压缩、合并，less可以@import导入，无需合并
gulp.task('less',function () {
	gulp.src(['src/less/*.less','!src/less/_*.less']) //传入数组，指定匹配规则
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

//2.JS合并、压缩混淆
gulp.task('js',function () {
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

//3.image复制
gulp.task('image',function() {
	 gulp.src('src/images/*.*')
	 	.pipe(gulp.dest('dist/images'))
	 	.pipe(browserSync.stream());
});

//4.html压缩、复制
gulp.task('html',function () {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true, //去除空白
			removeComments:true, //去除注释
			collapseBooleanAttributes:true, //去除boolean属性
			removeAttributeQuotes:true, //去除属性的引号
			removeEmptyAttributes:true,
			removeScriptTypeAttributes:true,
			removeStyleLinkTypeAttributes:true,
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream()); //浏览器同步更新
});

//5.浏览器同步：当项目文件被修改时浏览器自动同步刷新
gulp.task('serve',function () {
	browserSync.init({
		server:{
			baseDir:'./dist'
		},
		port:2017,
	});

	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);

});







