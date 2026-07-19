/**
 * OmLang Core Interpreter Engine
 * Now handles inline brackets properly and prevents syntax glueing.
 */

export function runOmLang(code) {
    // PRE-PROCESSOR: '}' যদি অন্য কোনো কোডের সাথে লেগে থাকে, তবে তাকে স্বয়ংক্রিয়ভাবে নতুন লাইনে নামিয়ে দেবে
    code = code.replace(/([^\s])\s*\}/g, '$1\n}');
    code = code.replace(/\{\s*([^\s])/g, '{\n$1'); // '{' এর পরেও কিছু থাকলে নিচে নামাবে

    const lines = code.split('\n');
    let output = '';
    let memory = {};
    let forLoops = {}; 
    
    const blockEnds = {};
    const stack = [];
    for (let j = 0; j < lines.length; j++) {
        if (lines[j].includes('{')) stack.push(j);
        if (lines[j].includes('}')) {
            if (stack.length === 0) {
                return output + `\nSyntax Error: Extra '}' at line ${j + 1}`;
            }
            const start = stack.pop();
            blockEnds[start] = j;
            blockEnds[j] = start; 
        }
    }
    if (stack.length > 0) {
        return output + `\nSyntax Error: Missing '}' for block starting at line ${stack[0] + 1}`;
    }

    const evaluate = (expr) => {
        let parsed = expr.replace(/more than/g, '>').replace(/less than/g, '<').replace(/equal to/g, '===');
        Object.keys(memory).forEach((key) => {
            if (!Array.isArray(memory[key])) { 
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                parsed = parsed.replace(regex, memory[key]);
            }
        });
        try { return new Function(`return ${parsed}`)(); } 
        catch { return null; }
    };

    let i = 0;
    let executionLimit = 0; 
    
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
            
            if (startLineText.startsWith('while ')) {
                i = startLine; 
                continue;
            }
            
            if (startLineText.startsWith('for ')) {
                let loopData = forLoops[startLine];
                if (loopData) memory[loopData.varName]++; 
                i = startLine; 
                continue;
            }
            
            i++; continue;
        }

        try {
            const forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*=\s*(.+)\s+to\s+(.+)\s*\{$/);
            if (forMatch) {
                let varName = forMatch[1];
                if (!forLoops[i]) { 
                    let startVal = evaluate(forMatch[2]);
                    let endVal = evaluate(forMatch[3]);
                    memory[varName] = startVal;
                    forLoops[i] = { varName, endVal };
                }
                let loopData = forLoops[i];
                if (memory[loopData.varName] <= loopData.endVal) {
                    i++; 
                } else {
                    delete forLoops[i]; 
                    i = blockEnds[i] + 1; 
                }
                continue;
            }

            const whileMatch = line.match(/^while\s+(.+)\s*\{$/);
            if (whileMatch) {
                let condition = whileMatch[1];
                let result = evaluate(condition);
                if (result) {
                    i++; 
                } else {
                    i = blockEnds[i] + 1; 
                }
                continue;
            }

            const ifMatch = line.match(/^if\s+(.+)\s*\{$/);
            if (ifMatch) {
                let condition = ifMatch[1];
                let result = evaluate(condition);
                if (result) {
                    i++; 
                } else {
                    i = blockEnds[i] + 1; 
                }
                continue;
            }

            if (line === 'else {') {
                i = blockEnds[i] + 1; 
                continue;
            }

            const matrixMatch = line.match(/^matrix\s+([a-zA-Z_]\w*)\s*=\s*\[(.*)\]$/i);
            if (matrixMatch) {
                const varName = matrixMatch[1];
                const rows = matrixMatch[2].split('|').map(row => row.split(',').map(num => Number(num.trim())));
                memory[varName] = rows;
                i++; continue;
            }

            const assignmentMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (assignmentMatch) {
                const varName = assignmentMatch[1];
                let expression = assignmentMatch[2];
                const result = evaluate(expression);
                if (result !== null) {
                    memory[varName] = result;
                } else {
                    output += `Math Error -> '${line}'\n`;
                }
                i++; continue;
            }

            const showMatch = line.match(/^show\s+(.+)$/i);
            if (showMatch) {
                const content = showMatch[1].trim();
                const stringMatch = content.match(/^"([^"]*)"$/);
                
                if (stringMatch) {
                    output += stringMatch[1] + '\n';
                } else if (memory.hasOwnProperty(content)) {
                    const val = memory[content];
                    if (Array.isArray(val)) {
                        const formattedMatrix = val.map(row => '[ ' + row.join(', ') + ' ]').join('\n');
                        output += formattedMatrix + '\n';
                    } else {
                        output += val + '\n';
                    }
                } else {
                    output += `Error: Undefined variable -> '${content}'\n`;
                }
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
