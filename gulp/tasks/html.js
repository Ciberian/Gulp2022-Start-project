import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
// eslint-disable-next-line no-unused-vars
import pug from 'gulp-pug';

/* global app */
// eslint-disable-next-line arrow-body-style
export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'HTML',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      .pipe(fileInclude()) // для сборки html файлов, альтернатива pug-у
    //.pipe(pug({        // для сборки pug файлов, альтернатива html-у
    // Сжатие HTML файла
    //  pretty: true,
    // Показывать в терминале какой файл обработан
    //  verbose: true
    //}))
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: '%DT%',
            append: {
              key: '_v',
              cover: 0,
              to: ['css', 'js'],
            },
            output: {
              file: 'gulp/version.json',
            },
          }),
        ),
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
