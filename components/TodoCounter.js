class TodoCounter {
  constructor(initialTodos, containerSelector) {
    this._element = document.querySelector(containerSelector);
    this._total = initialTodos.length;
    this._completed = initialTodos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  updateCompleted(isCompleted) {
    const delta = isCompleted ? 1 : -1;
    this._completed = Math.max(0, this._completed + delta);
    this._updateText();
  }
  updateTotal(isAdding) {
    if (isAdding) {
      this._total += 1;
    } else {
      if (this._total > 0) {
        this._total -= 1;
      }
    }
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
