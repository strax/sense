const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyledComponentsTransformer = require("typescript-plugin-styled-components");
const micromatch = require("micromatch");

module.exports = config => {
  const exampleFilePattern = micromatch.makeRe(config.examples);
  return {
    mode: "development",
    devtool: "source-map",
    entry: [path.join(__dirname, "src/host.tsx")],
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
        }
        // {
        //   test: /\.tsx?$/,
        //   use: [
        //     {
        //       loader: "@sense/webpack-ts-props-loader",
        //       options: {
        //         tsconfig: path.join(process.cwd(), config.tsconfig)
        //       }
        //     }
        //   ],
        //   include: process.cwd()
        // }
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
      filename: "[name].js"
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
      new webpack.EnvironmentPlugin({ NODE_ENV: "development" })
    ],
    serve: {
      // dev: {
      //   stats: "minimal"
      // }
    }
  };
};
