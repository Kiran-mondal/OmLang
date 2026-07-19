export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  
  let output = [];
  let variables = {};
  let functions = {}; // ফাংশন এবং তার প্যারামিটার স্টোর করার মেমরি

  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  // ম্যাথমেটিকাল এবং লজিক্যাল ক্যালকুলেশন (Math লাইব্রেরি সাপোর্ট সহ)
  const evaluateExpression = (expr) => {
    let evalExpr = expr.replace(/[a-zA-Z_]\w*/g, match => {
      if (match === 'Math') return match; // JavaScript এর Math লাইব্রেরিকে অ্যালাউ করবে
      if (variables[match] !== undefined) {
        let val = variables[match];
        // স্ট্রিং হলে তাকে কোটেশনের ভেতরে রাখবে যাতে এরর না আসে
        return typeof val === 'string' ? `"${val}"` : val;
      }
      return match;
    }).replace(/\^/g, '**');

    try {
      return new Function('return ' + evalExpr)();
    } catch(e) {
      // যদি ক্যালকুলেশন না হয়, তবে সরাসরি স্ট্রিং হিসেবে রিটার্ন করবে
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
      if (line === '}' || line === '{' || line === '') continue;

      // ১. Function Definition (প্যারামিটার সহ)
      let funcMatch = line.match(/^func\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*\{$/);
      if (funcMatch) {
        let funcName = funcMatch[1];
        let params = funcMatch[2].split(',').map(p => p.trim()).filter(p => p);
        let { block, nextIndex } = extractBlock(i, blockLines);
        functions[funcName] = { params, block };
        i = nextIndex;
        continue;
      }

      // ২. Function Call (আর্গুমেন্ট সহ রান করা)
      let callMatch = line.match(/^([a-zA-Z_]\w*)\s*\((.*?)\)$/);
      if (callMatch && functions[callMatch[1]]) {
        let funcName = callMatch[1];
        let args = callMatch[2].split(',').map(a => evaluateExpression(a.trim()));
        let funcObj = functions[funcName];
        
        let backupVars = {};
        funcObj.params.forEach((param, index) => {
           backupVars[param] = variables[param];
           variables[param] = args[index]; 
        });

        executeBlock(funcObj.block);

        funcObj.params.forEach(param => {
           if (backupVars[param] !== undefined) variables[param] = backupVars[param];
           else delete variables[param];
        });
        continue;
      }

      // ৩. Variables, Math & INPUT System
      let varMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (varMatch && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('for') && !line.startsWith('while') && !line.startsWith('func') && !line.startsWith('else')) {
         let varName = varMatch[1];
         let valExpr = varMatch[2].trim();
         
         // Input System
         if (valExpr.startsWith('input(')) {
             let promptText = valExpr.match(/input\((.*?)\)/)[1].replace(/^"|"$/g, '');
             let userInput = typeof window !== 'undefined' ? window.prompt(promptText) : '';
             variables[varName] = isNaN(userInput) || userInput === '' ? userInput : Number(userInput);
         } else {
             variables[varName] = evaluateExpression(valExpr);
         }
         continue;
      }

      // ৪. Show Command (প্রিন্ট করা)
      let showMatch = line.match(/^show\s+(.+)$/);
      if (showMatch) {
         let content = showMatch[1];
         if (content.startsWith('"') && content.endsWith('"')) {
           output.push(content.slice(1, -1));
         } else if (variables[content] !== undefined) {
           output.push(variables[content]);
         } else {
           try { output.push(evaluateExpression(content)); } 
           catch(e) { output.push(`[Error] Invalid syntax: ${content}`); }
         }
         continue;
      }

      // ৫. For Loop
      let forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*=\s*(\d+)\s+to\s+(\d+)\s*\{$/);
      if (forMatch) {
        let loopVar = forMatch[1];
        let start = parseInt(forMatch[2]);
        let end = parseInt(forMatch[3]);
        let { block, nextIndex } = extractBlock(i, blockLines);
        
        for (let j = start; j <= end; j++) {
          variables[loopVar] = j;
          executeBlock(block);
        }
        i = nextIndex;
        continue;
      }

      // ৬. While Loop
      let whileMatch = line.match(/^while\s+(.+)\s*\{$/);
      if (whileMatch) {
        let condition = whileMatch[1];
        let { block, nextIndex } = extractBlock(i, blockLines);
        let safeCounter = 0; 
        while (evaluateExpression(condition) && safeCounter < 1000) {
          executeBlock(block);
          safeCounter++;
        }
        i = nextIndex;
        continue;
      }

      // ৭. If-Else Condition
      let ifMatch = line.match(/^if\s+(.+)\s*\{$/);
      if (ifMatch) {
         let conditionResult = evaluateExpression(ifMatch[1]);
         let { block: ifBlock, nextIndex } = extractBlock(i, blockLines);
         i = nextIndex;
         
         let hasElse = false;
         let elseBlock = [];
         
         if (i + 1 < blockLines.length && (blockLines[i + 1] === 'else {' || blockLines[i + 1] === '} else {')) {
             hasElse = true;
             let elseExt = extractBlock(i + 1, blockLines);
             elseBlock = elseExt.block;
             i = elseExt.nextIndex;
         }

         if (conditionResult) {
           executeBlock(ifBlock);
         } else if (hasElse) {
           executeBlock(elseBlock);
         }
         continue;
      }
    }
  };

  try {
    executeBlock(lines);
  } catch (err) {
    output.push(`[Runtime Error] Compilation failed.`);
  }
  
  return output.join('\n');
}
