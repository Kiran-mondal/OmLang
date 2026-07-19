# 🚀 OmLang - The Next-Gen Multi-Target Programming Language

Welcome to **OmLang**, a modern, lightweight, and highly modular programming language built for seamless execution across Web, APK, and Local environments. 

This project brings a completely custom compiler engine to life with dynamic client-side mechanics, a smart instruction evaluation system, and zero-latency performance—optimized to run perfectly directly in your browser.

---

## 🌍 Live Demo & Web IDE Link
Anyone can write and compile code instantly without installing anything. Click the official public web link below to code directly in your browser:

👉 **[Run OmLang Live on Vercel](https://omlang.quarry.dpdns.org/)**

---

## 🤖 Featured Core Mechanics

### 1. Advanced Matrix Mathematics
* Perfect for complex calculations and structured data handling.
* Supports native multi-dimensional matrix declarations using an intuitive pipe (`|`) and comma (`,`) syntax (e.g., `matrix M = [1, 2 | 3, 4]`).
* The built-in terminal automatically formats and prints matrices in a clean, readable grid.

### 2. Dynamic Combinatorial Logic & Loops
* Features a smart **Instruction Pointer Engine** that perfectly handles block scopes (`{ }`).
* Fully functional and dynamic `while` loops, `for ... to` loops, and exact condition matching with `if / else` blocks.
* Designed with a built-in infinite-loop breaker to prevent browser freezing.

---

## 📜 OmLang Syntax & Keyword Dictionary

The language maps standard complex programming concepts into highly readable, custom OmLang syntax without unnecessary punctuation:

| Keyword / Sign | Programming Concept | Execution Rule Details |
| :---: | :--- | :--- |
| **`show`** | Print / Console Log | Prints variables, strings (e.g., `show "Hello"`), or matrices to the terminal without parentheses. |
| **`matrix`** | 2D Array / Grid | Declares a matrix natively. Pipe `|` separates rows, comma `,` separates columns. |
| **`for ... to`** | For Loop | Iterates a variable sequentially. Syntax: `for i = 1 to 5 { ... }`. |
| **`while`** | While Loop | Executes a block of code continuously as long as the condition remains true. |
| **`if / else`** | Conditionals | Evaluates mathematical and logical expressions to control execution flow dynamically. |

---

## 🛠️ Tech Stack & Engine Architecture Behind the Project

This project leverages modern production tools optimized for ultra-fast, cloud-native execution and zero server lag:

* **Frontend & UI Architecture:** Monolithic DOM setup powered by **Next.js/React**, providing a responsive, dark-mode Web IDE layout.
* **Modular Compiler Engine:** The core brain is split into highly scalable sub-components (`Formatter.js`, `BlockMapper.js`, `Evaluator.js`) for rapid syntax parsing.
* **Memory Management:** Custom state-driven RAM mapping that tracks variables, loops, and matrix structures in real-time execution.
* **Hosting Platform:** High-performance deployment powered by **Vercel's Global Edge Network**.

---

## 🚀 How This Project Runs Globally
1. **GitHub Repository:** Acts as the public codebase core, managing file updates and modular engine configurations.
2. **Vercel Integration:** Watches the GitHub repository. Whenever a change is committed, Vercel triggers an instantaneous cloud deployment build.
3. **Serverless Architecture:** Operates with 100% static client-side evaluation, meaning zero database friction, zero runtime server bottlenecks, and lightning-fast compilation directly in the user's browser.

---
*Developed with 💻 by Kiran Mondal.*
