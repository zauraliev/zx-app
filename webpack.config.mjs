import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CHANGE: Export a function instead of object
export default (env, argv) => {
  // Get mode from CLI or environment
  const mode = argv.mode || process.env.NODE_ENV || "development";
  const isProduction = mode === "production";

  return {
    mode: mode,
    entry: { index: path.resolve(__dirname, "src", "app.js") },

    devtool: isProduction ? false : "source-map",

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
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },

    cache: { type: "filesystem" },

    optimization: {
      minimize: isProduction,
      minimizer: isProduction
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // Remove console.* in production
                  drop_debugger: true, // Remove debugger statements
                  pure_funcs: [
                    "console.log",
                    "console.info",
                    "console.debug",
                    "console.trace",
                    "console.warn",
                    "console.error",
                  ],
                },
                format: {
                  comments: false, // Remove all comments
                },
              },
              extractComments: false,
            }),
          ]
        : [],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode), // Consistent NODE_ENV
        "process.env.MY_VAR": JSON.stringify(process.env.MY_VAR),
      }),
      ...(isProduction
        ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
        : []),
    ],
  };
};
