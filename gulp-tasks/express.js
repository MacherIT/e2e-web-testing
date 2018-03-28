var gulp = require("gulp");

gulp.task("express_modules", () =>
  gulp.src(["*modules/**/*", "!node_modules/**/*"]).pipe(gulp.dest("dist"))
);
gulp.task("express_skeleton", () =>
  gulp
    .src([
      "*bin/**/*",
      "*config/**/*",
      "*models/**/*",
      "*controllers/**/*",
      "*routes/**/*",
      "*views/**/*",
      "app.js",
      "package.json",
      ".htaccess"
    ])
    .pipe(gulp.dest("dist"))
);
gulp.task("express_assets", () =>
  gulp.src(["*public/**/*"]).pipe(gulp.dest("dist"))
);

gulp.task("express_dist", [
  "express_modules",
  "express_skeleton",
  "express_assets"
]);
