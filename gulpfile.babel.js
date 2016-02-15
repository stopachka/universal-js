import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

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
  entry: './src/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js',
  },
  externals: NODE_MODULES,
};

const cb = done => (err, stats) => {
  console.log(err || stats.toString());
  done && done();
}

gulp.task('backend-build', done => {
  webpack(CONFIG).run(cb(done));
});


gulp.task('backend-watch', done => {
  webpack(CONFIG).run(cb(done));
});
