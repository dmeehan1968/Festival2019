import webpack from 'webpack'
import nodemon from 'nodemon'
import express from 'express'
import fs from 'fs'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import paths from '../config/paths'
import webpackConfig from '../config/webpack.config'


const HOST = process.env.DEVSERVER_HOST || 'http://localhost'
const PORT = process.env.WEBPACK_PORT || (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT)+1 : 3001)

const logMessage = (error, level = 'info') => {
  console.log(error)
}

const compilerPromise = (name, compiler) => {
    return new Promise((resolve, reject) => {
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}] Compiling `);
        });
        compiler.hooks.done.tap(name, (stats) => {
            if (!stats.hasErrors()) {
                return resolve();
            }
            return reject(`Failed to compile ${name}`);
        });
    });
};

export default async (options) => {
  const defaults = {
    mode: 'development',
    hmr: true,
    devServer: true,
  }

  options = Object.assign({}, defaults, options)

  const [ clientConfig, serverConfig ] = webpackConfig(options.mode)

  if (options.devServer && options.hmr) {
    clientConfig.entry.bundle = [
      `webpack-hot-middleware/client?path=${HOST}:${PORT}/__webpack_hmr`,
      ...clientConfig.entry.bundle,
    ]

    const hotUpdateConfig = {
      hotUpdateMainFilename: 'updates/[hash].hot-update.json',
      hotUpdateChunkFilename: 'updates/[id].[hash].hot-update.js',
    }

    clientConfig.output = { ...clientConfig.output, ...hotUpdateConfig }
    serverConfig.output = { ...serverConfig.output, ...hotUpdateConfig }

  }

  if (options.devServer) {

    const publicPath = clientConfig.output.publicPath;

    clientConfig.output.publicPath = [`${HOST}:${PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    serverConfig.output.publicPath = [`${HOST}:${PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

  }

  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  const watchOptions = options.devServer && {
      ignored: /^node_modules/,
      stats: clientConfig.stats,
  } || {}

  if (options.devServer) {

    const app = express()

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use(
       webpackDevMiddleware(clientCompiler, {
           publicPath: clientConfig.output.publicPath,
           stats: clientConfig.stats,
           watchOptions,
           writeToDisk: true,
       })
    );

    app.use(webpackHotMiddleware(clientCompiler));

    app.use(paths.publicPath, express.static(paths.clientBuild));

    app.listen(PORT);

  }

  const compilerReporter = (config, jsonPath, error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(jsonPath);
      fs.mkdirSync(path.dirname(jsonPath), { recursive: true })
      fs.writeFileSync(jsonPath, JSON.stringify(stats.toJson(config)))
      console.log(stats.toString(config));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      logMessage(errors[0], 'error');
      logMessage(errors[1], 'error');
      logMessage(errors[2], 'error');
    }
  }

  serverCompiler.watch(watchOptions, compilerReporter.bind(null, serverConfig.stats, path.join(paths.stats, 'server.json')))

  if (!options.devServer) {
    clientCompiler.watch(watchOptions, compilerReporter.bind(null, serverConfig.stats, path.join(paths.stats, 'client.json')))
  }

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    if (!options.devServer) {
      logMessage('Done', 'info')
      process.exit()
    }

  } catch (error) {
    logMessage(error, 'error');
    process.exit(1)
  }

  if (options.devServer) {

    const script = nodemon({
      script: `${paths.serverBuild}/server.bundle.js`,
      ignore: [ 'src', 'scripts', 'config', './*.*', 'build/client'],
    });

    script.on('restart', () => {
      logMessage('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
      console.log('Process ended');
      process.exit();
    });

    script.on('error', () => {
      logMessage('An error occured. Exiting', 'error');
      process.exit(1);
    });

  }
}
