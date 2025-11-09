import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixtures = (filename) => path.join(__dirname, "__fixtures__", filename);

describe("gendiff for nested structures", () => {
  const cases = [
    { fp1: "file1.json", fp2: "file2.json" },
    { fp1: "file1.yml", fp2: "file2.yml" },
  ];

  describe("stylish format", () => {
    cases.forEach(({ fp1, fp2 }) => {
      test(`works for ${fp1} and ${fp2}`, () => {
        const diff = genDiff(fixtures(fp1), fixtures(fp2));
        expect(diff).toBe(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
      });
    });
  });

  describe("plain format", () => {
    const expectedPlain = [
      "Property 'common.follow' was added with value: false",
      "Property 'common.setting2' was removed",
      "Property 'common.setting3' was updated. From true to null",
      "Property 'common.setting4' was added with value: 'blah blah'",
      "Property 'common.setting5' was added with value: [complex value]",
      "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
      "Property 'common.setting6.ops' was added with value: 'vops'",
      "Property 'group1.baz' was updated. From 'bas' to 'bars'",
      "Property 'group1.nest' was updated. From [complex value] to 'str'",
      "Property 'group2' was removed",
      "Property 'group3' was added with value: [complex value]",
    ].join("\n");

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
          ])
        );
      });
    });
  });
});
