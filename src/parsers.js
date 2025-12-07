import yaml from "js-yaml";
import path from "path";

export default function parse(data, filename) {
  const ext = path.extname(filename).toLowerCase();

  if (ext === ".json") return JSON.parse(data);
  if (ext === ".yml" || ext === ".yaml") return yaml.load(data);

  throw new Error(`Unknown format: ${ext}`);
}
