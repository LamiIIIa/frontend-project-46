import parse from "./parsers.js";

export default (fp1, fp2) => {
const f1 = parse(fp1);
const f2 = parse(fp2);
return {f1, f2}
};
