/**
 * src/api/store.js
 *
 * @class Store
 *
 * A singleton instance of this class can be used as a centralized
 * store of state for all components in a project. As with setState
 * for React you can use...
 *
 *   store.setState({ property: value })
 *
 * ... to update property at the root of the store object.
 *
 * You can also use...
 *
 *   store.setState({ property:value }, ["path","to","nested","data"])
 *
 * ... where the filter array provides a path into the store where the
 * property should be saved. If the filter path does not already exist
 * it will be created.
 *
 * WARNING: If the value of any but the last of the items in the
 * filter list is not an object, then an error will be thrown
 *
 * Setting state will update the store, and will trigger any listeners
 * that are filtering for a particular path that is changed. Your
 * listeners should call this.setState() locally in the component
 * they belong to, so that the component will re-render when the
 * watched values in the store are updated.
 */

import { valuesMatch } from "../tools/utilities.js";

let storeState = {};

class Store {
  constructor(state) {
    this.initializeState(state);
    this.listeners = new Set();
    this.removeListener = this.removeListener.bind(this);
  }

  initializeState(state) {
    if (typeof state !== "object") {
      state = {};
    }

    storeState = state;

    return storeState === state;
  }

  setState(newState, filter) {
    filter = this._sanitizeFilter(filter);
    newState = this._sanitizeState(newState, filter);

    const blocked = this._ensureFilterPathExists(storeState, filter);
    if (blocked) {
      throw new Error(
        "Cannot create path to " +
          filter +
          `\nValue ${blocked.data} found where ${blocked.filter} is requested`
      );
    }
    this.useLiveState = true;
    const result = this._getState(filter);
    if (!result) {
      debugger;
    }
    let [state, parent] = result;
    this.useLiveState = false;
    const before = JSON.parse(JSON.stringify(storeState));

    // Current state at this depth may be a stub string or number
    if (typeof state !== "object") {
      debugger;
      state = {};
      const key = filter[filter.length - 1];
      parent[key] = state;
    }

    Object.assign(state, newState);
    this._pushState(before);

    return true;
  }

  addListener(listener, filter) {
    if (typeof listener !== "function") {
      return;
    }

    filter = this._sanitizeFilter(filter); // array or false

    this.listeners.add({ listener, filter });
    return () => this.removeListener(listener, filter);
  }

  removeListener(listener, filter) {
    let listeners = this._findListenerObjects(listener, filter);

    const removed = listeners.length;

    listeners.forEach((listenerObject) => {
      this.listeners.delete(listenerObject);
      listenerObject.listener("deleted"); // debugging only
    });

    return removed;
  }

  _getState(filter) {
    filter = this._sanitizeFilter(filter);
    const state = filter ? this._getFilteredState(filter) : [storeState, null]; // storeState will always be an object

    return state;
  }

  _sanitizeFilter(filter) {
    if (typeof filter === "string") {
      // Allow a top-level key to be provide as a simple string
      filter = [filter];
    } else if (Array.isArray(filter)) {
      // Ensure that caller cannot alter filter inadvertently
      filter = [...filter];
    } else {
      filter = false;
    }

    return filter;
  }

  _sanitizeState(stateObject, filter) {
    if (typeof stateObject !== "object") {
      if (!filter) {
        throw new Error("Cannot setState for " + stateObject);
      } else {
        const key = filter.pop();
        stateObject = { [key]: stateObject };
      }
    }

    return stateObject;
  }

  _ensureFilterPathExists(state, filter) {
    if (!filter || !filter.length) {
      return;
    }

    filter = filter.slice();
    const key = filter.shift();
    let data = state[key];

    if (data === undefined) {
      // Add an empty stub
      state[key] = data = {};
    }

    if (filter.length) {
      if (typeof data !== "object") {
        // Cannot overwrite existing data
        filter.unshift(key);
        return { data, filter };
      } else {
        return this._ensureFilterPathExists(data, filter);
      }
    }
  }

  _getFilteredState(filter, state = storeState, error = [], depth = 0) {
    let branch;

    if (!Array.isArray(filter)) {
      const type = typeof filter;
      throw new Error(`Unexpected filter type: ${type}\n${filter}`);
    } else if (!filter.length) {
      return [state, null];
    }

    // Tunnel into state, but don't modify the original filter
    filter = filter.slice();
    const key = filter.shift();

    if (typeof key !== "string") {
      error.push(`Filter contains non-string key at index (${depth})`);
      return;
    }

    branch = state[key];

    if (filter.length) {
      // We should go deeper, if we can...
      if (typeof branch !== "object") {
        return; // the requested state data doesn't exist
      }

      // We can go deeper, but there may be an error deeper in
      const result = this._getFilteredState(filter, branch, error, depth + 1);

      if (error.length && !depth) {
        filter.unshift(key);
        const message = error[0] + `\nfilter: ${JSON.stringify(filter)}`;
        throw new Error(message);
      }

      return result;
    } else {
      // We've reached the end of the filter array
      if (!this.useLiveState) {
        // Return a clone so that storeState cannot be altered externally
        branch = JSON.parse(JSON.stringify({ [key]: branch }));
        return branch;
      }

      return [branch, state];
    }
  }

  _findListenerObjects(listener, filter) {
    const listeners = Array.from(this.listeners).filter((listenerObject) => {
      if (!listener || listenerObject.listener === listener) {
        return !filter || listenerObject.filter === filter;
      }
      return false // unnecessary but it keeps the linter happy
    });

    return listeners;
  }

  _pushState(before) {
    const after = storeState;

    this.listeners.forEach(({ listener, filter }) => {
      if (filter) {
        const oldState = this._getFilteredState(filter, before);
        const newState = this._getFilteredState(filter, after);
        if (!valuesMatch(oldState, newState)) {
          listener(newState);
        }
      } else {
        listener(after);
      }
    });
  }
}

const store = new Store(); // creates a singleton instance
export default store;
