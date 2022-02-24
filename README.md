## Gulp 2022 (ES6) 

> Сборка сделана по видеоуроку с Youtube-канала ![Фрилансер по жизни](https://www.youtube.com/watch?v=jU88mLuLWlk).

1. Открываем папку проекта в редакторе (VS Code).

2. В терминале вводим команду **npm init** - создаем файл **package.json** в папке проекта.
   В **package.json** будет хранится информация о создаваемом объекте.
   А также информация о зависимостях, т.е. от каких модулей зависеть работа данного проекта - *dependencies*.
   От каких модулей зависит разработка данного проекта - *devDependencies*.

3. В **package.json** редактируем значение *"main": "gulpfile.js"*. В этом файле мы будем подключать gulp и вызывать выполнение задач.
   Также добавляем поле *"type": "module"*, по умолчанию *"type": "CommonJS"*.
   "type": "module" позволит пользоватся синтаксисом ES6, например `import-export` вместо `required`.

4. Устанавливаем глобально Gulp, если он ещё не установлен, команда: `npm i gulp-cli -g`.
   Сам gulp глобально устанавливать не надо. Подробнее на ![официальном сайте](https://gulpjs.com).

5. Устанавливаем локально Gulp в папке проекта, команда: `npm i gulp -D` (Ключ `"-D"` означает тоже самое, что и `"--save-dev"`)
   Данная команда создаст подпапку с именем: *node_modules/* и там будет лежать папка *gulp/* и много других, которые нужны для работы **gulp**.

6. Определяем структуру папок в корне проекта.
   ```
   *dist/* - в этой папке будет хранится полностью готовый проект, она создастся автоматически при сборке.
   *gulp/config/* - кофигурационные файлы проекта.
       */tasks/* - вынесем задачи в отдельную директорию и будем импортировать в **gulpfile.js**.
   *node_modules/* - создаётся в момент установки gulp в папке проекта.
   *src/files/*
      *fonts/*
      *html/*
      *img/*
      *js/*
      *scss/*
      *index.html* - если не используется шаблонизатор pug.
      *index.pug* - если используется сборка с использованием шаблонизатора.
   *package-lock.json* - создаётся в момент установки gulp в папке проекта.
   *package.json*
   *gulpfile.js* - это файл в каталоге вашего проекта, который автоматически загружается при запуске команды gulp. 
   Чаще всего в данном файле используется API Gulp, например, `src(), dest(), series() или parallel()`, 
   однако можно использовать любые модули JavaScript или Node. Все функции можно экспортировать и зарегистрировать в системе задач gulp.
   Помимо этого в директории проекта также будут лежать файлы связанные с **git**-ом и **eslint**-ом.
   ```
7. Создаём конфигурационные файлы: **ftp.js, path.js, plugins.js**. 
   В файле **ftp.js** указываем параметры ftp сервера.

8. В файле **path.js** определяем корневую директорию проекта, а также директории *dist/* и *src/*.
   Чтобы не экспортировать всё пути до различных папок создаём объект *path*, в нем создаём именованный список путей и экспортируем его.
   Объект *path* содержит в себе объекты *build* и *src*, содержащие в себе пути до исходников и директорий в которые будет сохраняться сборка.
   Также *path* содержи третий объект *watch*, в котором указана директории, изменение в которой следует отслеживать.

9. В файле **plugins.js** указываем все плагины которые будут общими для тасков. 
   Объединяем общие плагины в объект **plugins** и экспортируем его.

10. В директории *tasks/* создаём список задач, которые будут выполняться в ходе работы и сборки проекта:
- **copy.js** создаём и экспортируем функцию копирования файлов (copy) из *src/* в *dist/*.
   В функции используем методы `gulp.src()` и `gulp.dest()` чтобы осуществить копирование.
- **fonts.js** в файле осуществляем последовательное преобразование штрифтов **.otf** в **.woff2**.
   А также создаём файл **fonts.scss**, а также выгружаем созданные шрифты в отдельную папку с конечной сборке.
- **ftp.js** создаём и экспортируем функцию (ftp) для отправки собранного проекта на удалённый сервер.
   Используем плагины **vinyl-ftp** и **gulp-util**.
- **html.js** создаём и экспортируем функцию копирования файлов (html) из *src/* в *dist/*.
   Используем модуль **fileInclude** для сборки html файлов, или **gulp-pug** для сборки pug файлов.
   Используем плагин **replace** чтобы правильно прописывать пути до папки с изображениями.
   Используем плагин **webpHtmlNosvg** для преобразования изображений в формат webp.
   Кроме того в режиме **build** используем плагин **gulp-version-number** для версионирования конечной сборки.
- **images.js** создаём и экспортируем функцию (ftp) для отправки собранного проекта на удалённый сервер.
   Используем плагин gulp-imagemin.
- **js.js** создаём и экспортируем функцию (js) для минификации js файлов в конечной сборке.
   Для этого устанавливаем webpack и webpack-stream.
- **reset.js** создаём и экспортируем функцию reset которая будет удалять папку dist/.
   В функции используем плагин **del**, который устанавливаем с помощью npm и импортируем в файл.
   Удаление необходимо чтобы в папке dist/ не накапливался мусор, различные файлы, которые потеряли свою актуальность.
- **scss.js** создаём и экспортируем функцию (scss) для сборки scss файлов и преобразования из в css файлы.
   Помимо преобразования файлов, выполняем сжатие файлов, вывод Webp изображений, добавление вендорных префиксов.
   А так же группируем медиа запросы c помощью модуля **gulp-group-css-media-queries**.
   Также используем плагины **sass, gulp-sass, gulp-rename, gulp-clean-css, gulp-webpcss, gulp-autoprefixer**.
- **server.js** создаём и экспортируем функцию (server) для создания локального сервера.
   Данный сервер позволит в режиме реального времени отслеживать все изменения в проекте.
   Для этих целей устанавливаем модуль **browser-sync**
- **svgSprive.js** создаём и экспортируем функцию (svgSprive) для сборки всех svg иконок в единый спрайт.
   Используем плагин **gulp-svg-sprite**.
- **zip.js** создаём и экспортируем функцию (zip) с помощью которой можно будет архивировать собранный проект.
   Используем плагины **del** и **gulp-zip**. 
   Архив будет создаваться в корне проекта, при этом старый архив будет удаляться с помощью модуля del

11. В файле **gulpfile.js** импортируем сам **gulp**, объект *path*, объект *plugins* и все задачи из директории gulp/tasks/.
   Создаём функцию наблюдатель (watcher) за изменениями в файлах с помощью метода gulp.watch.

12. Создаём глобальную переменную-объект, в котором будут храниться пути до файлов, общие плагины, сам gulp.
   Также там будут хранится два свойства отвечающий за режим сборки:
   - **isBuild** - режим сборки;
   - **isDev** - режим разработки. 

13. Создаём функцию watcher(), которая будет следить за изменениями в файлах html, scss, js.

14. Выстраиваем сценарии последовательного и параллельного выполнения задач с помощью методов `gulp.series` и `gulp.parallel`.
   Создание svg спрайтов осуществляется разово, поэтому данную задачу не включаем в основной поток задач.
   Также в отдельную константу *fonts* выносим последовательное преобразование шрифтов.
   В константе *mainTasks* сохраняем серию главных задач по копированию, преобразованию и сборке файлов:
   `const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));`

15. Создаём два базовых сценария:
   - `build = gulp.series(reset, mainTasks);` - режим сборки готового проекта.
   *reset* удаляет не актуальную сборку, *mainTasks* - выполняет задачи указанные в 14 пункте.

   - `const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));` - режим разработки (дефолтный режим).
   В отличии от режима `build` ослеживает изменения в файлах и отображает их в браузере.
   
   Два дополнительных сценария `deployZIP` и `deployFTP` собирают проект и дополнительно архивируют или отправляют на сервер.

16. Все вышеперечисленные сценарии включая создание svg спрайтов экспортируем из gulp.js файла.
   Добавляем эти сценарии в список скриптов в файле package.json и далее будет вызывать из уже от туда.


### Примечания к используемым модулям

Модуль **gulp-file-include**, импортируем его в файл html.js и включаем в фукцию сборки html файлов.
Собираем главную страницу index.html из отдельных html файлов. 
Для включения их на главную страницу испльзуем синтаксис:
`@@include('dir/file.html', {"variable1": "value", "variable1": "value"}).`
Если переменные не нужны, то тогда просто пишем `@@include('dir/file.html', {}).`
Значение переменным задаётся странице где вызывается директива `@@include.`
А в компонентах, из которых производится сборка указывается имя переменной в виде `@@variable1`.
Именно возможность передавать переменные в инклюдах выгодно отличает данный модуль от **pug**.

### Работа с изображениями

В настройках редактора **Open Settings(JSON)** пишем алиасы для пути к изображениям, файлам scss и js, для плагина 
   ```
   "path-autocomplete.pathMappings": {
      "@img": "${folder}/src/img/",
      "@scss": "${folder}/src/scss/",
      "@js": "${folder}/src/js/"
   }
   ```
Алиасы(псевдонимы) позволяют обращатся к пути файлов используя короткую запись вида `@img/` 
Но в первую очередь это необходимо для того чтобы работать с файлами из любой папки с любой вложенностью.

Устанавливаем плагин **gulp-replace** и импортируем его в файл **plugins.js.**
Этот плагин записываем в объект *plugins* (в нём будем хранить все плагины) и экспортируем этот объект.
Импортируем его в файле **gulpfile.js** и записываем в глобальную переменную **global.app**
Все это нужно чтобы в конечном итоге заменять алиас *@img* в конечной сборке на *img/*
Для этого прописываем строку `.pipe(app.plugins.replace(/@img\//g, 'img/'))` в функции html в файле html.js

### Запуск нового проекта.

Для этого в папку где будет будущий проект копируем папку *gulp/* c config-ом и task-aми внутри.
Также копируем папку *src/* со всем её содержимым и файлы **gulp.js** и **package.json**.
    
Открываем папку проекта в редакторе кода и в командной строке вызываем команду `npm i`.
Данная команда установит npm модули указанные в зависимостях в **package.json**.
Далее запускаем сборку в режиме dev - `npm run dev`, или в режиме build - `npm run build`.
