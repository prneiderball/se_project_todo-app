class Todo {
  constructor(data, selector, TodoCounter) {
    this._data = data;
    this._selector = selector;
    this._todoCounter = TodoCounter;
    this._template = document.querySelector(this._selector);
    if (!this._template) {
      throw new Error(`Template with selector ${this._selector} not found`);
    }
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoCounter.updateTotal(false);
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._todoCounter.updateCompleted(this._todoCheckboxEl.checked); // Update based on checkbox state
    });
  }

  getView() {
    this._todoElement = this._template.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");

    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}`;
    }

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
