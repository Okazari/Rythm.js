const babelrc = require('babelrc-rollup');
const commandLineArgs = require('command-line-args');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const watch = require('rollup-watch');
const { minify } = require('uglify-es');

const pkg = require('./package.json');

const entry = './src/index.js';
const moduleName = 'Rythm';
const destDefault = './rythm.js';
const destMinify = './rythm.min.js';
const pluginsDefault = [babel(babelrc.default())];
const external = Object.keys(pkg.dependencies);
const format = 'umd';

const optionDefs = [
  {
    name: 'watch',
    alias: 'w',
    type: Boolean
  }
];
const options = commandLineArgs(optionDefs);

if (options.watch) {
  const config = (dest, plugins) => {
    return {
      entry: entry,
      dest: dest,
      format: format,
      moduleName: moduleName,
      sourceMap: true,
      plugins: plugins
    };
  };

  const configDefault = config(destDefault, pluginsDefault);
  const configMinify = config(destMinify, [
    ...pluginsDefault,
    uglify({}, minify)
  ]);

  const watcherDefault = watch(rollup, configDefault);
  const watcherMinify = watch(rollup, configMinify);

  const stderr = console.error.bind(console);

  const eventHandler = (event, filename) => {
    switch (event.code) {
      case 'STARTING':
        stderr('checking rollup-watch version...');
        break;
      case 'BUILD_START':
        stderr(`bundling ${filename}...`);
        break;
      case 'BUILD_END':
        stderr(
          `${filename} bundled in ${event.duration}ms. Watching for changes...`
        );
        break;
      case 'ERROR':
        stderr(`error: ${event.error}`);
        break;
      default:
        stderr(`unknown event: ${event}`);
    }
  };

  watcherDefault.on('event', event => eventHandler(event, destDefault));
  watcherMinify.on('event', event => eventHandler(event, destMinify));
} else {
  rollup
    .rollup({
      entry: entry,
      plugins: pluginsDefault,
      external: external
    })
    .then(bundle => {
      bundle.write({
        format: format,
        moduleName: moduleName,
        dest: destDefault
      });
    });

  rollup
    .rollup({
      entry: entry,
      plugins: [...pluginsDefault, uglify({}, minify)],
      external: external
    })
    .then(bundle => {
      bundle.write({
        format: format,
        moduleName: moduleName,
        dest: destMinify
      });
    });
}
