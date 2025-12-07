import fs from "fs";
import path from "path";
import parse from "./parsers.js";
import deepDiff from "./deepDiff.js";
import format from "./formatters/index.js";

export default function genDiff(filepath1, filepath2, formatName = "stylish") {
  const absolute1 = path.resolve(filepath1);
  const absolute2 = path.resolve(filepath2);

  const file1 = fs.readFileSync(absolute1, "utf-8");
  const file2 = fs.readFileSync(absolute2, "utf-8");

  const data1 = parse(file1, filepath1);
  const data2 = parse(file2, filepath2);

  const diffTree = deepDiff(data1, data2);

  return format(diffTree, formatName);
}
