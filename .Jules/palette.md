## 2024-08-24 - [Tabs Accessibility]
**Learning:** Found custom tabs using `<div>` instead of native `<button>` tags, which breaks keyboard accessibility (tab navigation) out-of-the-box.
**Action:** Always prefer native interactive elements like `<button>` over `<div>` for clickable elements, or explicitly manage focus with `role="tab"`, `tabIndex`, and `onKeyDown` if `<div>` is required.
