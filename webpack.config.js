var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // entry: './src/app.js',
  entry: { index: path.resolve(__dirname, 'src', 'app.js') },
  devServer: {
    // publicPath: '/',
    contentBase: '/dist',
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          "cache-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ inject:false,
                                    template: path.resolve(__dirname, 'src', 'index.html') 
                                  })]
}