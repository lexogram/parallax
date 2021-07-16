/**
 * Extends an instance with the methods of a given class
 *
 * Adds the methods of the prototype of a given class to as own
 * properties to an instance of a different class. The prototype of
 * the altered instance is not altered.
 *
 * This allows you to create multiple scripts, each treating a
 * particular feature in a modular fashion, and to combine all
 * those features a single instance.
 *
 * @param {instance} instance     instance to be extended
 * @param {instance} instance     instance to be extended
 * @param {class}    classObject  class with extending methods
 */
export const extend = (instance, classObject) => {
  const source = classObject.prototype;
  const methodNames = Object.getOwnPropertyNames(source);

  methodNames.forEach((name) => {
    const method = source[name];
    if (name !== "constructor" && typeof method === "function") {
      instance[name] = method;
    }
  });
}


export const removeFrom = (array, item, removeAll) => {
  let removed = 0;

  // If `item` is an array of items or functions, treat recursively
  if (Array.isArray(item)) {
    removed = item.reduce((excess, entry) => {
      excess += removeFrom(array, entry, removeAll);
      return excess;
    }, 0);

    return removed;
  }

  // If we get here, item is an individual items or function
  let index, found;

  do {
    if (typeof item === "function") {
      index = array.findIndex(item);
    } else {
      index = array.indexOf(item);
    }

    found = !(index < 0);
    if (found) {
      array.splice(index, 1);
      removed += 1;
    }
  } while (removeAll && found);

  return removed;
};


export const valuesMatch = (a, b) => {
  if (!a || typeof a !== "object" || !b || typeof b !== "object") {
    return false;
  }

  const propsA = Object.getOwnPropertyNames(a);
  const propsB = Object.getOwnPropertyNames(b);

  if (propsA.length !== propsB.length) {
    return false;
  }

  const total = propsA.length;
  for (let ii = 0; ii < total; ii += 1) {
    const prop = propsA[ii];

    if (a[prop] !== b[prop]) {
      return false;
    }

    if (!removeFrom(propsB, prop)) {
      // prop is undefined in a and missing in b
      return false;
    }
  }

  return true;
};
