const gulp = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const refresh = require("gulp-refresh");

gulp.task("scss_site", () =>
  gulp
    .src(["app/site/src/scss/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({ includePaths: ["./app/site/scss"], outputStyle: "compressed" }).on(
        "error",
        sass.logError
      )
    )
    .pipe(concat("static/site/css/style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(refresh())
);

gulp.task("scss_watch", ["scss_site"], () => {
  refresh.listen(35729);
  gulp.watch(["app/site/src/scss/**/*.scss"], ["scss_site"]);
});

gulp.task("scss_site_d", () =>
  gulp
    .src(["app/site/src/scss/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({ includePaths: ["./app/site/scss"], outputStyle: "compressed" }).on(
        "error",
        sass.logError
      )
    )
    .pipe(concat("dist/css/style.min.css"))
    // .pipe(concat("dist/static/site/css/style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
);

gulp.task("scss_dist", ["scss_site_d"]);



gulp.task("scss_admin", () =>
  gulp
    .src(["app/admin/src/scss/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["./app/admin/scss"],
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(concat("static/admin/css/style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
    .pipe(refresh())
);

gulp.task("scss_watch_admin", ["scss_admin"], () => {
  refresh.listen(35729);
  gulp.watch(["app/admin/src/scss/**/*.scss"], ["scss_admin"]);
});

gulp.task("scss_admin_d", () =>
  gulp
    .src(["app/admin/src/scss/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["./app/admin/scss"],
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(concat("dist/static/admin/css/style.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."))
);

gulp.task("scss_dist_admin", ["scss_admin_d"]);
