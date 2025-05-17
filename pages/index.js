import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (todoData) => {
  const todo = new Todo(todoData, "#todo-template", todoCounter);

  // Re-filter whenever a todo is toggled complete/incomplete
  const checkbox = todo.getView().querySelector(".todo__completed");
  checkbox.addEventListener("change", () => {
    const activeBtn = document.querySelector(".filter-btn--active");
    if (activeBtn) {
      applyFilter(activeBtn.dataset.filter);
    }
  });

  return todo.getView();
};

const renderTodo = (sectionInstance, todoData) => {
  const todoElement = generateTodo(todoData);
  sectionInstance.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => generateTodo(item),
  containerSelector: ".todos__list",
});

const todopopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const id = uuidv4();
  const values = {
    id,
    name: formData.name,
    date: formData.date ? new Date(formData.date) : "",
    completed: false,
  };

  renderTodo(section, values);
  todoCounter.updateTotal(true);
  newTodoValidator.resetValidation();
  todopopup.close();

  // Re-apply current filter after new todo is added
  const activeBtn = document.querySelector(".filter-btn--active");
  if (activeBtn) {
    applyFilter(activeBtn.dataset.filter);
  }
});

const addTodoForm = todopopup.getForm();
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  todopopup.open();
});

todopopup.setEventListeners();
section.renderItems();

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) =>
      btn.classList.remove("filter-btn--active")
    );
    button.classList.add("filter-btn--active");
    applyFilter(button.dataset.filter);
  });
});

function applyFilter(filterType) {
  const allTodos = document.querySelectorAll(".todo");
  let visible = 0;
  const total = allTodos.length;

  allTodos.forEach((todoElement) => {
    const checkbox = todoElement.querySelector(".todo__completed");
    const isCompleted = checkbox.checked;
    let shouldShow = false;

    if (filterType === "all") {
      shouldShow = true;
    } else if (filterType === "completed" && isCompleted) {
      shouldShow = true;
    } else if (filterType === "incomplete" && !isCompleted) {
      shouldShow = true;
    }

    todoElement.style.display = shouldShow ? "" : "none";
    if (shouldShow) visible++;
  });

  document.querySelector(".counter__text").textContent = `Showing ${visible} out of ${total}`;
}
