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
        include: path.resolve("../components/src/")
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      manifest$: path.resolve("../manifest.json"),
      source: path.resolve("../components/src/")
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
      SENSE_GUEST_PATH: JSON.stringify(path.resolve("../components/src"))
    }),
    new HtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: "development" })
  ]
};
