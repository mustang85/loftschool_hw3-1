<h1>Домашнее задание №3</h1>

<h2>Задача</h2>
<p>Разработать сервис генерации вотермарков</p>
<h2>Рабочая группа</h2>
<ul>
  <li>Черепов Антон (<a href="https://github.com/chekit/">chekit</a>)</li>
  <li>Сергей Ямпольский (<a href="https://github.com/serjyamp">serjyamp</a>)</li>
  <li>Богдан Пономаренко (<a href="https://github.com/bogdan1995">bogdan1995</a>)</li>
  <li>Николай Журавлёв (<a href="https://github.com/verbaux">verbaux</a>)</li>
  <li>Граневв Кирилл (<a href="https://github.com/mustang85">mustang85</a>)</li>
</ul>
<h3>Роли</h3>

<h2>Структура проекта</h2>
<h3>Дирректоррии</h3>
<p>
<em>app/</em>- дирреткория разработки проекта<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ sass/- все стили (используется препроцессор Sass)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_base/ (базовые стили, без классов)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_layout/ (стили, касающиеся, струкртуры макета)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_modules/ (стлили, касающиеся всех элементов, блоков макета дизайна)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_tools/ (все необходимые данные: переменный mixins, placehoders, functions)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_styles.scss - файл где собираются все стили вметсе<sup>*</sup><br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ templates/- разметка макета с использованием препроцессора jade<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_includes/ - head и body<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_mixins/ - необходимые миксины<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_partials/ - контент страницы<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_vars/ - переменные<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_index.jade - собираем все части страницы вместе<br />
<br />
<em>gulp<sup>**</sup>/</em>-<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ build.gulp.js - основные команды для разбора jade, sass, создания дирректории dist, вставки необходмых компонентов bower<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ watch.gulp.js - следим за изменениями в проекте<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ wiredep.gulp.js - вставляем bower зависимости<br />
<br />
.bowerrc - указываем куда устанавливаются bower пакеты<br />
.gitignore - исключаем папки с установкой bower, npm модулей<br />
.jshint - для проверки js, исключаем ошибки при использовании $, jQuery<br />
gulpfile.js - основной файл, по деволту запускает build<br />
package.json - все необходимые пакеты для gulp<br />
README.md - описание проекта
</p>
<blockquote>
	<p><sup>*</sup> &mdash; в самом styles подключаются только _index.scss каждой папки, в коорых, соответственно, подключены соответствующие части. В <em>base/</em> уже присутствует reset.scss</p>
	<p><sup>**</sup> &mdash; ещё будет дописан server.gulp.js для запуска локального сервера</p>
</blockquote>
<h3>Инициализация проекта</h3>
<p>Для начала работы необходимо склонировать себе репозиторий, далее в консоли выполнить <code>npm install</code>, далее <code>bower install</code></p>
<h2>Ветки</h2>
<ul>
	<li><strong>static</strong> &mdash; статичная версия макета</li>
	<li><strong>js</strong> &mdash; версия макета с js</li>
	<li><strong>php</strong> &mdash; макет с php</li>
</ul>
<h3>Соглашения по коммитам</h3>
<p>каждый коммит должен быть подписан следующим образом:<br/><code>git commit -m '&lt;что сделано&gt; | &lt;кто сделал&gt;'</p>