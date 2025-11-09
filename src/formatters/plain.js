import _ from "lodash";

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return "[complex value]";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (nodes, ancestry) => {
    return nodes
      .flatMap((node) => {
        const { key, type } = node;
        const propertyPath = ancestry ? `${ancestry}.${key}` : key;

        switch (type) {
          case "added":
            return `Property '${propertyPath}' was added with value: ${stringify(
              node.value
            )}`;
          case "removed":
            return `Property '${propertyPath}' was removed`;
          case "changed":
            return `Property '${propertyPath}' was updated. From ${stringify(
              node.oldValue
            )} to ${stringify(node.newValue)}`;
          case "nested":
            return iter(node.children, propertyPath);
          case "unchanged":
            return [];
          default:
            throw new Error(`Unknown type: ${type}`);
        }
      })
      .join("\n");
  };

  return iter(tree, "");
};

export default plain;
