## 2024-08-24 - Evaluator Function Re-compilation Bottleneck
**Learning:** `new Function()` parsing inside `fastEval` blocks was causing massive slowdowns when evaluating expressions inside loops (`for`, `while`) due to the JS engine repeatedly parsing the same string. Unbounded caching (`new Map()`) fixes the CPU issue but causes a memory leak, requiring an eviction strategy.
**Action:** Always wrap dynamically compiled JS functions in a size-bounded cache (e.g., Map with max size check) to optimize repetitive execution paths safely without OOM errors.
