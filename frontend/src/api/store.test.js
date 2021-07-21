import store from './store.js'

const initialState = {
  initial: "state",
  nested: { several: { levels: "deep" } },
  alternate: "value",
  object: { containing: { array: [1, 2, 3] } }
};


test("store can be initialized", () => {
  const success = store.initializeState(initialState);

  expect(success).toBe(true)
})

test("can set and remove listeners", () => {
  function syncState(newState) {
    expect(newState).toBe("deleted")
  }

  function syncAltState(newState) {
    expect(newState).toBe("deleted");
  }

  function syncNestedState(newState) {
    expect(newState).toBe("deleted");
  }

  const listenerDefinitions = [
    { listener: syncState },
    { listener: syncAltState, filter: "alternate" },
    {
      listener: syncNestedState,
      filter: ["nested", "several", "levels"]
    }
  ];

  const removers = []
  listenerDefinitions.forEach(({ listener, filter }) => {
    removers.push(store.addListener(listener, filter));
  });

  expect(store.listeners.size).toBe(3);

  expect(removers).toHaveLength(3);
  removers.forEach(remover => {
    expect(typeof remover).toBe("function")
    remover()
  })
    ;
  expect(store.listeners.size).toBe(0)
})

test("can set certain values of storeState without affecting others", done => {
  const stateChange = {
    initial: "new state",
    nested: { several: { levels: "deeper" } },
  }
  let expected = Object.assign({ ...initialState }, stateChange)
  // console.log("initialState:", initialState)
  // console.log("expected:", expected)

  function syncState(newState) {
    expect(newState).toEqual(expected);
    // console.log("newState = expected =", expected);
    const listenerSize = store.listeners.size;
    if (listenerSize) {
      // console.log("removing listener");
      expected = "deleted"
      const removedCount = remover();
      expect(removedCount).toBe(1)
      // console.log("listener removed")
    } else {
      expect(store.listeners.size).toBe(0);
      done()
    }
  }

  const remover = store.addListener(syncState);

  expect(store.listeners.size).toBe(1);
  expect(typeof remover).toBe("function");

  try {
    // console.log("about to setState")
    const success = store.setState(stateChange)
    // console.log("success:", success)
    expect(success).toBe(true)
  } catch (error) {
    console.log("try error caught after setState()")
    done(error)
  }
});


test("can create a path that did not originally exist", done => {
  const leaf = {
    now: "edited"
  };
  const filter = ["path", "to", "new"];
  const stateChange = {
    path: { to: { new: leaf } }
  }
  let expected = Object.assign({ ...initialState }, stateChange);

  function syncState(newState) {
    expect(newState).toEqual(expected);
    const listenerSize = store.listeners.size;
    // console.log("newState = expected =", JSON.stringify(expected, null, "  "));

    if (listenerSize) {
      // console.log("removing listener");
      expected = "deleted";
      const removedCount = remover();
      expect(removedCount).toBe(1);
      // console.log("listener removed");
    } else {
      expect(store.listeners.size).toBe(0);
      done();
    }
  }

  const remover = store.addListener(syncState);

  expect(store.listeners.size).toBe(1);
  expect(typeof remover).toBe("function");

  try {
    const success = store.setState(stateChange);
    expect(success).toBe(true);
  } catch (error) {
    console.log("try error caught while creating a new path");
    done(error);
  }
})


test("can get callback from nested change with object", (done) => {
  const newValue = { levels: "deepest" };
  const path = ["nested", "several"]; // !== filter
  const filter = ["nested", "several", "levels"];
  let expected = { levels: "deepest" };

  function syncNestedState(newState) {
    // console.log("newState =", JSON.stringify(newState, null, "  "));
    // console.log("expected =", JSON.stringify(expected, null, "  "));

    expect(newState).toEqual(expected);
    const listenerSize = store.listeners.size;

    if (listenerSize) {
      // console.log("removing listener");
      expected = "deleted";
      const removedCount = remover();
      expect(removedCount).toBe(1);
      // console.log("listener removed");
    } else {
      expect(store.listeners.size).toBe(0);
      done();
    }
  }

  const remover = store.addListener(syncNestedState, filter);
  // console.log("remover:", remover)

  expect(store.listeners.size).toBe(1);
  expect(typeof remover).toBe("function");

  try {
    const success = store.setState(newValue, path);
    expect(success).toBe(true);
  } catch (error) {
    console.log("try error caught while setting deepest");
    done(error);
  }
});


test("can get callback from nested change with string", (done) => {
  const newValue = "even deeper";
  const filter = ["nested", "several", "levels"];
  let expected = { levels: newValue };

  function syncNestedState(newState) {
    // console.log("newState =", JSON.stringify(newState, null, "  "));
    // console.log("expected =", JSON.stringify(expected, null, "  "));

    expect(newState).toEqual(expected);
    const listenerSize = store.listeners.size;

    if (listenerSize) {
      // console.log("removing listener");
      expected = "deleted";
      const removedCount = remover();
      expect(removedCount).toBe(1);
      // console.log("listener removed");
    } else {
      expect(store.listeners.size).toBe(0);
      done();
    }
  }

  const remover = store.addListener(syncNestedState, filter);
  // console.log("remover:", remover)

  expect(store.listeners.size).toBe(1);
  expect(typeof remover).toBe("function");

  try {
    const success = store.setState(newValue, filter);
    expect(success).toBe(true);
  } catch (error) {
    console.log("try error caught while setting even deeper string");
    done(error);
  }
});
