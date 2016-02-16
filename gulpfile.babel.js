import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import nodemon from 'nodemon';
import WebpackDevServer from 'webpack-dev-server';

// ------------------------------------------------------------
// Tasks

// Prod

gulp.task('server-build', done => {
  webpack(SERVER_PROD_CONFIG).run(cb(done));
});

gulp.task('client-build', done => {
  webpack(CLIENT_PROD_CONFIG).run(cb(done));
});

gulp.task('build', ['server-build', 'client-build']);

// Dev

gulp.task('server-watch', done => {
  const doneOnce = _.once(done);
  webpack(SERVER_DEV_CONFIG).watch(100, (err, stats) => {
    nodemon.restart();
    cb(doneOnce)(err, stats);
  });
});

gulp.task('client-watch', done => {
  new WebpackDevServer(webpack(CLIENT_DEV_CONFIG), {
    hot: true,
    publicPath: CLIENT_DEV_CONFIG.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }).listen(
    3000,
    'localhost',
    (err, res) => {
      done();
      console.log(err || '[webpack-dev-server: localhost:3000]');
    },
  );
});

gulp.task('default', ['server-watch', 'client-watch'], () => {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, 'build/server'),
  }).on('restart', () => console.log('[nodemon] restart'));
});

gulp.task('test', done => {
  console.log('testing!');
  done();
});

const cb = done => (err, stats) => {
  console.log(err || stats.toString());
  done();
}


// ------------------------------------------------------------
// Webpack

const isProd = process.env.NODE_ENV === 'production';
const BABEL_OPTS = JSON.parse(fs.readFileSync('.babelrc'));
const JS_LOADER = {
  test: /\.js$/,
  exclude: /node_modules/,
}
const BABEL_LOADER = {
  ...JS_LOADER, loader: 'babel', query: BABEL_OPTS,
}

// Client

const CLIENT_OUTPUT = {
  path: path.join(__dirname, 'build'),
  filename: 'client.js'
}
const CLIENT_ENTRY = './app/client.js';

const CLIENT_DEV_CONFIG = {
  entry: [
    CLIENT_ENTRY,
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin({quiet: true}),
  ],
  output: {
    ...CLIENT_OUTPUT,
    publicPath: 'http://localhost:3000/build/',
  },
  module: {
    loaders: [{...JS_LOADER, loader: 'react-hot'}, BABEL_LOADER],
  },
}

const CLIENT_PROD_CONFIG = {
  entry: [CLIENT_ENTRY],
  output: CLIENT_OUTPUT,
  module: {
    loaders: [BABEL_LOADER],
  }
}

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

const SERVER_DEV_CONFIG = {
  entry: './app/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
  externals: NODE_MODULES,
  module: {
    loaders: [BABEL_LOADER],
  }
};

const SERVER_PROD_CONFIG = SERVER_DEV_CONFIG;
