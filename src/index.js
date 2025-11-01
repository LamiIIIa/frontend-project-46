import _ from "lodash";
import parse from "./parsers.js";

export default (fp1, fp2) => {
  const f1 = parse(fp1);
  const f2 = parse(fp2);

  const keys = _.sortBy([...new Set([...Object.keys(f1), ...Object.keys(f2)])]);

  const lines = keys.flatMap((key) => {
    const has1 = key in f1;
    const has2 = key in f2;
    if (has1 && has2) {
      if (_.isEqual(f1[key], f2[key])) {
        return `  ${key}: ${f1[key]}`;
      }
      return [`- ${key}: ${f1[key]}`, `+ ${key}: ${f2[key]}`];
    }
    if (has1) return `- ${key}: ${f1[key]}`;
    if (has2) return `+ ${key}: ${f2[key]}`;
    return [];
  });

  return ["{", ...lines, "}"].join("\n");
};
