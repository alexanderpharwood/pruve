export default function (value, type) {
  if (Array.isArray(value) === false) {
    return false;
  }

  return value.every((item) => {
    if (type === "array") return Array.isArray(item);
    return typeof item === type;
  });
}
