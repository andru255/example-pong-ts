const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx|.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    contentBase: "./lib",
    port: 9000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "lib"),
    library: "pongts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Pong v2! reloaded",
      template: "index.html",
    }),
    //new CopyWebpackPlugin({
    //  patterns: [{ from: "./assets/", to: "assets" }],
    //}),
    new WriteFilePlugin(),
  ],
};
