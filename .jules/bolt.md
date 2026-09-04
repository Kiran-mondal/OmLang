## 2024-08-24 - Evaluator Function Re-compilation Bottleneck
**Learning:** `new Function()` parsing inside `fastEval` blocks was causing massive slowdowns when evaluating expressions inside loops (`for`, `while`) due to the JS engine repeatedly parsing the same string. Unbounded caching (`new Map()`) fixes the CPU issue but causes a memory leak, requiring an eviction strategy.
**Action:** Always wrap dynamically compiled JS functions in a size-bounded cache (e.g., Map with max size check) to optimize repetitive execution paths safely without OOM errors.

## 2024-05-18 - Replacing loops of string.includes() with Regex
**Learning:** Using a pre-compiled regular expression can be over 50% faster than looping through an array of keywords and repeatedly calling `string.includes()` for checking substring presence.
**Action:** When identifying multiple potential substrings in a larger string, prefer a single `RegExp.exec()` call with a combined regex pattern `/(word1|word2|word3)/` over `for` loops iterating `includes()`. Ensure the `RegExp` is pre-compiled outside the function logic.
