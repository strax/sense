#!/usr/bin/env node
import serve from "webpack-serve";
import webpackConfig from "@sense/explorer/webpack.config.js";
// @ts-ignore
import { version } from "@sense/explorer/package.json";
import createLogger from "webpack-log";
import cosmiconfig from "cosmiconfig";
import minimatch from "minimatch";

interface Config {
  examples: string;
  tsconfig: string;
}

const DefaultConfig: Config = {
  examples: "src/**/__examples__/*.example.*",
  tsconfig: "tsconfig.json"
};

async function mkConfig(): Promise<Config> {
  const explorer = cosmiconfig("sense");
  const resolved = (await explorer.load()).config;
  return Object.assign({}, DefaultConfig, resolved || {});
}

async function start() {
  const log = createLogger({ name: "sense" });
  log.info(`Sense v${version} starting`);

  const config = await mkConfig();
  console.dir(config);

  serve({ config: webpackConfig(config), hot: { logLevel: "error" } });
}

start();
