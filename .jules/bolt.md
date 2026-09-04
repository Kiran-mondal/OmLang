## 2024-09-04 - Optimize Regular Expression Compilation in React Component

**Learning:** Declaring regular expression literals inside a function or React component results in their repeated compilation or processing every time the function runs (e.g., on re-renders). Caching them outside the function avoids this recurring overhead.

**Action:** Move regular expression patterns outside of functions/components when they do not depend on closure variables, allowing them to be compiled only once.
