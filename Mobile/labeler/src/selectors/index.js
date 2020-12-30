export const getCaptureIdx = (store, name) => store.captures.indexOf(name);

export const getCaptureByIdx = (store, idx) => {
  if (idx >= 0 && idx < store.captures.length) {
    console.log("good index", idx);
    return store.captures[idx];
  }
  console.log("bad index", idx);
  return "";
  //idx >= 0 && idx < store.captures.length ? store.captures[idx] : "";
};
