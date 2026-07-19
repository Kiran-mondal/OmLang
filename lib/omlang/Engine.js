export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  
  let output = [];
  let variables = {};
  let functions = {}; // ফাংশন স্টোর করার মেমরি

  // কোডকে লাইন হিসেবে ভাগ করা এবং কমেন্ট বাদ দেওয়া
  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  // ম্যাথমেটিকাল এবং লজিক্যাল ক্যালকুলেশন করার ফাংশন
  const evaluateExpression = (expr) => {
    let evalExpr = expr.replace(/[a-zA-Z_]\w*/g, match => {
      return variables[match] !== undefined ? variables[match] : match;
    }).replace(/\^/g, '**');
    try {
      return new Function('return ' + evalExpr)();
    } catch(e) {
      return expr.replace(/^"|"$/g, '');
    }
  };

  // ব্র্যাকেটের { } ভেতরের ব্লক কোড বের করার হেল্পার ফাংশন
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

  // Recursive Execution (লুপ, ফাংশন ও কন্ডিশন রান করার জন্য)
  const executeBlock = (blockLines) => {
    for (let i = 0; i < blockLines.length; i++) {
      let line = blockLines[i];
      if (line === '}' || line === '{' || line === '') continue;

      // ১. Function Definition (ফাংশন তৈরি করা): func myRoutine() {
      let funcMatch = line.match(/^func\s+([a-zA-Z_]\w*)\s*\(\)\s*\{$/);
      if (funcMatch) {
        let funcName = funcMatch[1];
        let { block, nextIndex } = extractBlock(i, blockLines);
        functions[funcName] = block; // ফাংশন সেভ করে রাখলো
        i = nextIndex;
        continue;
      }

      // ২. Function Call (ফাংশন রান করা): myRoutine()
      let callMatch = line.match(/^([a-zA-Z_]\w*)\s*\(\)$/);
      if (callMatch && functions[callMatch[1]]) {
        executeBlock(functions[callMatch[1]]); // ফাংশনের ভেতরের কোড রান করবে
        continue;
      }

      // ৩. Variables & Math (ভেরিয়েবল সেট করা)
      let varMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (varMatch && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('for') && !line.startsWith('while') && !line.startsWith('func') && !line.startsWith('else')) {
         variables[varMatch[1]] = evaluateExpression(varMatch[2]);
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

      // ৫. For Loop (for x = 1 to 5 { ... })
      let forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*=\s*(\d+)\s+to\s+(\d+)\s*\{$/);
      if (forMatch) {
        let loopVar = forMatch[1];
        let start = parseInt(forMatch[2]);
        let end = parseInt(forMatch[3]);
        let { block, nextIndex } = extractBlock(i, blockLines);
        
        for (let j = start; j <= end; j++) {
          variables[loopVar] = j;
          executeBlock(block); // ব্লকের কোড বারবার রান করবে
        }
        i = nextIndex;
        continue;
      }

      // ৬. While Loop (while x < 5 { ... })
      let whileMatch = line.match(/^while\s+(.+)\s*\{$/);
      if (whileMatch) {
        let condition = whileMatch[1];
        let { block, nextIndex } = extractBlock(i, blockLines);
        
        let safeCounter = 0; // অসীম লুপ (Infinite loop) ঠেকানোর জন্য সেফটি
        while (evaluateExpression(condition) && safeCounter < 1000) {
          executeBlock(block);
          safeCounter++;
        }
        if(safeCounter >= 1000) output.push("[Warning] Infinite loop stopped.");
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
         
         // চেক করবে পরের লাইনে else { আছে কিনা
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

  // মূল কোড এক্সিকিউশন শুরু
  try {
    executeBlock(lines);
  } catch (err) {
    output.push(`[Runtime Error] Compilation failed.`);
  }
  
  return output.join('\n');
}
