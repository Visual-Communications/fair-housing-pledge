const gulp = require('gulp')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const webpack = require('webpack')
const path = require('path')
const concat = require('gulp-concat')
const beautify = require('gulp-beautify')
const rename = require('gulp-rename')
const connect = require('gulp-connect')

const isProduction = process.env.NODE_ENV === 'production'

const defaults = {
  html: {
    src: './src/*.html',
    dest: './build',
    output: './build/**/*.html'
  },
  css: {
    src: './src/_assets/css/style.css',
    dest: './build/css',
    output: './build/css/bundle.css'
  },
  js: {
    root: './*.js',
    src: './src/_assets/js/**/*.js',
    dest: './build/js',
    output: './build/js/bundle.js'
  },
  fonts: {
    src: './src/_assets/fonts/**/*',
    dest: './build/fonts'
  },
  favicon: {
    src: './src/_assets/favicon/**/*',
    dest: './build'
  },
  images: {
    src: './src/_assets/img/**/*',
    dest: './build/img'
  },
  cms: {
    src: './src/cms/config.yml',
    dest: './build/cms'
  }
}

const compiler = webpack({
  // Webpack configuration
  mode: isProduction ? 'production' : 'development',
  entry: {
    bundle: './src/_assets/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
})

function cleanBuild () {
  const clean = del([defaults.html.dest])

  return clean
}

function cleanBundles () {
  const clean = del([defaults.css.output, `${defaults.css.output}.map`, defaults.js.output, `${defaults.js.output}.map`])

  return clean
}

function buildHtml () {
  const bundle = gulp.src(defaults.html.src)
    .pipe(beautify.html({ indent_size: 2 })) // Beautify
    .pipe(gulp.dest(defaults.html.dest))
    .pipe(connect.reload())

  return bundle
}

function minifyHtml () {
  const htmlmin = require('gulp-htmlmin')
  const bundle = gulp.src(defaults.html.output)
    .pipe(htmlmin({ collapseWhitespace: true })) // Minify
    .pipe(gulp.dest(defaults.html.dest))
    .pipe(connect.reload())

  return bundle
}

function lintCss () {
  const gulpStylelint = require('gulp-stylelint')
  const lint = gulp.src(defaults.css.src)
    .pipe(gulpStylelint({
      config: {
        extends: ['stylelint-config-standard']
      },
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))

  return lint
}

function buildCss () {
  const bundle = gulp.src(defaults.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-easy-import'), // @import files
      require('precss'), // Transpile Sass-like syntax
      require('postcss-preset-env'), // Polyfill modern CSS
      require('autoprefixer'), // Add vendor prefixes
      require('pixrem')() // Add fallbacks for rem units
    ]))
    .pipe(concat('bundle.css')) // Concatenate and rename
    .pipe(beautify.css({ indent_size: 2 })) // Beautify
    .pipe(sourcemaps.write('.')) // Maintain Sourcemaps
    .pipe(gulp.dest(defaults.css.dest))
    .pipe(connect.reload())

  return bundle
}

function minifyCss () {
  const bundle = gulp.src(defaults.css.output)
    .pipe(sourcemaps.init())
    .pipe(postcss([require('cssnano')])) // Minify
    .pipe(rename({ suffix: '.min' })) // Rename
    .pipe(sourcemaps.write('.')) // Maintain Sourcemaps
    .pipe(gulp.dest(defaults.css.dest))
    .pipe(connect.reload())

  return bundle
}

function lintJs () {
  const standard = require('gulp-standard')
  const lint = gulp.src([defaults.js.src, defaults.js.root])
    .pipe(standard({ fix: true }))
    .pipe(standard.reporter('default'))

  return lint
}

function buildJs () {
  const bundle = gulp.src(defaults.js.src)
    .pipe(sourcemaps.init())
    .pipe(compiler.run((err) => {
      if (err) throw new Error(err)
    })) // Webpack
    // .pipe(concat('bundle.js')) // Concatenate and rename
    // .pipe(babel()) // Compile ECMAScript 2015+ into a backwards compatible version of JavaScript
    .pipe(beautify({ indent_size: 2 })) // Beautify
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(defaults.js.dest))
    .pipe(connect.reload())

  return bundle
}

function minifyJs () {
  const uglify = require('gulp-uglify')
  const bundle = gulp.src(defaults.js.output)
    .pipe(sourcemaps.init())
    .pipe(uglify()) // Minify
    .pipe(rename({ suffix: '.min' })) // Rename
    .pipe(sourcemaps.write('.')) // Maintain Sourcemaps
    .pipe(gulp.dest(defaults.js.dest))
    .pipe(connect.reload())

  return bundle
}

function bundleFonts () {
  const bundle = gulp.src(defaults.fonts.src)
    .pipe(gulp.dest(defaults.fonts.dest))
    .pipe(connect.reload())

  return bundle
}

function bundleFavicon () {
  const bundle = gulp.src(defaults.favicon.src)
    .pipe(gulp.dest(defaults.favicon.dest))
    .pipe(connect.reload())

  return bundle
}

function bundleImages () {
  const bundle = gulp.src(defaults.images.src)
    .pipe(gulp.dest(defaults.images.dest))
    .pipe(connect.reload())

  return bundle
}

function copyCms () {
  const bundle = gulp.src(defaults.cms.src)
    .pipe(gulp.dest(defaults.cms.dest))
    .pipe(connect.reload())

  return bundle
}

function serve () {
  connect.server({
    root: defaults.html.dest,
    livereload: true
  })
}

function watch () {
  gulp.watch([defaults.html.src], buildHtml)
  gulp.watch([defaults.css.src], buildCss)
  gulp.watch([defaults.js.src, defaults.js.root], buildJs)
  gulp.watch([defaults.fonts.src], bundleFonts)
  gulp.watch([defaults.favicon.src], bundleFavicon)
  gulp.watch([defaults.images.src], bundleImages)
  gulp.watch([defaults.cms.src], copyCms)
}

/**
 * Gulp tasks
 */

exports.default = gulp.series(
  cleanBuild, // Clean
  gulp.parallel(lintCss, lintJs), // Lint
  gulp.parallel(buildCss, buildJs), // Build
  gulp.parallel(bundleFonts, bundleFavicon, bundleImages, copyCms), // Copy
  gulp.parallel(minifyHtml, minifyCss, minifyJs), // Minify
  cleanBundles // Clean
)

exports.build = gulp.series(
  cleanBuild, // Clean
  gulp.parallel(lintCss, lintJs), // Lint
  gulp.parallel(buildCss, buildJs), // Build
  gulp.parallel(bundleFonts, bundleFavicon, bundleImages, copyCms), // Copy
  gulp.parallel(minifyHtml, minifyCss, minifyJs), // Minify
  cleanBundles // Clean
)

exports.develop = gulp.series(
  cleanBuild, // Clean
  gulp.parallel(lintCss, lintJs), // Lint
  gulp.parallel(buildCss, buildJs), // Build
  gulp.parallel(bundleFonts, bundleFavicon, bundleImages, copyCms) // Copy
)

exports.serve = gulp.series(
  cleanBuild, // Clean
  gulp.parallel(lintCss, lintJs), // Lint
  gulp.parallel(buildCss, buildJs), // Build
  gulp.parallel(bundleFonts, bundleFavicon, bundleImages, copyCms), // Copy
  gulp.parallel(serve, watch) // Serve, watch
)
