const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
};
const componentsConfig = Object.assign({}, config, {
  name: "componentsConfig",
  entry: path.resolve(__dirname, './src/components/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  }
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
