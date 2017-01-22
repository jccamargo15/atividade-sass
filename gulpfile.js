const gulp 		= require("gulp");
const sass 		= require("gulp-sass");
const htmlmin = require('gulp-htmlmin');
const notify 	= require("gulp-notify");

/*

  Task responsável por recuperar todos arquivos no formato .scss
  e retornar para pasta css que será criada automaticamente.

*/

gulp.task("sass", function(){
	// return gulp.src(['./source/scss/*.scss']) - compila todos os SCSS
	return gulp.src(['./source/scss/style.scss']) //compila apenas o style.scss
				.pipe(sass())
				.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css"))
});

/*

	Task responsável por minificar os arquivos html e remover os espaços em branco

*/

gulp.task("html", function() {
  return gulp.src("./source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./dist"));
});

/*

	Task responsável por executar de fundo todas a mudanças que houver nos arquivos SCSS

*/

gulp.task("sass:watch", function(){
	gulp.watch("./source/scss/**/*.scss", ['sass']);
});

/*

	Task responsável por executar de fundo todas a mudanças que houver nos arquivos HTML

*/

gulp.task("html:watch", function(){
	gulp.watch("./source/*.html", ['html'])
});

/*
  Task default para iniciar apenas com o comando "gulp" no terminal
*/

gulp.task("default",['sass', 'html', 'sass:watch', 'html:watch']);