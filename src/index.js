import parse from "./parsers.js";
import deepDiff from "./deepDiff.js";
import stylish from "./formatters/stylish.js";

export default (fp1, fp2, formatName = "stylish") => {
  const f1 = parse(fp1);
  const f2 = parse(fp2);

  const diffTree = deepDiff.deep(f1, f2);

  if (formatName === "stylish") {
    return stylish(diffTree);
  }

  throw new Error("Uncorrect format!");
};
