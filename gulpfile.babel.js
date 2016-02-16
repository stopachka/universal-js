import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import nodemon from 'nodemon';

// ------------------------------------------------------------
// Tasks

gulp.task('server-build', done => {
  webpack(SERVER_CONFIG).run(cb(done));
});

gulp.task('server-watch', done => {
  const doneOnce = _.once(done);
  webpack(SERVER_CONFIG).watch(100, (err, stats) => {
    nodemon.restart();
    cb(doneOnce)(err, stats);
  });
});

gulp.task('client-build', done => {
  webpack(CLIENT_CONFIG).run(cb(done));
});

gulp.task('client-watch', done => {
  const doneOnce = _.once(done);
  webpack(CLIENT_CONFIG).watch(100, (err, stats) => {
    cb(doneOnce)(err, stats);
  });
});

gulp.task('test', done => {
  console.log('testing!');
  done();
});

gulp.task('default', ['server-watch', 'client-watch'], () => {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, 'build/server'),
  }).on('restart', () => console.log('[nodemon] restart'));
});

gulp.task('build', ['server-build', 'client-build']);

const cb = done => (err, stats) => {
  console.log(err || stats.toString());
  done();
}

// ------------------------------------------------------------
// Webpack

const BABEL_OPTS = JSON.parse(fs.readFileSync('.babelrc'));

const BASE_CONFIG = {
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
}

// Client

const CLIENT_CONFIG = {
  ...BASE_CONFIG,
  entry: './app/client.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'client.js'
  },
};

// Server

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

const SERVER_CONFIG = {
  ...BASE_CONFIG,
  entry: './app/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
  externals: NODE_MODULES,
};
