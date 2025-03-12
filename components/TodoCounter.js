class TodoCounter {
  constructor(initialTodos, containerSelector) {
    this._element = document.querySelector(containerSelector);
    this._total = initialTodos.length;
    this._completed = 1;
    this._updateText();
  }

  updateCompleted(isCompleted) {
    if (isCompleted) {
      this._completed += 1;
    } else {
      if (this._completed > 0) {
        this._completed -= 1;
      }
    }
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
