import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: './src/rythm.js',
  plugins: [
    babel(babelrc()),
  ],
  external: external,
  targets: [
    {
      format: 'umd',
      moduleName: 'Rythm',
      dest: './rythm.js'
    }
  ]
};