const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// require("@dotenvx/dotenvx").config();

module.exports = {
  mode: "production",
  entry: { index: path.resolve(__dirname, "src", "app.js") },
  devServer: {
    static: path.resolve(__dirname, "public"),
    host: "127.0.0.1",
    port: 5000,
    historyApiFallback: true,
    hot: true, // Ensures no background socket connections
    // Prevent Webpack from automatically opening its private port
    open: true,
    proxy: [
      {
        context: ["/api"], // which paths to proxy
        target: "http://127.0.0.1:3000", // backend URL
        changeOrigin: true, // optional, usually needed
        secure: false,
      },
    ],
  },
  devtool: false,
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // Use MiniCssExtractPlugin for production, style-loader for development
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  cache: {
    type: "filesystem", // This replaces cache-loader
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.MY_VAR": JSON.stringify(process.env.MY_VAR),
    }),
  ],
};
