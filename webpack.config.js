var path = require('path'),
    webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js'
  },
  resolve: {
      modules: [path.resolve(__dirname, "client"), "node_modules"]
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: [
                          ['env', {
                           'browsers': ['last 2 versions']
                          }]
                        ]
                  }
              }
          },
          {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
          },
          {
              test: /\.vue$/,
              use: ['vue-loader']
          }
      ]
  },

  plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
      })
  ],
  devtool: 'inline-source-map'
};