/* global app */
export const copy = () => app.gulp.src(app.path.src.files).pipe(app.gulp.dest(app.path.build.files));
