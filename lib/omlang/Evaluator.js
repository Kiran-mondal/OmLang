// lib/omlang/Evaluator.js

import { std } from './StandardLibrary';

// আমরা আগের evaluateExpression কে আপডেট করে fastEval নামেই রাখছি, 
// কারণ Engine.js এই নামেই ডেটা পাঠায়।
export const fastEval = (expr, variables) => {
  try {
    // এখানে >, <, ==, != ইত্যাদি ম্যাথমেটিক্যাল সাইন অটোমেটিক কাজ করবে।
    // তাই 'more than' বা 'less than' রিপ্লেস করার দরকার নেই।

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

    let __vars = variables; // eval() যেন ভেরিয়েবলগুলোকে চিনতে পারে
    
    // eslint-disable-next-line no-eval
    return eval(processed); 
    
  } catch(e) {
    // যদি শুধুমাত্র কোনো স্ট্রিং থাকে
    return expr.replace(/^"|"$/g, '');
  }
};
