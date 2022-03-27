const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');

dotenv.config();

const emitEnvVars = Object.keys(process.env)
  .filter(key => key.startsWith('EMIT'))
  .reduce((agg, key) => {
    agg[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return agg;
  }, {});

export default () => [
  {
    mode: 'production',
    entry: './es/index.js',
    node: {
      fs: 'empty',
    },
    output: {
      path: path.resolve(__dirname, './umd'),
      filename: 'index.js',
      libraryTarget: 'umd',
      globalObject: 'this',
      library: 'EMIT',
      libraryExport: 'default',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/@emit/web3-provider-engine'),
          ],
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(emitEnvVars),
      ...(Number(process.env.EMIT_BUILD_SOURCE_MAPS) ? [new webpack.EvalSourceMapDevToolPlugin({})] : []),
    ],
  },
];
