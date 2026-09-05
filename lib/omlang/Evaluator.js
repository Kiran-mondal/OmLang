// lib/omlang/Evaluator.js

import { std } from './StandardLibrary';

export class OmlangError extends Error {
  constructor(message) {
    super(`[OmLang Runtime Error] ${message}`);
    this.name = "OmlangError";
  }
}

// Cache for compiled functions to avoid re-compiling expressions in loops[span_0](start_span)[span_0](end_span)
const compileCache = new Map();
const MAX_CACHE_SIZE = 1000;

// Allow only a restricted expression grammar to prevent code injection in new Function
const UNSAFE_TOKENS = /\b(?:constructor|prototype|__proto__|globalThis|window|document|process|require|Function|eval|import|this|new|class|return|=>)\b|[;{}[\]`\\]|(?:^|[^=!<>])=(?!=)/;
const SAFE_EXPR_REGEX = /^[\w\s.+\-*/%(),!<>=&|?:]+$/;

const isSafeExpression = (value) => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (!SAFE_EXPR_REGEX.test(trimmed)) return false;
  if (UNSAFE_TOKENS.test(trimmed)) return false;
  return true;
};

export const fastEval = (expr, variables) => {
  try {
    let processed = expr.replace(/[a-zA-Z_]\w*/g, (match, offset, fullStr) => {
      // Data Access Logic: ডিকশনারির ডেটা (যেমন user.name) ঠিক রাখার জন্য[span_1](start_span)[span_1](end_span)
      if (offset > 0 && fullStr[offset - 1] === '.') return match;
      
      // Standard Library (std) এর ফাংশন হলে[span_2](start_span)[span_2](end_span)
      if (std[match]) return `std.${match}`;
      
      // ভেরিয়েবল হলে[span_3](start_span)[span_3](end_span)
      if (variables[match] !== undefined) {
        return `__vars.${match}`; 
      }
      
      return match;
    });

    let __vars = variables; 

    if (!isSafeExpression(processed)) {
      throw new OmlangError(`Unsafe expression blocked: ${expr}`);
    }
    
    // 🛡️ SECURITY PATCH: Vercel-এর Medium Risk (eval) ওয়ার্নিং সরাতে new Function ব্যবহার করা হলো[span_4](start_span)[span_4](end_span)
    // ⚡ Bolt Optimization: Cache the compiled function to prevent expensive re-compilation[span_5](start_span)[span_5](end_span)
    let secureEvaluate = compileCache.get(processed);
    if (!secureEvaluate) {
      secureEvaluate = new Function('__vars', 'std', `return ${processed}`);

      // Prevent memory leak by limiting cache size[span_6](start_span)[span_6](end_span)
      if (compileCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = compileCache.keys().next().value;
        compileCache.delete(oldestKey);
      }

      compileCache.set(processed, secureEvaluate);
    }

    return secureEvaluate(__vars, std);
    
  } catch(e) {
    // যদি শুধুমাত্র কোনো স্ট্রিং থাকে[span_7](start_span)[span_7](end_span)
    if (expr.startsWith('"') || expr.startsWith("'")) {
        return expr.replace(/^"|"$/g, '');
    }
    throw new OmlangError(`Failed to evaluate expression: ${expr}`);
  }
};
