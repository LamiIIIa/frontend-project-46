import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("gendiff works for flat JSON", () => {
  const fp1 = path.join(__dirname, "__fixtures__", "file1.json");
  const fp2 = path.join(__dirname, "__fixtures__", "file2.json");
  const diff = genDiff(fp1, fp2);

  expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test("gendiff works for flat YAML", () => {
  const f1 = path.join(__dirname, "__fixtures__", "file1.yml");
  const f2 = path.join(__dirname, "__fixtures__", "file2.yml");
  const diff = genDiff(f1, f2);

  expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
