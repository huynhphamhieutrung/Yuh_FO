export class BaseModel {
  constructor(obj = null) {
    if (obj) {
      this.update(obj);
    }
  }

  update(obj) {
    const data = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        data[toCamelCase(key)] = obj[key];
      }
    }
    Object.assign(this, data);
  }
}

function toCamelCase(str) {
  if ('_' === str.charAt(0)) {
    return str;
  }

  let arr = str.trim().split('_');
  let firstWord = arr[0];
  arr.shift();
  arr = arr.map(word => word.charAt(0).toUpperCase() + word.substr(1));

  return firstWord + arr.join('');
}
