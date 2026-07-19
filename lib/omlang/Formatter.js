export function formatCode(code) {
    // '}' বা '{' এর সাথে অন্য কোড লেগে থাকলে আলাদা লাইনে নামিয়ে দেবে
    let formatted = code.replace(/([^\s])\s*\}/g, '$1\n}');
    formatted = formatted.replace(/\{\s*([^\s])/g, '{\n$1'); 
    return formatted.split('\n');
}

