const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const extractTextWebpackPlugin=require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use:extractTextWebpackPlugin.extract({
          fallback:"style-loader",
          use:'css-loader'
        })
      },
      {
        test:/\.tml$/,
        use:[
          {
            loader:'html-loader',
            options: {
              keepClosingSlash:true
            }
          }
        ]
      },
      {
        test:/\.(jpg|png|gif)$/,
        use:[
          {
            loader:"file-loader",
            options:{
              name:"[name].[hash].[ext]",
              outputPath:"./images/"
            }
          }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:"./src/main.tml",
      filename:"index.tml",
      title:"首页",
      chunks:['main'],
      minify:true,
      inject: true,
      xhtml: true
    }),
    new extractTextWebpackPlugin({
      filename:"./css/[name]-[hash].css"
    })
  ],
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
};
