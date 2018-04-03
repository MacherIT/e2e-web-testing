var gulp = require("gulp");

require("./gulp-tasks/scripts");
require("./gulp-tasks/scss");
require("./gulp-tasks/pug");
require("./gulp-tasks/assets");
require("./gulp-tasks/express");

if(process.env.NODE_ENV === 'distout')
  gulp.task("dist", ["js_dist", "scss_dist", "pug_dist"]);
  // gulp.task("dist", ["js_dist", "scss_dist", "pug_dist", "express_dist","scss_dist_admin", "js_dist_admin"]);
else
  gulp.task("default", ["js_watch", "scss_watch", "pug_watch", "assets_watch","scss_watch_admin", "js_watch_admin"]);
