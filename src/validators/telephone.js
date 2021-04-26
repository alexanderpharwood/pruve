import validateString from "./string.js";

export default function (value) {
  if (validateString(value) === true) {
    let expression = /(?=(?:.*\d){9,})[\d\+\-\(]((?:\(?\+?\d*\)? ?-?)* ?-?(?:\(?\d{2,}\)? ?-?){3,})\b/;
    return expression.test(value) === true;
  }

  return false;
}
