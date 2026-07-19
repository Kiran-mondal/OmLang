/**
 * OmLang Core Interpreter Engine
 * Handles variables, math, matrices, conditions (if/else), and standard symbols (<, >, ==)
 */

export function runOmLang(code) {
    const lines = code.split('\n');
    let output = '';
    let memory = {}; // Stores all variables and matrices
    
    // Execution State flags (for handling if/else blocks)
    let isExecuting = true; 
    let skipElseBlock = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // 1. Skip empty lines and comments
        if (!line || line.startsWith('//')) continue;

        // 2. Handle Block Ends '}'
        if (line === '}') {
            isExecuting = true; // Reset execution state when block ends
            continue;
        }

        // 3. Handle 'else {' 
        if (line === 'else {') {
            // If the 'if' condition was true, we skip the 'else' block
            isExecuting = !skipElseBlock; 
            continue;
        }

        // If we are inside a false condition block, skip the line
        if (!isExecuting) continue;

        try {
            // 4. Handle 'if' Conditions (e.g., if a > b { )
            const ifMatch = line.match(/^if\s+(.+)\s*\{$/);
            if (ifMatch) {
                let condition = ifMatch[1];
                
                // Replace variables in condition with their actual values from memory
                Object.keys(memory).forEach((key) => {
                    if (!Array.isArray(memory[key])) { // Exclude matrices from simple logic
                        const regex = new RegExp(`\\b${key}\\b`, 'g');
                        condition = condition.replace(regex, memory[key]);
                    }
                });

                // Evaluate the condition using standard math/logic symbols
                // eslint-disable-next-line no-new-func
                const result = new Function(`return ${condition}`)();
                
                if (result) {
                    isExecuting = true;
                    skipElseBlock = true; // Don't run the else block later
                } else {
                    isExecuting = false; // Skip the lines inside this block
                    skipElseBlock = false; // Allow the else block to run
                }
                continue;
            }

            // 5. Handle Matrix Assignment (e.g., matrix A = [1, 2 | 3, 4])
            const matrixMatch = line.match(/^matrix\s+([a-zA-Z_]\w*)\s*=\s*\[(.*)\]$/i);
            if (matrixMatch) {
                const varName = matrixMatch[1];
                const matrixContent = matrixMatch[2];
                const rows = matrixContent.split('|').map(row => 
                    row.split(',').map(num => Number(num.trim()))
                );
                memory[varName] = rows;
                continue;
            }

            // 6. Handle Variable Assignment and Math (e.g., a = 5 + 2)
            const assignmentMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (assignmentMatch) {
                const varName = assignmentMatch[1];
                let expression = assignmentMatch[2];

                // Replace variables in math expression with values
                Object.keys(memory).forEach((key) => {
                    if (!Array.isArray(memory[key])) {
                        const regex = new RegExp(`\\b${key}\\b`, 'g');
                        expression = expression.replace(regex, memory[key]);
                    }
                });

                // Calculate result
                // eslint-disable-next-line no-new-func
                const result = new Function(`return ${expression}`)();
                memory[varName] = result;
                continue;
            }

            // 7. Handle Print / Show Command
            const showMatch = line.match(/^show\s+(.+)$/i);
            if (showMatch) {
                const content = showMatch[1].trim();
                const stringMatch = content.match(/^"([^"]*)"$/);
                
                if (stringMatch) {
                    output += stringMatch[1] + '\n';
                } else if (memory.hasOwnProperty(content)) {
                    const val = memory[content];
                    if (Array.isArray(val)) {
                        // Format Matrix for output
                        const formattedMatrix = val.map(row => '[ ' + row.join(', ') + ' ]').join('\n');
                        output += formattedMatrix + '\n';
                    } else {
                        output += val + '\n';
                    }
                } else {
                    output += `Error: Undefined variable -> '${content}'\n`;
                }
                continue;
            }

            // 8. Unrecognized Command Error
            output += `Syntax Error: Unknown command -> '${line}'\n`;

        } catch (e) {
            output += `Execution Error in -> '${line}'\n`;
        }
    }

    return output || 'No output.';
}
