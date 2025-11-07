import _ from "lodash";

const indentSize = 4;

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = " ".repeat(depth * indentSize);
    const bracketIndent = " ".repeat((depth - 1) * indentSize);
    const lines = Object.entries(value).map(
      ([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`
    );
    return ["{", ...lines, `${bracketIndent}}`].join("\n");
  }
  return String(value);
};

const iter = (nodes, depth) => {
  const indent = " ".repeat(depth * indentSize - 2);
  const bracketIndent = " ".repeat((depth - 1) * indentSize);

  const lines = nodes.flatMap((node) => {
    const { key, type } = node;

    switch (type) {
      case "nested":
        return `${indent}  ${key}: ${iter(node.children, depth + 1)}`;
      case "added":
        return `${indent}+ ${key}: ${formatValue(node.value, depth)}`;
      case "removed":
        return `${indent}- ${key}: ${formatValue(node.value, depth)}`;
      case "unchanged":
        return `${indent}  ${key}: ${formatValue(node.value, depth)}`;
      case "changed":
        return [
          `${indent}- ${key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${key}: ${formatValue(node.newValue, depth)}`,
        ];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return ["{", ...lines, `${bracketIndent}}`].join("\n");
};

const stylish = (diffTree) => iter(diffTree, 1);

export default stylish;
