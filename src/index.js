import addProject from "./functions/createProject";
import handleSubmit from "./functions/handleSubmit";
import handleList from "./functions/handleList";
import {
  openModal,
  closeModal,
  getTodos,
  getProjects,
  removeProject,
  handleBurgerMenu,
} from "./functions/utils";
import handleMenu from "./functions/handleMenu";

const App = (() => {
  const addBtn = document.getElementById("add-todo-btn");
  const closeBtn = document.getElementById("close-btn");
  const addProjectBtn = document.getElementById("add-project-btn");
  const removeProjectBtn = document.getElementById("remove-project-btn");
  const form = document.getElementById("todo-form");
  const formTextArea = document.getElementById("todo-description");
  const burgerMenu = document.querySelector(".burger-menu");
  const menu = document.querySelector(".main-content-menu");
  const ulTodos = document.querySelector(".todos-list");

  addBtn.addEventListener("click", () => {
    form.reset();
    formTextArea.textContent = "";
    if (menu.classList.contains("active")) {
      handleBurgerMenu(burgerMenu, menu);
    }
    openModal("Submit");
  });
  closeBtn.addEventListener("click", closeModal);
  addProjectBtn.addEventListener("click", addProject);
  removeProjectBtn.addEventListener("click", removeProject);

  form.addEventListener("submit", handleSubmit);

  menu.addEventListener("click", handleMenu);

  ulTodos.addEventListener("click", handleList);

  burgerMenu.addEventListener("click", () => {
    handleBurgerMenu(burgerMenu, menu);
  });

  window.addEventListener("DOMContentLoaded", () => {
    getTodos();
    getProjects();
  });
})();
