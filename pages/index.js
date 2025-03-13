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
  return todo.getView();
};

const renderTodo = (sectionInstance, todoData) => {
  const todoElement = generateTodo(todoData);
  sectionInstance.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => generateTodo(item),
  containerSelector: ".todos__list"
});

const todopopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const id = uuidv4();
  const values = {
    id,
    name: formData.name,
    date: formData.date ? new Date(formData.date) : "",

    completed: false
  };

  renderTodo(section, values);
  todoCounter.updateTotal(true);
  newTodoValidator.resetValidation();
  todopopup.close();
});

const addTodoForm = todopopup.getForm();
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  todopopup.open();
});

todopopup.setEventListeners();
section.renderItems();
