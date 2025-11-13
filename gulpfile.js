/*
* * * * * ==============================
* * * * * ==============================
* * * * * ==============================
* * * * * ==============================
========================================
========================================
========================================
----------------------------------------
USWDS SASS GULPFILE
----------------------------------------
*/

const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const gulp = require("gulp");
const pkg = require("./node_modules/@uswds/uswds/package.json");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uswds = "./node_modules/@uswds/uswds";

sass.compiler = require("sass");

/*
----------------------------------------
PATHS
----------------------------------------
- All paths are relative to the
  project root
- Don't use a trailing `/` for path
  names
----------------------------------------
*/

// Project Sass source directory
const PROJECT_SASS_SRC = "./src/sass";

// Images destination
const IMG_DEST = "./dist/img";

// Fonts destination
const FONTS_DEST = "./dist/fonts";

// Javascript destination
const JS_DEST = "./dist/js";

// Compiled CSS destination
const CSS_DEST = "./dist/css";

const DIST_DIR = "./dist"

const FRACTAL_STATIC_ASSETS_DIR = "./public"

// Site CSS destination
// Like the _site/assets/css directory in Jekyll, if necessary.
// If using, uncomment line 106
// const SITE_CSS_DEST = "./path/to/site/css/destination";

/*
----------------------------------------
TASKS
----------------------------------------
*/

gulp.task("copy-uswds-setup", () => {
  return gulp
    .src(`${uswds}/scss/theme/**/**`)
    .pipe(gulp.dest(`${PROJECT_SASS_SRC}`));
});

gulp.task("copy-uswds-fonts", () => {
  return gulp.src(`${uswds}/dist/fonts/**/**`).pipe(gulp.dest(`${FONTS_DEST}`));
});

gulp.task("copy-uswds-images", () => {
  return gulp.src(`${uswds}/dist/img/**/**`).pipe(gulp.dest(`${IMG_DEST}`));
});

gulp.task("copy-src-images", () => {
  return gulp.src(`${PROJECT_SASS_SRC}/../img/**/**`).pipe(gulp.dest(`${IMG_DEST}`));
});

gulp.task("copy-uswds-js", () => {
  return gulp.src(`${uswds}/dist/js/**/**`).pipe(gulp.dest(`${JS_DEST}`));
});

gulp.task("build-sass", function(done) {
  var plugins = [
    // Autoprefix
    autoprefixer({
      cascade: false,
      grid: true
    }),
    // Minify
    csso({ forceMediaMerge: false }),
  ];
  return (
    gulp
      .src([`${PROJECT_SASS_SRC}/*.scss`])
      .pipe(sourcemaps.init({ largeFile: true }))
      .pipe(
        sass({
          includePaths: [
            `${PROJECT_SASS_SRC}`,
            `${uswds}`,
            `${uswds}/packages`
          ]
        })
      )
      .pipe(replace(/\buswds @version\b/g, "based on uswds v" + pkg.version))
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write("."))
      // uncomment the next line if necessary for Jekyll to build properly
      //.pipe(gulp.dest(`${SITE_CSS_DEST}`))
      .pipe(gulp.dest(`${CSS_DEST}`))
  );
});

gulp.task(
  "init",
  gulp.series(
    "copy-uswds-setup",
    "copy-uswds-fonts",
    "copy-uswds-images",
    "copy-uswds-js",
    "build-sass"
  )
);

gulp.task(
  "build-njwds",
  gulp.series(
    "copy-uswds-fonts",
    "copy-uswds-images",
    "copy-src-images",
    "copy-uswds-js",
    "build-sass"
  )
);

gulp.task("copy-dist-to-fractal-assets", () => {
  return gulp.src(`${DIST_DIR}/**/**`).pipe(gulp.dest(`${FRACTAL_STATIC_ASSETS_DIR}/dist`));
});

gulp.task("watch-sass", function() {
  gulp.watch(`${PROJECT_SASS_SRC}/**/*.scss`, gulp.series("copy-src-images", "build-sass", "copy-dist-to-fractal-assets",));
});


gulp.task("watch-fractal", gulp.series(
  "copy-src-images",
  "build-sass",
  "copy-dist-to-fractal-assets",
  "watch-sass",
));
