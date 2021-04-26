import validateString from "./string.js";

export default function (value) {
  if (validateString(value) === true) {
    let expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return expression.test(value) === true;
  }

  return false;
}
