import { std } from './StandardLibrary';
import { extractBlock } from './Utils';

export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  
  let output = [];
  let variables = {};
  let functions = {};

  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  const fastEval = (expr) => {
    try {
      let processed = expr.replace(/[a-zA-Z_]\w*/g, (match) => {
        if (std[match]) return `std.${match}`;
        if (variables[match] !== undefined) {
          let val = variables[match];
          if (typeof val === 'object' && val !== null) return JSON.stringify(val);
          return typeof val === 'string' ? `"${val}"` : val;
        }
        return match;
      });
      return eval(processed); 
    } catch(e) {
      return expr.replace(/^"|"$/g, '');
    }
  };

  const executeBlock = (blockLines) => {
    let skipElse = false; 

    for (let i = 0; i < blockLines.length; i++) {
      let line = blockLines[i];
      if (line === '}' || line === '{' || line === '' || line.startsWith('//')) continue;

      if (line.startsWith('throw')) {
        let content = line.substring(5).trim();
        throw new Error(fastEval(content)); 
      }

      if (line.startsWith('try')) {
        let { block: tryBlock, nextIndex } = extractBlock(i, blockLines);
        i = nextIndex;
        
        let exceptBlock = [];
        let hasExcept = false;
        
        if (i + 1 < blockLines.length && (blockLines[i + 1] === 'except {' || blockLines[i + 1].startsWith('except'))) {
          hasExcept = true;
          let exceptExt = extractBlock(i + 1, blockLines);
          exceptBlock = exceptExt.block;
          i = exceptExt.nextIndex;
        }

        try {
          executeBlock(tryBlock);
        } catch (err) {
          if (hasExcept) executeBlock(exceptBlock);
          else output.push(`[Runtime Error] Program crashed!`);
        }
        continue;
      }

      // 🌟 UNIQUE: 'if' Condition
      if (line.startsWith('if ')) {
        let cond = line.substring(3, line.length - 1).trim();
        let { block, nextIndex } = extractBlock(i, blockLines);
        if (fastEval(cond)) {
          executeBlock(block);
          skipElse = true; 
        } else {
          skipElse = false;
        }
        i = nextIndex;
        continue;
      }

      // 🌟 UNIQUE: 'maybe' Condition (OmLang's version of elif)
      if (line.startsWith('maybe ')) {
        let cond = line.substring(6, line.length - 1).trim();
        let { block, nextIndex } = extractBlock(i, blockLines);
        if (!skipElse && fastEval(cond)) {
          executeBlock(block);
          skipElse = true;
        }
        i = nextIndex;
        continue;
      }

      // 🌟 UNIQUE: 'otherwise' Condition (OmLang's version of else)
      if (line.startsWith('otherwise')) {
        let { block, nextIndex } = extractBlock(i, blockLines);
        if (!skipElse) {
          executeBlock(block);
        }
        i = nextIndex;
        continue;
      }

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

      // 🌟 UNIQUE: OmLang 'data' keyword for Dictionaries
      if (line.includes('=') && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('maybe') && !line.startsWith('while')) {
        let parts = line.split('=');
        let varName = parts[0].trim();
        let valExpr = parts.slice(1).join('=').trim(); 
        
        // যদি ইউজার 'data { ... }' লেখে, তবে আমরা 'data' মুছে শুধু অবজেক্ট প্রসেস করব
        if (valExpr.startsWith('data {') && valExpr.endsWith('}')) {
           valExpr = `(${valExpr.substring(4).trim()})`; // 'data' কি-ওয়ার্ডটি বাদ দিয়ে ব্র্যাকেটে মোড়ানো
        }
        
        variables[varName] = fastEval(valExpr);
        continue;
      }

      if (line.startsWith('show')) {
        let content = line.substring(5).trim();
        let result = fastEval(content);
        
        if (typeof result === 'object' && result !== null) {
           output.push(JSON.stringify(result, null, 2));
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
    output.push(`[Fatal Error] Application Crash Prevented!`);
  }
  
  return output.join('\n');
}
