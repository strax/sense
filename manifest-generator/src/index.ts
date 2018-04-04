import * as path from "path";
import * as fs from "fs";

import Project from "./Project";
import { makeProjectManifest } from "./manifest";

const project = new Project(path.resolve("components"));
const manifest = makeProjectManifest(project);
fs.writeFileSync("manifest.json", JSON.stringify(manifest));
