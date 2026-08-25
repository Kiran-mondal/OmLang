## 2024-08-24 - [Tabs Accessibility]
**Learning:** Found custom tabs using `<div>` instead of native `<button>` tags, which breaks keyboard accessibility (tab navigation) out-of-the-box.
**Action:** Always prefer native interactive elements like `<button>` over `<div>` for clickable elements, or explicitly manage focus with `role="tab"`, `tabIndex`, and `onKeyDown` if `<div>` is required.

## 2026-08-25 - [Focus Indicators and Utility Classes]
**Learning:** Overriding default focus outlines with utility classes (like `focus:outline-none` in Tailwind) without providing a visual alternative severely degrades keyboard accessibility by making the active element invisible to screen reader and keyboard users.
**Action:** Always ensure that when default focus outlines are removed, they are immediately replaced with an alternative focus indicator, such as `focus-visible:ring` or a custom style, ensuring a clear visual cue for interactive elements.
