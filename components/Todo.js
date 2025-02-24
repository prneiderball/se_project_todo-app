class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._template = document.querySelector(this._selector);
    if (!this._template) {
      throw new Error(`Template with selector ${this._selector} not found`);
    }
  }

  _setEventListeners(todoElement) {
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = todoCheckboxEl.checked;
    });
  }

  getView() {
    const todoElement = this._template.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;

    const todoLabel = todoElement.querySelector(".todo__label");
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const todoDate = todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}`;
    }

    this._setEventListeners(todoElement);

    return todoElement;
  }
}

export default Todo;
