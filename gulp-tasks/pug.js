const gulp = require("gulp");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const pug = require("gulp-pug");
const refresh = require("gulp-refresh");

gulp.task("pug", () =>
  gulp
    .src("app/**/*.pug")
    .pipe(pug({}))
    .pipe(gulp.dest("static/"))
    .pipe(refresh())
);

gulp.task("pug_watch", ["pug"], () => {
  refresh.listen(35729);
  gulp.watch("app/**/*.pug", ["pug"]);
});

gulp.task("pug_d", () =>
  gulp
    .src("app/**/*.pug")
    .pipe(pug({}))
    .pipe(gulp.dest("dist/static/"))
);

gulp.task("pug_dist", ["pug_d"]);
