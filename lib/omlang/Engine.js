// lib/omlang/Engine.js

import { std } from './StandardLibrary';
import { extractBlock } from './Utils';
import { fastEval } from './Evaluator'; 

export function runOmLang(code) {
  if (!code || code.trim() === '') return '';
  
  let output = [];
  let globals = {}; 
  let functions = {};

  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));

  const executeBlock = (blockLines, locals = null) => {
    let skipElse = false; 

    const getVars = () => locals ? { ...globals, ...locals } : globals;

    for (let i = 0; i < blockLines.length; i++) {
      let line = blockLines[i];
      if (line === '}' || line === '{' || line === '' || line.startsWith('//')) continue;

      if (line.startsWith('return ')) {
        return fastEval(line.substring(7).trim(), getVars()); 
      }

      if (line.startsWith('throw')) {
        let content = line.substring(5).trim();
        throw new Error(fastEval(content, getVars())); 
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
          let ret = executeBlock(tryBlock, locals);
          if (ret !== undefined) return ret;
        } catch (err) {
          if (hasExcept) executeBlock(exceptBlock, locals);
          else output.push(`[Runtime Error] Program crashed!`);
        }
        continue;
      }

      if (line.startsWith('if ')) {
        let cond = line.substring(3, line.length - 1).trim();
        let { block, nextIndex } = extractBlock(i, blockLines);
        if (fastEval(cond, getVars())) {
          let ret = executeBlock(block, locals);
          if (ret !== undefined) return ret;
          skipElse = true; 
        } else skipElse = false;
        i = nextIndex;
        continue;
      }

      if (line.startsWith('maybe ')) {
        let cond = line.substring(6, line.length - 1).trim();
        let { block, nextIndex } = extractBlock(i, blockLines);
        if (!skipElse && fastEval(cond, getVars())) {
          let ret = executeBlock(block, locals);
          if (ret !== undefined) return ret;
          skipElse = true;
        }
        i = nextIndex;
        continue;
      }

      if (line.startsWith('otherwise')) {
        let { block, nextIndex } = extractBlock(i, blockLines);
        if (!skipElse) {
          let ret = executeBlock(block, locals);
          if (ret !== undefined) return ret;
        }
        i = nextIndex;
        continue;
      }

      if (line.startsWith('func')) {
        let funcMatch = line.match(/^func\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*\{$/);
        if (funcMatch) {
            let funcName = funcMatch[1];
            let params = funcMatch[2].split(',').map(p => p.trim()).filter(p => p);
            let { block, nextIndex } = extractBlock(i, blockLines);
            functions[funcName] = { params, block };
            i = nextIndex;
            continue;
        }
      }

      let standaloneFuncMatch = line.match(/^([a-zA-Z_]\w*)\s*\((.*?)\)$/);
      if (standaloneFuncMatch && functions[standaloneFuncMatch[1]] && !line.startsWith('show') && !line.includes('=')) {
          let fName = standaloneFuncMatch[1];
          let fArgs = standaloneFuncMatch[2] ? standaloneFuncMatch[2].split(',').map(a => fastEval(a.trim(), getVars())) : [];
          let funcDef = functions[fName];
          
          let funcLocals = {}; 
          funcDef.params.forEach((p, idx) => funcLocals[p] = fArgs[idx]); 
          executeBlock(funcDef.block, funcLocals); 
          continue;
      }

      if (line.startsWith('for')) {
        let parts = line.split(' '); 
        let varName = parts[1];
        let start = parseInt(parts[3]);
        let end = parseInt(parts[5]);
        let { block, nextIndex } = extractBlock(i, blockLines);
        for (let j = start; j <= end; j++) {
          if (locals) locals[varName] = j; 
          else globals[varName] = j;
          
          let ret = executeBlock(block, locals);
          if (ret !== undefined) return ret;
        }
        i = nextIndex;
        continue;
      }

      if (line.includes('=') && !line.startsWith('show') && !line.startsWith('if') && !line.startsWith('maybe') && !line.startsWith('while')) {
        let parts = line.split('=');
        let varName = parts[0].trim();
        let valExpr = parts.slice(1).join('=').trim(); 
        
        if (valExpr.startsWith('data {') && valExpr.endsWith('}')) {
           valExpr = `(${valExpr.substring(4).trim()})`; 
        }
        
        let assignFuncMatch = valExpr.match(/^([a-zA-Z_]\w*)\s*\((.*?)\)$/);
        if (assignFuncMatch && functions[assignFuncMatch[1]]) {
            let fName = assignFuncMatch[1];
            let fArgs = assignFuncMatch[2] ? assignFuncMatch[2].split(',').map(a => fastEval(a.trim(), getVars())) : [];
            let funcDef = functions[fName];
            
            let funcLocals = {};
            funcDef.params.forEach((p, idx) => funcLocals[p] = fArgs[idx]);
            
            let retVal = executeBlock(funcDef.block, funcLocals); 
            
            if (locals) locals[varName] = retVal !== undefined ? retVal : null;
            else globals[varName] = retVal !== undefined ? retVal : null;
            continue;
        }

        let val = fastEval(valExpr, getVars());

        // 🌟 NEW: Array Indexing Assignment (যেমন: marks[1] = 99)
        let arrayMatch = varName.match(/^([a-zA-Z_]\w*)\[(.*?)\]$/);
        if (arrayMatch) {
            let arrName = arrayMatch[1];
            let index = fastEval(arrayMatch[2], getVars());
            if (locals && locals[arrName] !== undefined) locals[arrName][index] = val;
            else globals[arrName][index] = val;
            continue;
        }

        // 🌟 NEW: Dictionary Property Assignment (যেমন: user.level = "Pro")
        let dotMatch = varName.match(/^([a-zA-Z_]\w*)\.(.+)$/);
        if (dotMatch) {
            let objName = dotMatch[1];
            let prop = dotMatch[2];
            if (locals && locals[objName] !== undefined) locals[objName][prop] = val;
            else globals[objName][prop] = val;
            continue;
        }

        // Normal variable assignment
        if (locals) locals[varName] = val;
        else globals[varName] = val;
        continue;
      }

      if (line.startsWith('show')) {
        let content = line.substring(5).trim();
        let result = fastEval(content, getVars());
        
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
        while (fastEval(cond, getVars()) && safeCounter < 10000000) {
          let ret = executeBlock(block, locals);
          if (ret !== undefined) return ret;
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
