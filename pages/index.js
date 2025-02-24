import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import formValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Function to generate a Todo item from data
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Open add-todo modal
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

// Close add-todo modal
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Handle new todo submission
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const id = uuidv4();

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id, name, date, completed: false };

  const todo = generateTodo(values);
  todosList.append(todo);

  closeModal(addTodoPopup);

  evt.target.reset();
});

// Load initial todos from constants.js
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newtodovalidator = new formValidator(validationConfig, addTodoForm);
newtodovalidator.enableValidation();
