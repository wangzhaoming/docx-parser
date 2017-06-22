var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/docx-parser.js',
  output: {
    path: __dirname + '/dist',
    filename: 'docx-parser.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    //压缩打包的文件
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     //supresses warnings, usually from module minification
    //     warnings: false
    //   },
    //   sourceMap: true
    // })
  ]
}
