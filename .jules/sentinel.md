## 2024-05-18 - XSS Sanitization in React Contexts
**Vulnerability:** Double-escaping HTML entities.
**Learning:** React inherently sanitizes strings before rendering them to the DOM. Applying a manual XSS sanitization pass (like replacing `<` with `&lt;`) on strings that will be rendered directly by React causes the output to be double-escaped, displaying raw HTML entities instead of the actual characters.
**Prevention:** Do not manually sanitize output strings that are destined for safe React rendering blocks unless they are being injected via `dangerouslySetInnerHTML`.
