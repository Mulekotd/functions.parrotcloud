const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./"),
    libraryTarget: "this",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "#utils": path.resolve(__dirname, "src/utils"),
    },
  },
  externals: [nodeExternals()],
};
