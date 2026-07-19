export function evaluateExpression(expr, memory) {
    let parsed = expr.replace(/more than/g, '>').replace(/less than/g, '<').replace(/equal to/g, '===');
    
    Object.keys(memory).forEach((key) => {
        if (!Array.isArray(memory[key])) { // ম্যাট্রিক্স বাদে অন্য ভেরিয়েবল রিপ্লেস করবে
            const regex = new RegExp(`\\b${key}\\b`, 'g');
            parsed = parsed.replace(regex, memory[key]);
        }
    });
    
    try { 
        // eslint-disable-next-line no-new-func
        return new Function(`return ${parsed}`)(); 
    } catch { 
        return null; 
    }
}
