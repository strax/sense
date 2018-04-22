import compiler from "./compiler";
import fs from "fs";
import path from "path";

function output(result: any): string {
  return result.toJson().modules[0].source;
}

describe("fixtures", () => {
  for (const fixture of fs.readdirSync(path.join(__dirname, "./fixtures"))) {
    test(fixture, async () => {
      const result = await compiler(path.join("./fixtures", fixture));
      expect(output(result)).toMatchSnapshot();
    });
  }
});
