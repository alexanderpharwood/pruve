import validateArray from "./array.js";
import validateString from "./string.js";

export default function (value, prop) {
  if (validateArray(value) === true || validateString(value) === true) {
    return value.includes(prop);
  }

  return false;
}
