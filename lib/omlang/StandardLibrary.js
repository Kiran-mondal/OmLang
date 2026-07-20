export const std = {
  len: (item) => {
    if (item === undefined || item === null) return 0;
    let count = 0;
    while(item[count] !== undefined) count++; 
    return count;
  },
  upper: (str) => {
    if (typeof str !== 'string') return str;
    let result = '';
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) result += String.fromCharCode(charCode - 32);
      else result += str[i];
    }
    return result;
  },
  lower: (str) => {
    if (typeof str !== 'string') return str;
    let result = '';
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) result += String.fromCharCode(charCode + 32);
      else result += str[i];
    }
    return result;
  },
  append: (arr, val) => {
    if (!Array.isArray(arr)) return [arr, val];
    let newArr = [...arr];
    newArr[std.len(newArr)] = val; 
    return newArr;
  },
  pop: (arr) => {
    if (!Array.isArray(arr) || std.len(arr) === 0) return arr;
    let newArr = [];
    let length = std.len(arr);
    for (let i = 0; i < length - 1; i++) newArr[i] = arr[i];
    return newArr;
  },
  reverse: (arr) => {
    if (!Array.isArray(arr)) return arr;
    let newArr = [];
    let length = std.len(arr);
    for (let i = length - 1, j = 0; i >= 0; i--, j++) newArr[j] = arr[i];
    return newArr;
  },
  abs: (num) => {
    if (typeof num !== 'number') return num;
    return num < 0 ? -num : num;
  },
  pow: (base, exp) => {
    if (typeof base !== 'number' || typeof exp !== 'number') return 0;
    if (exp === 0) return 1;
    let result = 1;
    for (let i = 0; i < std.abs(exp); i++) result = result * base;
    return exp < 0 ? 1 / result : result;
  },
  split: (str, sep) => {
    if (typeof str !== 'string') return [str];
    let result = [];
    let current = '';
    let i = 0;
    while (i < str.length) {
      let match = true;
      for (let j = 0; j < sep.length; j++) {
        if (str[i + j] !== sep[j]) { match = false; break; }
      }
      if (match && sep.length > 0) {
        result[std.len(result)] = current;
        current = '';
        i += sep.length;
      } else {
        current += str[i];
        i++;
      }
    }
    result[std.len(result)] = current;
    return result;
  },
  join: (arr, sep) => {
    if (!Array.isArray(arr)) return arr;
    let result = '';
    let len = std.len(arr);
    for (let i = 0; i < len; i++) {
      result += arr[i];
      if (i < len - 1) result += sep;
    }
    return result;
  },
  replace: (str, oldStr, newStr) => {
    if (typeof str !== 'string' || typeof oldStr !== 'string') return str;
    if (oldStr.length === 0) return str;
    let result = '';
    let i = 0;
    while (i < str.length) {
      let match = true;
      for (let j = 0; j < oldStr.length; j++) {
        if (str[i + j] !== oldStr[j]) { match = false; break; }
      }
      if (match) {
        result += newStr;
        i += oldStr.length;
      } else {
        result += str[i];
        i++;
      }
    }
    return result;
  },
  // 🔥 NEW: Manual Bubble Sort Algorithm
  sort: (arr) => {
    if (!Array.isArray(arr)) return arr;
    let newArr = [...arr];
    let n = std.len(newArr);
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // যদি প্রথম সংখ্যাটি পরের সংখ্যার চেয়ে বড় হয়, তবে জায়গা বদল করবে
        if (newArr[j] > newArr[j + 1]) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
      }
    }
    return newArr;
  }
};
