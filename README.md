<div align="center">
  <img src="./app/icon.svg" alt="The Matrix Om - OmLang Logo" width="200" height="200" />
  <h1>OmLang</h1>
  <p><b>The Next-Gen Multi-Target Programming Language</b></p>
</div>


---

Welcome to OmLang, a modern, lightweight, and highly modular programming language built for seamless execution across Web, APK, and Local environments. 

This project brings a completely custom compiler engine to life with dynamic client-side mechanics, a smart instruction evaluation system, and zero-latency performance—optimized to run perfectly directly in your browser.

---

## 🌍 Live Demo & Web IDE Link
Anyone can write and compile code instantly without installing anything. Click the official public web link below to code directly in your browser:

👉 **[Run OmLang Live on Vercel](https://omlang.quarry.dpdns.org/)**

---

## 🆚 OmLang vs. Modern Next-Gen Languages

OmLang is designed to compete with the newest generation of programming languages by offering a zero-friction, highly readable development experience. Here is how it stands against modern giants like Gleam, Mojo, and Zig:

| Feature / Paradigm | 🚀 OmLang | 🌟 Gleam / Mojo / Zig | The OmLang Advantage |
| :--- | :--- | :--- | :--- |
| **Execution & Environment** | **100% Client-Side Web Native** | Requires LLVM, Erlang VM, or heavy toolchains | Zero compilation wait times. Write, run, and evaluate instantly in any browser. |
| **Logic & Control Flow** | `if` / `maybe` / `otherwise` | `case` (Gleam) / `elif` (Mojo) | Abandons rigid systems-level boilerplate in favor of natural, English-like logic flow. |
| **Data Structures** | `data { name: "Om" }` | Strict Custom Types / Structs | Ultra-minimalist data mapping. No need for complex type definitions. |
| **Matrix Operations** | Native `[1, 2 | 3, 4]` | Requires SIMD/Tensors (Mojo) | Built-in, zero-dependency multi-dimensional matrix syntax out of the box. |
| **Output / Logging** | `show "Hello"` | `io.println()` / `print()` | Parenthesis-free and ultra-minimalist syntax for rapid and clean debugging. |

---

## 🤖 Featured Core Mechanics

### 1. Advanced Matrix Mathematics
* Perfect for complex calculations and structured data handling.
* Supports native multi-dimensional matrix declarations using an intuitive pipe (`|`) and comma (`,`) syntax (e.g., `matrix M = [1, 2 | 3, 4]`).
* The built-in terminal automatically formats and prints matrices in a clean, readable grid.

### 2. Dynamic Combinatorial Logic & Loops
* Features a smart **Instruction Pointer Engine** that perfectly handles block scopes (`{ }`).
* Fully functional and dynamic `while` loops, `for ... to` loops, and exact condition matching with `if / maybe / otherwise` blocks.
* Designed with a built-in infinite-loop breaker to prevent browser freezing.

---

## 📜 OmLang Syntax & Keyword Dictionary

The language maps standard complex programming concepts into highly readable, custom OmLang syntax without unnecessary punctuation:

| Keyword / Sign | Programming Concept | Execution Rule Details |
| :---: | :--- | :--- |
| **`show`** | Print / Console Log | Prints variables, strings, or matrices to the terminal without parentheses. |
| **`data { ... }`** | Dictionary / Object | Used to map key-value pairs cleanly into memory. |
| **`matrix`** | 2D Array / Grid | Declares a matrix natively. Pipe `|` separates rows, comma `,` separates columns. |
| **`for ... to`** | For Loop | Iterates a variable sequentially. Syntax: `for i = 1 to 5 { ... }`. |
| **`while`** | While Loop | Executes a block of code continuously as long as the condition remains true. |
| **`maybe`** / **`otherwise`** | Conditionals | Evaluates mathematical and logical expressions to control execution flow dynamically. |

---

## 🛠️ Tech Stack & Engine Architecture

* **Frontend & UI:** Monolithic DOM setup powered by **Next.js/React**, providing a responsive, dark-mode Web IDE layout.
* **Modular Compiler Engine:** The core brain is split into highly scalable sub-components (`StandardLibrary.js`, `Utils.js`, `Evaluator.js`, `Engine.js`) for rapid syntax parsing.
* **Memory Management:** Custom state-driven RAM mapping that tracks variables, loops, and matrix structures in real-time.
* **Hosting:** High-performance deployment powered by **Vercel's Global Edge Network**.

---
*Developed with 💻 by Kiran Mondal.*
