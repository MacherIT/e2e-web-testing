const gulp = require("gulp");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const ngAnnotate = require("gulp-ng-annotate");
const refresh = require("gulp-refresh");

gulp.task("js_site", () => {
  gulp
    .src(["app/site/src/js/**/!(_)*.js", "app/site/src/js/**/_*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("static/site/js/app.min.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(refresh());

  gulp
    .src(["app/site/src/libs/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("static/site/js/libs.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(refresh());
});

gulp.task("js_watch", ["js_site"], () => {
  refresh.listen(35729);
  gulp.watch(
    [
      "app/site/src/js/**/!(_)*.js",
      "app/site/src/js/**/_*.js",
      "app/site/src/libs/**/*.js"
    ],
    ["js_site"]
  );
});

gulp.task("js_site_d", () => {
  gulp
    .src(["app/site/src/js/**/!(_)*.js", "app/site/src/js/**/_*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("dist/js/app.min.js"))
    // .pipe(concat("dist/static/site/js/app.min.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."));

  gulp
    .src(["app/site/src/libs/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("dist/js/libs.min.js"))
    // .pipe(concat("dist/static/site/js/libs.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."));
});

gulp.task("js_dist", ["js_site_d"]);



gulp.task("js_admin", () => {
  gulp
    .src(["app/admin/src/js/**/!(_)*.js", "app/admin/src/js/**/_*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("static/admin/js/app.min.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(refresh());

  gulp
    .src(["app/admin/src/libs/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("static/admin/js/libs.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(refresh());
});

gulp.task("js_watch_admin", ["js_admin"], () => {
  refresh.listen(35729);
  gulp.watch(
    [
      "app/admin/src/js/**/!(_)*.js",
      "app/admin/src/js/**/_*.js",
      "app/admin/src/libs/**/*.js"
    ],
    ["js_admin"]
  );
});

gulp.task("js_admin_d", () => {
  gulp
    .src(["app/admin/src/js/**/!(_)*.js", "app/admin/src/js/**/_*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("dist/static/admin/js/app.min.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."));

  gulp
    .src(["app/admin/src/libs/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("dist/static/admin/js/libs.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."));
});

gulp.task("js_dist_admin", ["js_admin_d"]);
