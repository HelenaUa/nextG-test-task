const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const del = require("del");

// Шляхи
const paths = {
  html: {
    src: "src/*.html",
    dest: "docs/"
  },
  styles: {
    src: "src/scss/**/*.scss",
    dest: "docs/css/"
  },
  images: {
    src: "src/images/**/*",
    dest: "docs/images/"
  }
};

// Очистка папки docs
function clean() {
  return del(["docs"]);
}

// HTML
function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// SCSS → CSS
function styles() {
  return src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Копіювання картинок
function images() {
  return src(paths.images.src)
    .pipe(dest(paths.images.dest));
}

// Watch + BrowserSync
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "docs/"
    },
    notify: false
  });
  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.images.src, images);
}

// Експорти
exports.default = series(clean, parallel(html, styles, images), watchFiles);
exports.build = series(clean, parallel(html, styles, images));






