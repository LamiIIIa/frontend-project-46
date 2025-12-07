import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixtures = (filename) => path.join(__dirname, "__fixtures__", filename);
const readFixture = (name) => fs.readFileSync(fixtures(name), "utf-8").trim();

describe("gendiff for nested structures", () => {
  const cases = [
    { fp1: "file1.json", fp2: "file2.json" },
    { fp1: "file1.yml", fp2: "file2.yml" },
  ];

  const expectedStylish = readFixture("expected-stylish.txt");
  const expectedPlain = readFixture("expected-plain.txt");

  describe("stylish format", () => {
    cases.forEach(({ fp1, fp2 }) => {
      test(`works for ${fp1} and ${fp2}`, () => {
        const diff = genDiff(fixtures(fp1), fixtures(fp2));
        expect(diff).toBe(expectedStylish);
      });
    });
  });

  describe("plain format", () => {
    cases.forEach(({ fp1, fp2 }) => {
      test(`works for ${fp1} and ${fp2}`, () => {
        const diff = genDiff(fixtures(fp1), fixtures(fp2), "plain");
        expect(diff).toBe(expectedPlain);
      });
    });
  });

  describe("json format", () => {
    cases.forEach(({ fp1, fp2 }) => {
      test(`works for ${fp1} and ${fp2}`, () => {
        const diff = genDiff(fixtures(fp1), fixtures(fp2), "json");
        expect(() => JSON.parse(diff)).not.toThrow();

        const parsed = JSON.parse(diff);
        expect(parsed).toBeInstanceOf(Array);

        expect(parsed).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ key: "common", type: "nested" }),
            expect.objectContaining({ key: "group1", type: "nested" }),
            expect.objectContaining({ key: "group2", type: "removed" }),
            expect.objectContaining({ key: "group3", type: "added" }),
          ]),
        );
      });
    });
  });
});
