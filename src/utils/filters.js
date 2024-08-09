//   <p>{{ $filters.capitalize('hello world') }}</p>

export function capitalize(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function findByKey(array, key, value) {
  const filterArray = array.filter((obj) => obj[key] === value.toString());
  return filterArray.length > 0 ? filterArray[0].name : null;
}
