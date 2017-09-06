const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'redux-fetch.js',
    library: "reduxFetch",
    libraryTarget: "umd"
  },
  externals: {
    "redux": {
      commonjs: "redux",
      commonjs2: "redux",
      amd: "redux",
      root: "redux"
    },
    "lodash": {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loaders: ['babel-loader']
      }
    ]
  }
}