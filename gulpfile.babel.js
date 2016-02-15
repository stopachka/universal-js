import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import nodemon from 'nodemon';

const BABEL_OPTS = JSON.parse(fs.readFileSync('.babelrc'));

// ------------------------------------------------------------
// Webpack Configs

const NODE_MODULES = fs.readdirSync('node_modules')
  .filter(dir => dir !== '.bin')
  .reduce(
    (res, dir) => {
      res[dir] = `commonjs ${dir}`;
      return res;
    },
    {}
  )
;


const CONFIG = {
  entry: './src/server/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: BABEL_OPTS,
      },
    ],
  },
  externals: NODE_MODULES,
};

// ------------------------------------------------------------
// Tasks

gulp.task('backend-build', done => {
  webpack(CONFIG).run(cb(done));
});

gulp.task('backend-watch', done => {
  const doneOnce = _.once(done);
  webpack(CONFIG).watch(100, (err, stats) => {
    nodemon.restart();
    cb(doneOnce)(err, stats);
  });
});

gulp.task('default', ['backend-watch'], () => {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, 'build/backend'),
  }).on('restart', () => console.log('[nodemon] restart'));
});

const cb = done => (err, stats) => {
  console.log(err || stats.toString());
  done();
}
