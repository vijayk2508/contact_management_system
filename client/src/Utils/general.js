import _ from "lodash";

function isObjectDirty(obj2, obj1) {
  let updateObj = {};
  _.forEach(obj2, (value, key) => {
    if (obj1 && !_.isEqual(value, obj1[key])) {
      updateObj[key] = value;
    }
  });

  if (!Object.keys(updateObj || {})?.length) {
    return null;
  } else {
    return updateObj;
  }
}

export { isObjectDirty };
