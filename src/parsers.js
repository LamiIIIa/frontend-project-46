import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export default (filepath) => {
  const absoluteP = path.resolve(process.cwd(), filepath); //path.resolve составляет путь до файла, process.cwd() указывает на текущую директорию (полный путь)
  const openFile = fs.readFileSync(absoluteP, "utf-8"); //открывает файл в формате строчки

  const format = path.extname(filepath).toLowerCase();

  if (format === ".json") {
    return JSON.parse(openFile);
  }

  if (format === ".yml" || format === ".yaml") {
    return yaml.load(openFile);
  }

  throw new Error(`Uncorrect file format: ${format}`);
};
