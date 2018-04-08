const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyledComponentsTransformer = require("typescript-plugin-styled-components");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: ["./src/host.tsx"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [StyledComponentsTransformer.createTransformer()]
              })
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ["@sense/webpack-ts-props-loader"],
        include: path.resolve("../example/src/")
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      source: path.resolve("../example/src/")
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  node: {
    fs: "empty",
    module: "empty"
  },
  plugins: [
    new webpack.DefinePlugin({
      SENSE_GUEST_PATH: JSON.stringify(path.resolve("../example/src"))
    }),
    new HtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" })
  ]
};
