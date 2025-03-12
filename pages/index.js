import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"; // <-- Ensure this import exists
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const renderTodo = (sectionInstance, todoData) => {
  const todo = new Todo(todoData, "#todo-template", todoCounter);
  const todoElement = todo.getView();
  sectionInstance.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", todoCounter);
    return todo.getView();
  },
  containerSelector: ".todos__list"
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const popup = new PopupWithForm("#add-todo-popup", (formData) => {
  const id = uuidv4();
  const values = {
    id,
    name: formData.name,
    date: formData.date ? new Date(formData.date) : null,
    completed: false
  };
  renderTodo(section, values);
  todoCounter.updateTotal(true);
  newTodoValidator.resetValidation();
  popup.close();
});

addTodoButton.addEventListener("click", () => {
  popup.open();
});

popup.setEventListeners();
section.renderItems();
