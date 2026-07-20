export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  
  let output = [];
  let variables = {};
  let functions = {};

  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  // 🌟 OmLang Native Standard Library
  const std = {
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
    
    // 🔥 NEW: String Split (বাক্য ভেঙে অ্যারে বানানো)
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
    
    // 🔥 NEW: Array Join (অ্যারে জোড়া লাগিয়ে স্ট্রিং বানানো)
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
    
    // 🔥 NEW: String Replace (শব্দ পরিবর্তন করা)
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
    }
  };

  const fastEval = (expr) => {
    try {
      let processed = expr.replace(/[a-zA-Z_]\w*/g, (match) => {
        if (std[match]) return `std.${match}`;
        if (variables[match] !== undefined) {
          let val = variables[match];
          if (Array.isArray(val)) return JSON.stringify(val);
          return typeof val === 'string' ? `"${val}"` : val;
        }
        return match;
      });
      return eval(processed); 
    } catch(e) {
      return expr.replace(/^"|"$/g, '');
    }
  };

  const extractBlock = (startIndex, linesArray) => {
    let block = [];
    let braceCount = 1;
    let i = startIndex + 1;
    while (i < linesArray.length && braceCount > 0) {
      if (linesArray[i].endsWith('{')) braceCount++;
      if (linesArray[i] === '}') braceCount--;
      if (braceCount > 0) block.push(linesArray[i]);
      i++;
    }
    return { block, nextIndex: i - 1 };
  };

  const executeBlock = (blockLines) => {
    for (let i = 0; i < blockLines.length; i++) {
      let line = blockLines[i];
      if (line === '}' || line === '{' || line === '' || line.startsWith('//')) continue;

      if (line.startsWith('func')) {
        let funcMatch = line.match(/^func\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*\{$/);
        if (funcMatch) {
            let funcName = funcMatch[1];
            let params = funcMatch[2].split(',').map(p => p.trim());
            let { block, nextIndex } = extractBlock(i, blockLines);
            functions[funcName] = { params, block };
            i = nextIndex;
            continue;
        }
      }

      if (line.startsWith('for')) {
        let parts = line.split(' '); 
        let varName = parts[1];
        let start = parseInt(parts[3]);
        let end = parseInt(parts[5]);
        let { block, nextIndex } = extractBlock(i, blockLines);
        for (let j = start; j <= end; j++) {
          variables[varName] = j;
          executeBlock(block);
        }
        i = nextIndex;
        continue;
      }

      if (line.includes('=') && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('while')) {
        let parts = line.split('=');
        let varName = parts[0].trim();
        let valExpr = parts.slice(1).join('=').trim(); 
        variables[varName] = fastEval(valExpr);
        continue;
      }

      if (line.startsWith('show')) {
        let content = line.substring(5).trim();
        let result = fastEval(content);
        if (Array.isArray(result)) {
           output.push("[" + result.join(", ") + "]");
        } else {
           output.push(result);
        }
        continue;
      }

      if (line.startsWith('while')) {
        let cond = line.substring(6, line.length - 1).trim();
        let { block, nextIndex } = extractBlock(i, blockLines);
        let safeCounter = 0;
        while (fastEval(cond) && safeCounter < 10000000) {
          executeBlock(block);
          safeCounter++;
        }
        i = nextIndex;
        continue;
      }
    }
  };

  try {
    executeBlock(lines);
  } catch (err) {
    output.push(`[Runtime Error] Execution failed.`);
  }
  
  return output.join('\n');
}
