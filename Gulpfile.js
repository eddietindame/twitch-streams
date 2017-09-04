const gulp = require("gulp");
const gutil = require("gulp-util");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const chalk = require("chalk");
const browserify = require("browserify");
const babelify = require("babelify");
const jshint = require("gulp-jshint");
const rename = require("gulp-rename");
const sass = require("gulp-ruby-sass");
const autoprefixer = require("gulp-autoprefixer");
const newer = require("gulp-newer");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

const paths = {
  APP_ENTRY: "./src/js/index.jsx",
  HTML: "",
  SCSS: "./src/scss/styles.scss",
  CSS: "./build/assets/css",
  JS_DEST: "./build/assets/js"
};

gulp.task("jshint", function() {
  return gulp.src(["./src/js/**/*.js"])
    .pipe(jshint({
      "esnext": true
    }))
    .pipe(jshint.reporter());
});

gulp.task("js", ["jshint"], function() {
  const b = browserify({
    entries: paths.APP_ENTRY,
    debug: true
  }).transform("babelify", {
    presets: ["env", "react"]
  });

  return b.bundle()
    .pipe(source("index.jsx"))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadmaps: true
    }))
      .on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(rename("app.js"))
    .pipe(gulp.dest(paths.JS_DEST))
});

// gulp.task("copy-react", function() {
//   return gulp.src("node_modules/react/dist/react.js")
//     .pipe(newer("src/js/vendor/react.js"))
//     .pipe(gulp.dest("src/js/vendor"));
// });
// gulp.task("copy-react-dom", function() {
//   return gulp.src("node_modules/react-dom/dist/react-dom.js")
//     .pipe(newer("src/js/vendor/react-dom.js"))
//     .pipe(gulp.dest("src/js/vendor"));
// });

gulp.task("css", () =>
	sass(paths.SCSS)
		.on("error", sass.logError)
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
    .pipe(rename("styles.css"))
		.pipe(gulp.dest(paths.CSS))
);

gulp.task("html", function() {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest("./build"))
})

gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.scss", ["css"]);
  gulp.watch(["src/js/**/*.js"], ["js"]);
  gulp.watch(["src/index.html"], ["html"]);
});

gulp.task("build", ["js","css","html"]);

gulp.task("default",["build","watch"]);
