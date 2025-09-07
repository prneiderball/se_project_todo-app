class Todo {
  constructor(data, selector, todoCounter) {
    this._data = data;
    this._selector = selector;
    this._todoCounter = todoCounter;
    this._template = document.querySelector(this._selector);

    if (!this._template) {
      throw new Error(`Template with selector ${this._selector} not found`);
    }
  }

  _initializeElements() {
    this._todoElement = this._template.content
      .querySelector(".todo")
      .cloneNode(true);

    // Make the todo item draggable and assign a unique data-id
    this._todoElement.setAttribute("draggable", "true");
    this._todoElement.setAttribute("data-id", this._data.id);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", (event) => {
      this._data.completed = event.target.checked;
      this._todoCounter.updateCompleted(event.target.checked);
      this._todoElement.classList.toggle(
        "todo_completed",
        event.target.checked
      );
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (this._data.completed) {
        this._todoCounter.updateCompleted(false);
      }
      this._todoCounter.updateTotal(false);
      this._todoElement.remove();
    });
  }

  getView() {
    this._initializeElements();

    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    this._todoDate.textContent = !isNaN(dueDate)
      ? `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`
      : "";

    this._setEventListeners();

    if (this._data.completed) {
      this._todoElement.classList.add("todo_completed");
      this._todoCounter.updateCompleted(true);
    }

    return this._todoElement;
  }
}

export default Todo;
