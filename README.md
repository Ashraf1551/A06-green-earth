# Question and Answer

## 1) What is the difference between `var`, `let`, and `const`?

- **`var`**:

  - Accessible from anywhere in the function scope
  - Can update the value of a previously declared variable

- **`let`**:

  - Accessible only within the block where it's declared
  - Can update the value of a previously declared variable

- **`const`**:
  - Accessible only within the block where it's declared
  - Cannot re-assign the value once declared

---

## 2) What is the difference between `map()`, `forEach()`, and `filter()`?

- **`forEach()`**

  - Executes a function on each element of the array.
  - Does **not** return a new array.

- **`map()`**

  - Executes a function on each element.
  - **Returns a new array** with the results.

- **`filter()`**
  - Executes a function to **test each element**.
  - **Returns a new array** with only the elements that return `true`.

---

## 3) What are arrow functions in ES6?

- Arrow functions are a shorter way to write functions in JavaScript.
- Use `=>` instead of the `function` keyword.
- Often used for shorter, cleaner code.

---

## 4) How does destructuring assignment work in ES6?

- Destructuring let us **unpack values** from arrays or objects into separate variables.
- It's a shorter, cleaner way to extract data.

---

## 5) Explain template literals in ES6. How are they different from string concatenation?

- Template literals are a new way to create strings using backticks (`` ` ``) instead of quotes.
- They allow:
  - **String interpolation** (insert variables directly)
  - **Multi-line strings** without special characters
