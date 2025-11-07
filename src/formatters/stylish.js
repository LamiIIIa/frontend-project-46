import _ from "lodash";

const indentSize = 4;

const getIndent = (depth, replacer = " ") =>
  replacer.repeat(indentSize * depth - 2);
const getBracketIndent = (depth) => " ".repeat(indentSize * (depth - 1));

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) =>
      `${getIndent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`
  );

  return ["{", ...lines, `${getBracketIndent(depth + 1)}}`].join("\n");
};

const iter = (nodes, depth) => {
  const makeLine = (sign, key, value) => {
    const formattedValue = formatValue(value, depth);
    return `${getIndent(depth, " ")}${sign} ${key}: ${formattedValue}`;
  };

  const lines = nodes.flatMap((node) => {
    const { key, type } = node;

    switch (type) {
      case "nested":
        return `${getIndent(depth, " ")}  ${key}: ${iter(
          node.children,
          depth + 1
        )}`;
      case "added":
        return makeLine("+", key, node.value);
      case "removed":
        return makeLine("-", key, node.value);
      case "unchanged":
        return makeLine(" ", key, node.value);
      case "changed":
        return [
          makeLine("-", key, node.oldValue),
          makeLine("+", key, node.newValue),
        ];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return ["{", ...lines, `${getBracketIndent(depth)}}`].join("\n");
};

const stylish = (diffTree) => iter(diffTree, 1);

export default stylish;
