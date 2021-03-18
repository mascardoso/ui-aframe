const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const config = {
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    clean: true
  }
};
const componentsConfig = Object.assign({}, config, {
  name: "componentsConfig",
  entry: path.resolve(__dirname, './src/components/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/components/assets'), to: path.resolve(__dirname, './dist/assets') }
      ],
    }),
  ],
});
const appConfig = Object.assign({}, config, {
  entry: path.resolve(__dirname, "./src/app/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/app", "index.html"),
    }),
  ],
});

module.exports = [componentsConfig, appConfig];
