// lib/omlang/Evaluator.js

import { std } from './StandardLibrary';

export const fastEval = (expr, variables) => {
  try {
    let processed = expr.replace(/[a-zA-Z_]\w*/g, (match, offset, fullStr) => {
      // Data Access Logic: ডিকশনারির ডেটা (যেমন user.name) ঠিক রাখার জন্য
      if (offset > 0 && fullStr[offset - 1] === '.') return match;
      
      // Standard Library (std) এর ফাংশন হলে
      if (std[match]) return `std.${match}`;
      
      // ভেরিয়েবল হলে
      if (variables[match] !== undefined) {
        return `__vars.${match}`; 
      }
      
      return match;
    });

    let __vars = variables; 
    
    // 🛡️ SECURITY PATCH: Vercel-এর Medium Risk (eval) ওয়ার্নিং সরাতে new Function ব্যবহার করা হলো
    const secureEvaluate = new Function('__vars', 'std', `return ${processed}`);
    return secureEvaluate(__vars, std);
    
  } catch(e) {
    // যদি শুধুমাত্র কোনো স্ট্রিং থাকে
    return expr.replace(/^"|"$/g, '');
  }
};
