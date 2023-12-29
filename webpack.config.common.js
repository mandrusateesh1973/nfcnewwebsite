const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const withReport = process.env.ANALYZER;

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].[contenthash].js",
    sourceMapFilename: "[name].[contenthash].map",
    clean: true,
  },
  
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /node_modules(?!\/@thrash-industries\/react-actioncable-provider)/,
        exclude:
          /node_modules\/(?!(@thrash-industries\/react-actioncable-provider)\/).*/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving of loaders)
    modules: [path.resolve("src"), "node_modules"],
    extensions: [
      ".js",
      ".jsx",
      ".sass",
      ".scss",
      ".css",
      ".module.sass",
      ".module.scss",
      ".module.css",
      ".png",
      ".svg",
      ".gif",
      ".jpeg",
      ".jpg",
    ],
    // extensions that are used
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      //favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new WebpackManifestPlugin({
      publicPath: path.join(__dirname, "/dist"),
      writeToFileEmit: true,
    }),
    withReport ? new BundleAnalyzerPlugin() : "",
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
