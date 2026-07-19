/**
 * OmLang Core Interpreter Engine
 * Now supports: Variables, Math, Matrices, If/Else, While Loops, and For Loops!
 */

export function runOmLang(code) {
    const lines = code.split('\n');
    let output = '';
    let memory = {};
    let forLoops = {}; // Stores state for 'for' loops
    
    // 1. Pre-process blocks to match '{' and '}' for Jumping
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
            blockEnds[j] = start; // Bi-directional map
        }
    }
    if (stack.length > 0) {
        return output + `\nSyntax Error: Missing '}' for block starting at line ${stack[0] + 1}`;
    }

    // 2. Helper function to evaluate math and conditions
    const evaluate = (expr) => {
        let parsed = expr.replace(/more than/g, '>').replace(/less than/g, '<').replace(/equal to/g, '===');
        Object.keys(memory).forEach((key) => {
            if (!Array.isArray(memory[key])) { // Ignore matrices in standard math
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                parsed = parsed.replace(regex, memory[key]);
            }
        });
        try { return new Function(`return ${parsed}`)(); } 
        catch { return null; }
    };

    // 3. Main Execution Loop (Instruction Pointer 'i')
    let i = 0;
    let executionLimit = 0; // Prevents infinite loops from crashing the browser
    
    while (i < lines.length) {
        executionLimit++;
        if (executionLimit > 100000) {
            output += '\nError: Infinite loop detected! Force stopped.\n';
            break; // Emergency brake
        }

        let line = lines[i].trim();

        // Skip empty lines and comments
        if (!line || line.startsWith('//')) {
            i++; continue;
        }

        // --- HANDLE END OF BLOCKS '}' ---
        if (line === '}') {
            const startLine = blockEnds[i];
            const startLineText = lines[startLine].trim();
            
            if (startLineText.startsWith('while ')) {
                i = startLine; // Jump back up to re-evaluate 'while' condition
                continue;
            }
            
            if (startLineText.startsWith('for ')) {
                let loopData = forLoops[startLine];
                if (loopData) memory[loopData.varName]++; // Increment the 'for' loop variable
                i = startLine; // Jump back up to 'for' loop check
                continue;
            }
            
            // If it was an if/else block, just move forward
            i++; continue;
        }

        try {
            // --- FOR LOOPS (e.g., for x = 1 to 5 { ) ---
            const forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*=\s*(.+)\s+to\s+(.+)\s*\{$/);
            if (forMatch) {
                let varName = forMatch[1];
                
                if (!forLoops[i]) { // Initialize loop if running for the first time
                    let startVal = evaluate(forMatch[2]);
                    let endVal = evaluate(forMatch[3]);
                    memory[varName] = startVal;
                    forLoops[i] = { varName, endVal };
                }

                let loopData = forLoops[i];
                if (memory[loopData.varName] <= loopData.endVal) {
                    i++; // Condition is true, step into block
                } else {
                    delete forLoops[i]; // Loop finished, clean up memory
                    i = blockEnds[i] + 1; // Jump past block
                }
                continue;
            }

            // --- WHILE LOOPS (e.g., while a < 10 { ) ---
            const whileMatch = line.match(/^while\s+(.+)\s*\{$/);
            if (whileMatch) {
                let condition = whileMatch[1];
                let result = evaluate(condition);
                if (result) {
                    i++; // Enter block
                } else {
                    i = blockEnds[i] + 1; // Jump past block
                }
                continue;
            }

            // --- IF CONDITIONS ---
            const ifMatch = line.match(/^if\s+(.+)\s*\{$/);
            if (ifMatch) {
                let condition = ifMatch[1];
                let result = evaluate(condition);
                if (result) {
                    i++; // Enter block
                } else {
                    i = blockEnds[i] + 1; // Skip block
                }
                continue;
            }

            // --- ELSE BLOCK ---
            if (line === 'else {') {
                // If the interpreter reaches here naturally, it means the IF block above it executed.
                // Therefore, we must skip the else block.
                i = blockEnds[i] + 1; 
                continue;
            }

            // --- MATRIX ASSIGNMENT ---
            const matrixMatch = line.match(/^matrix\s+([a-zA-Z_]\w*)\s*=\s*\[(.*)\]$/i);
            if (matrixMatch) {
                const varName = matrixMatch[1];
                const rows = matrixMatch[2].split('|').map(row => row.split(',').map(num => Number(num.trim())));
                memory[varName] = rows;
                i++; continue;
            }

            // --- VARIABLE ASSIGNMENT & MATH (e.g., r = a + b) ---
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

            // --- SHOW COMMAND ---
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

            // --- UNKNOWN COMMAND ---
            output += `Syntax Error: Unknown command -> '${line}'\n`;
            i++; // Keep moving to prevent the engine from freezing

        } catch (e) {
            output += `Execution Error -> '${line}'\n`;
            i++;
        }
    }

    return output || 'No output.';
}
