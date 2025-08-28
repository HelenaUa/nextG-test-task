const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

// SCSS → CSS
function styles() {
  return gulp.src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return gulp.src("src/js/**/*.js")
    .pipe(terser())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

// HTML
function html() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// Сервер
function serve() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/**/*.html", html);
}

exports.default = gulp.series(gulp.parallel(styles, scripts, html), serve);

