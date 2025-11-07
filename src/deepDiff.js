import _ from "lodash";

const deepDiff = {
  deep(obj1, obj2) {
    const keys = _.sortBy([
      ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
    ]);

    return keys.map((key) => {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const bothObjects = _.isPlainObject(val1) && _.isPlainObject(val2);

      if (bothObjects) {
        return {
          key,
          type: "nested",
          children: this.deep(val1, val2),
        };
      }

      if (!(key in obj1)) {
        return { key, type: "added", value: val2 };
      }

      if (!(key in obj2)) {
        return { key, type: "removed", value: val1 };
      }

      if (_.isEqual(val1, val2)) {
        return { key, type: "unchanged", value: val1 };
      }

      return { key, type: "changed", oldValue: val1, newValue: val2 };
    });
  },
};

export default deepDiff;
