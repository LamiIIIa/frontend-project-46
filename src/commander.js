import { Command } from "commander";
import genDiff from "./index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .argument("<fp1>")
  .argument("<fp2>")
  .option("-f, -format [type]", "output format")
  .action((fp1, fp2) => {
    const diff = genDiff(fp1, fp2);
    console.log(diff);
  });

export default program;
