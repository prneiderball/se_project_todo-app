class TodoCounter {
  constructor(todos, containerSelector) {
    this._todos = todos;
    this._element = document.querySelector(containerSelector);
    this._completed = this._todos.filter((todo) => todo.completed).length;
    this._total = this._todos.length;
    this._updateText();
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
    } else {
      if (this._completed > 0) {
        this._completed -= 1;
      }
    }
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      if (this._total > 0) {
        this._total -= 1;
      }
    }
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
