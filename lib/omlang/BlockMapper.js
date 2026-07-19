export function mapBlocks(lines) {
    const blockEnds = {};
    const stack = [];
    
    for (let j = 0; j < lines.length; j++) {
        if (lines[j].includes('{')) stack.push(j);
        if (lines[j].includes('}')) {
            if (stack.length === 0) {
                throw new Error(`Syntax Error: Extra '}' at line ${j + 1}`);
            }
            const start = stack.pop();
            blockEnds[start] = j;
            blockEnds[j] = start; 
        }
    }
    
    if (stack.length > 0) {
        throw new Error(`Syntax Error: Missing '}' for block starting at line ${stack[0] + 1}`);
    }
    
    return blockEnds;
}
