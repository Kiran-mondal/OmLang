import { formatCode } from './Formatter';
import { mapBlocks } from './BlockMapper';
import { evaluateExpression } from './Evaluator';

export function runOmLang(rawCode) {
    let output = '';
    let memory = {};
    let forLoops = {}; 
    let skipElse = false; 

    // ১. কোড ফরম্যাট করা
    const lines = formatCode(rawCode);
    let blockEnds;
    
    // ২. ব্র্যাকেট ম্যাপ করা
    try {
        blockEnds = mapBlocks(lines);
    } catch (error) {
        return output + '\n' + error.message;
    }

    let i = 0;
    let executionLimit = 0; 
    
    // ৩. মেইন এক্সিকিউশন লুপ
    while (i < lines.length) {
        executionLimit++;
        if (executionLimit > 100000) {
            output += '\nError: Infinite loop detected! Force stopped.\n';
            break; 
        }

        let line = lines[i].trim();

        if (!line || line.startsWith('//')) {
            i++; continue;
        }

        if (line === '}') {
            const startLine = blockEnds[i];
            const startLineText = lines[startLine].trim();
            
            if (startLineText.startsWith('while ')) { i = startLine; continue; }
            if (startLineText.startsWith('for ')) {
                let loopData = forLoops[startLine];
                if (loopData) memory[loopData.varName]++; 
                i = startLine; continue;
            }
            i++; continue;
        }

        try {
            // For Loop
            const forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*=\s*(.+)\s+to\s+(.+)\s*\{$/);
            if (forMatch) {
                let varName = forMatch[1];
                if (!forLoops[i]) { 
                    memory[varName] = evaluateExpression(forMatch[2], memory);
                    forLoops[i] = { varName, endVal: evaluateExpression(forMatch[3], memory) };
                }
                if (memory[forLoops[i].varName] <= forLoops[i].endVal) i++; 
                else { delete forLoops[i]; i = blockEnds[i] + 1; }
                continue;
            }

            // While Loop
            const whileMatch = line.match(/^while\s+(.+)\s*\{$/);
            if (whileMatch) {
                if (evaluateExpression(whileMatch[1], memory)) i++; 
                else i = blockEnds[i] + 1; 
                continue;
            }

            // If Condition
            const ifMatch = line.match(/^if\s+(.+)\s*\{$/);
            if (ifMatch) {
                if (evaluateExpression(ifMatch[1], memory)) { i++; skipElse = true; }
                else { i = blockEnds[i] + 1; skipElse = false; }
                continue;
            }

            // Else Block
            if (line === 'else {') {
                if (skipElse) { i = blockEnds[i] + 1; skipElse = false; }
                else i++; 
                continue;
            }

            // Matrix
            const matrixMatch = line.match(/^matrix\s+([a-zA-Z_]\w*)\s*=\s*\[(.*)\]$/i);
            if (matrixMatch) {
                memory[matrixMatch[1]] = matrixMatch[2].split('|').map(row => row.split(',').map(num => Number(num.trim())));
                i++; continue;
            }

            // Variables & Math
            const assignmentMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (assignmentMatch) {
                const result = evaluateExpression(assignmentMatch[2], memory);
                if (result !== null) memory[assignmentMatch[1]] = result;
                else output += `Math Error -> '${line}'\n`;
                i++; continue;
            }

            // Show Print
            const showMatch = line.match(/^show\s+(.+)$/i);
            if (showMatch) {
                const content = showMatch[1].trim();
                const stringMatch = content.match(/^"([^"]*)"$/);
                
                if (stringMatch) output += stringMatch[1] + '\n';
                else if (memory.hasOwnProperty(content)) {
                    const val = memory[content];
                    output += Array.isArray(val) ? val.map(row => '[ ' + row.join(', ') + ' ]').join('\n') + '\n' : val + '\n';
                } else output += `Error: Undefined variable -> '${content}'\n`;
                i++; continue;
            }

            output += `Syntax Error: Unknown command -> '${line}'\n`;
            i++; 

        } catch (e) {
            output += `Execution Error -> '${line}'\n`;
            i++;
        }
    }

    return output || 'No output.';
}
