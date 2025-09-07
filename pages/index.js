import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("initialTodos:", initialTodos);
  const addTodoButton = document.querySelector(".button_action_add");
  const todoCounter = new TodoCounter(initialTodos, ".counter__text");

  const generateTodo = (todoData) => {
    const todo = new Todo(todoData, "#todo-template", todoCounter);

    // Re-filter when a todo is toggled complete/incomplete
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

  // Drag-and-drop functionality
  function enableDragAndDrop() {
    const todoList = document.querySelector(".todos__list");
    if (!todoList) {
      console.error("Todo list container (.todos__list) not found");
      return;
    }
    todoList.setAttribute("draggable", "false");

    todoList.addEventListener("dragstart", (event) => {
      const todoElement = event.target.closest(".todo");
      if (todoElement) {
        event.dataTransfer.setData("text/plain", todoElement.dataset.id);
        todoElement.classList.add("dragging");
      }
    });

    todoList.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    todoList.addEventListener("drop", (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      const draggedElement = todoList.querySelector(`[data-id="${id}"]`);
      const afterElement = getDragAfterElement(todoList, event.clientY);
      if (afterElement == null) {
        todoList.appendChild(draggedElement);
      } else {
        todoList.insertBefore(draggedElement, afterElement);
      }
      const orderedIds = [...todoList.querySelectorAll(".todo")].map(el => el.dataset.id);
      const idToTodo = new Map(section._items.map(todo => [todo.id, todo]));
      const orderedTodos = orderedIds.map(id => idToTodo.get(id));
      section.setItems(orderedTodos);
    });

    todoList.addEventListener("dragend", (event) => {
      const todoElement = event.target.closest(".todo");
      if (todoElement) {
        todoElement.classList.remove("dragging");
      }
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".todo:not(.dragging)")].filter(el => el.style.display !== "none");
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // Initialize drag-and-drop
  enableDragAndDrop();

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
});