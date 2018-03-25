const gulp = require("gulp")
const gutil = require("gulp-util")
const source = require("vinyl-source-stream")
const buffer = require("vinyl-buffer")
const browserify = require("browserify")
const babelify = require("babelify")
const webserver = require('gulp-webserver')
const jshint = require("gulp-jshint")
const rename = require("gulp-rename")
const sass = require("gulp-ruby-sass")
const autoprefixer = require("gulp-autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const opn = require('opn')

const paths = {
  APP_ENTRY: "./src/js/index.jsx",
  HTML: "",
  SCSS: "./src/scss/styles.scss",
  CSS: "./build/assets/css",
  JS_DEST: "./build/assets/js"
}

const server = {
  HOST: 'localhost',
  PORT: '6969'
}

gulp.task('webserver', () => {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.HOST,
      port:             server.PORT,
      livereload:       true,
      directoryListing: true,
      proxies: [{
        source: "http://localhost:6969/abc",
        target: "http://www.google.com"
      }]
    }))
})

gulp.task('openbrowser', () => {
  opn( 'http://' + server.HOST + ':' + server.PORT + '/build/index.html', {app: ['google chrome']} )
})

gulp.task("jshint", () => {
  return gulp.src(["./src/js/**/*.js"])
    .pipe(jshint({
      "esnext": true
    }))
    .pipe(jshint.reporter())
})

gulp.task("js", ["jshint"], () => {
  const b = browserify({
    entries: paths.APP_ENTRY,
    debug: true
  }).transform("babelify", {
    presets: ["env", "react"]
  })

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
})

gulp.task("css", () =>
	sass(paths.SCSS)
		.on("error", sass.logError)
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
    .pipe(rename("styles.css"))
		.pipe(gulp.dest(paths.CSS))
)

gulp.task("html", () => {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest("./build"))
})

gulp.task("assets", () => {
  return gulp.src("./src/assets/*.svg")
    .pipe(gulp.dest("./build/assets/img"))
})

gulp.task("watch", () => {
  gulp.watch("src/scss/**/*.scss", ["css"])
  gulp.watch(["src/js/**/*.js*"], ["js"])
  gulp.watch(["src/index.html"], ["html"])
})

gulp.task("build", ["js","css","html","assets"])
gulp.task("server", ["watch","webserver"])
gulp.task("default",["build","server","openbrowser"])
