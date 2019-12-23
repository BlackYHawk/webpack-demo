const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const extractTextWebpackPlugin=require("extract-text-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './example/main.js'
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
      template:"./example/main.tml",
      filename:"index.tml",
      title:"首页",
      chunks:['main'],
      //部分省略，具体看minify的配置
      minify: {
        //是否对大小写敏感，默认false
        caseSensitive: true,

        //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
        collapseBooleanAttributes: false,

        //是否去除空格，默认false
        collapseWhitespace: false,

        //标签自闭合
        keepClosingSlash: true,

        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: false,

        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: false,

        //Prevents the escaping of the values of attributes
        preventAttributesEscaping: true,

        //是否移除属性的引号 默认false
        removeAttributeQuotes: true,

        //使用短的文档类型，默认false
        useShortDoctype: false
      },
      inject: "head",
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
