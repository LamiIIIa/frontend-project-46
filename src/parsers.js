import fs from "fs";
import path from "path";

export default (filepath) => {
  const absoluteP = path.resolve(process.cwd(), filepath); //path.resolve составляет путь до файла, process.cwd() указывает на текущую директорию (полный путь)
  const openFile = fs.readFileSync(absoluteP, "utf-8"); //открывает файл в формате строчки
  return JSON.parse(openFile); //превращает строку из JSON файла в JS объект
};
