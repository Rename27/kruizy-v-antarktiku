import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import postUrl from "postcss-url";
import postImport from "postcss-import";
import autoprefixer from 'autoprefixer';
import postScss from "postcss-scss";
import csso from 'postcss-csso';
import postMediaMinMax from "postcss-media-minmax";
import postCustomMedia from "postcss-custom-media";
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgSprite from "gulp-svg-sprite";
import svgo from 'gulp-svgmin';
import del from 'del';
import browser from 'browser-sync';

const styles = () => {
  return gulp.src('source/sass/*.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(postcss([
      postImport(),
      postUrl()
    ], { syntax: postScss }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postMediaMinMax(),
      postCustomMedia(),
      autoprefixer(),
      csso()
    ]))
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(gulp.dest('build/css', { sourcemaps: "." }))
    .pipe(browser.stream());
}

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(
      rename({
        extname: '.min.js'
      })
    )
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

const createWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

const createAvif = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(
      squoosh({
        avif: {}
      })
    )
    .pipe(gulp.dest('build/img'))
}

const svg = () =>
  gulp.src(['source/img/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));

const sprite = () => {
  return gulp.src('source/icons/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg'
          }
        }
      }),
    )
    .pipe(gulp.dest('build/icons'));
}

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

const clean = () => {
  return del('build');
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}

const watcher = () => {
  gulp.watch('source/js/**.js', gulp.series(scripts));
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', gulp.series(html, reload));
}

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp,
    createAvif,
  ),
);

export default gulp.series(
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
  ),
  gulp.series(
    server,
    watcher
  ));
