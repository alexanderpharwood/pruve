import validateObject from "./object.js";

export default function (value, prop) {
  if (validateObject(value) === true) {
    return typeof value[prop] !== "undefined";
  }

  return false;
}
