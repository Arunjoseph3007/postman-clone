export const arrayToObjectFormatter = (array) => {
  return array
    .filter(
      (elm) =>
        elm.key && elm.value && elm.active && elm.key.split(" ").length === 1
    )
    .reduce(
      (currentObj, newElm) => ({
        ...currentObj,
        [newElm.key]: newElm.value,
      }),
      {}
    );
};
