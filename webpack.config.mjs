import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default {
  mode: process.env.NODE_ENV || "development",
  entry: { index: path.resolve(__dirname, "src", "app.js") },
  devServer: {
    static: path.resolve(__dirname, "public"),
    host: "127.0.0.1",
    port: 5000,
    historyApiFallback: true,
    hot: true,
    open: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        secure: false,
      },
    ],
  },
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
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
          options: { presets: ["@babel/preset-env"] },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  cache: { type: "filesystem" },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false, // set to true if you want scripts injected automatically
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.MY_VAR": JSON.stringify(process.env.MY_VAR),
    }),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
