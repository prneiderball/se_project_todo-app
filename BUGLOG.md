## Bug: todoCounter displaying incorrectly
**Date:** 2025-09-06

### Observation

When opening the app, the todo counter displayed **“1 out of 3 completed”**, even though I expected the counter to start at 0.

### Debugging Process

1. Console logged `initialTodos` in `index.js` to check the starting state.
2. Saw that the fzero index had `completed: true`.
3. Traced into the `Todo` class:

   * In `getView()`, if a todo is marked as completed, it calls:

     ```js
     this._todoCounter.updateCompleted(true);
     ```
   * This explained why the counter was incrementing before I interacted with the app.

### Root Cause

This wasn’t a logic bug in the counter — it was a **data issue**. The seed data (`constants.js`) initialized with one completed todo, so the counter correctly showed 1/3.

### Solution

Corrected the seed data in `constants.js` so all todos start as incomplete:

```js
export const initialTodos = [
  {
    id: "7cec7373-681b-49d9-b065-021d61a69d03",
    name: "Read the sprint's theory",
    completed: true,   // <-- fixed here set to false
    date: new Date()
  },
  {
    id: "a7bfd5ef-37cc-4fa6-89f2-cac098a8aeba",
    name: "Read project instructions",
    completed: false,
    date: new Date()
  },
  {
    id: "aa486839-63ab-437f-b8a2-29ab217dff4f",
    name: "Complete project",
    completed: false,
    date: new Date()
  }
];
```

Now the counter starts at **0 out of 3 completed**, which matches expectations.

### Outcome

* The UI no longer shows a completed task on app load.
* The app state is predictable, making it easier to debug future issues.

### Reflection

This bug was subtle...it wasn’t a broken feature, but an **unexpected initial state**. The key takeaway is that **bad seed data can look like a logic error**.

### future improvements:
I would eventually like to remove the seed data all together for a more clean and predictable starting start. The Counter starts at 0 out 3 complete and I would prefer the inital todosbe removed now that backend is set up.

In practice:

* I learned to always check the data first when the UI looks wrong.
* I made the app more predictable by ensuring seed data starts from a clean, predictable baseline.
