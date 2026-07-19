export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  
  let output = [];
  let variables = {};
  let functions = {};

  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  // দ্রুত ক্যালকুলেশন ইঞ্জিন
  const fastEval = (expr) => {
    try {
      let processed = expr.replace(/[a-zA-Z_]\w*/g, (match) => {
        return variables[match] !== undefined ? variables[match] : match;
      });
      return eval(processed); 
    } catch(e) {
      return expr.replace(/^"|"$/g, '');
    }
  };

  // ব্লক এক্সট্রাকশন লজিক
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

  // মেইন এক্সিকিউশন ইঞ্জিন
  const executeBlock = (blockLines) => {
    for (let i = 0; i < blockLines.length; i++) {
      let line = blockLines[i];
      if (line === '}' || line === '{' || line === '' || line.startsWith('//')) continue;

      // ১. Function Definition
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

      // ২. For Loop (১ কোটি ক্যালকুলেশন ক্যাপাসিটি)
      if (line.startsWith('for')) {
        let parts = line.split(' '); // for x = 1 to 10000000 {
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

      // ৩. Variable Assignment
      if (line.includes('=') && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('while')) {
        let parts = line.split('=');
        variables[parts[0].trim()] = fastEval(parts[1].trim());
        continue;
      }

      // ৪. Show Command
      if (line.startsWith('show')) {
        let content = line.substring(5).trim();
        output.push(fastEval(content));
        continue;
      }

      // ৫. While Loop
      if (line.startsWith('while')) {
        let cond = line.substring(6, line.length - 1).trim();
        let { block, nextIndex } = extractBlock(i, blockLines);
        while (fastEval(cond)) {
          executeBlock(block);
        }
        i = nextIndex;
        continue;
      }
    }
  };

  executeBlock(lines);
  return output.join('\n');
}
