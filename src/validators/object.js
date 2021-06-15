export default function (value) {
  return value && typeof value === "object" && Array.isArray(value) === false;
}
