export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  let output = [];
  let variables = {};
  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

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

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Variables & Math
    let varMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (varMatch && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('for')) {
       variables[varMatch[1]] = evaluateExpression(varMatch[2]);
       continue;
    }

    // Show Command
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

    // NEW: For Loop (for i = 1 to 5 { ... })
    let forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*=\s*(\d+)\s+to\s+(\d+)\s*\{$/);
    if (forMatch) {
      let loopVar = forMatch[1];
      let start = parseInt(forMatch[2]);
      let end = parseInt(forMatch[3]);
      
      // Block এর ভেতরের কোড খুঁজে বের করা
      let loopBody = [];
      i++;
      while(i < lines.length && lines[i] !== '}') {
        loopBody.push(lines[i]);
        i++;
      }

      // লুপ চালানো
      for (let j = start; j <= end; j++) {
        variables[loopVar] = j; // লুপ ভেরিয়েবল আপডেট
        for (let lineOfLoop of loopBody) {
          let showLoopMatch = lineOfLoop.match(/^show\s+(.+)$/);
          if (showLoopMatch) {
            let content = showLoopMatch[1];
            if (content.startsWith('"') && content.endsWith('"')) {
              output.push(content.slice(1, -1));
            } else if (variables[content] !== undefined) {
              output.push(variables[content]);
            }
          }
        }
      }
      continue;
    }

    // Basic IF Condition
    let ifMatch = line.match(/^if\s+(.+)\s*\{$/);
    if (ifMatch) {
       let conditionResult = evaluateExpression(ifMatch[1]);
       if (!conditionResult) {
         while(i < lines.length && lines[i] !== '}') { i++; }
       }
       continue;
    }
  }
  
  return output.join('\n');
}
