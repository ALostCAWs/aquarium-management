export function toTitleCase(str) {
  return str.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

export function timestampToDate(timestamp) {
  if (!timestamp) {
    return ``;
  }

  const date = new Date(parseInt(timestamp));
  const dd = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const MM = date.getMonth() <= 8 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${dd}-${MM}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export default { toTitleCase, timestampToDate };