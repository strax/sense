const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyledComponentsTransformer = require("typescript-plugin-styled-components");
const micromatch = require("micromatch");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = config => {
  const exampleFilePattern = micromatch.makeRe(config.examples);
  return {
    mode: "development",
    devtool: "eval",
    entry: [path.join(__dirname, "src/index.tsx")],
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
                }),
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "@sense/webpack-ts-props-loader",
              options: {
                tsconfig: path.join(process.cwd(), config.tsconfig)
              }
            }
          ],
          include: process.cwd(),
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        source: process.cwd()
      }
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      devtoolModuleFilenameTemplate: "/[absolute-resource-path]"
    },
    node: {
      fs: "empty",
      module: "empty"
    },
    plugins: [
      new webpack.DefinePlugin({
        CWD: JSON.stringify(process.cwd()),
        EXAMPLE_FILE_PATTERN: exampleFilePattern
      }),
      new HtmlWebpackPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.EnvironmentPlugin({ NODE_ENV: "development" }),
      new ForkTsCheckerPlugin()
    ],
    serve: {
      // dev: {
      //   stats: "minimal"
      // }
    }
  };
};
