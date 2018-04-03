const gulp = require("gulp");
const refresh = require("gulp-refresh");

gulp.task("assets_site", () =>
  gulp
    .src(["app/site/assets/**/*"])
    .pipe(gulp.dest("static/site/assets/"))
    .pipe(refresh())
);

gulp.task("assets_watch", ["assets_site"], () => {
  refresh.listen(35729);
  gulp.watch(["app/site/assets/**/*"], ["assets_site"]);
});

gulp.task("assets_site_d", () =>
  gulp.src(["app/site/assets/**/*"]).pipe(gulp.dest("dist/assets/"))
);
// gulp.task("assets_site_d", () =>
//   gulp.src(["app/site/assets/**/*"]).pipe(gulp.dest("dist/static/site/assets/"))
// );

gulp.task("assets_dist", ["assets_site_d"]);
