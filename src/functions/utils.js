import createTodo from "./createTodo";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const submitBtn = document.getElementById("todo-submit-btn");

function setDateInput() {
  const dateInput = document.getElementById("todo-date");
  const year = new Date().getFullYear();
  const month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth();
  const day =
    new Date().getDate() < 10
      ? `0${new Date().getDate()}`
      : new Date().getDate();
  dateInput.min = `${year}-${month}-${day}`;
}

function convertDate(date) {
  const year = `${date.getFullYear()}`;
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function openModal(btnText) {
  setDateInput();
  submitBtn.textContent = `${btnText}`;
  overlay.classList.add("active");
  modal.classList.add("active");
}

function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}

function removeChildren(name) {
  while (name.hasChildNodes()) {
    name.removeChild(name.firstChild);
  }
}

function handleBurgerMenu(burgerMenu, menu) {
  burgerMenu.classList.toggle("active");
  menu.classList.toggle("active");
  menu.classList.toggle("mobile-closed");
}

function setFormInputs(index) {
  let titleInput = document.getElementById("todo-title");
  let dateInput = document.getElementById("todo-date");
  let prioritySelect = document.getElementById("todo-priority");
  let descriptionInput = document.getElementById("todo-description");
  let todo = document.querySelector(`[data-index="${index}"]`);

  const todoTitle = todo.querySelector(".title");
  titleInput.value = todoTitle.textContent;

  const todoPriority = todo.querySelector(".fa-flag");
  switch (todoPriority.style.color) {
    case "blue":
      prioritySelect.value = "low";
      break;
    case "var(--medium)":
      prioritySelect.value = "medium";
      break;
    case "red":
      prioritySelect.value = "high";
      break;
  }

  const todoDescription = todo.querySelector(".description");
  descriptionInput.textContent = todoDescription.textContent;

  const todoDate = todoDescription.nextElementSibling;
  const [day, month, year] = todoDate.textContent.slice(11).split(".");
  dateInput.value = `${year}-${month}-${day}`;
}

async function getProjects() {
  const res = await fetch(`http://localhost:3000/PROJECTS`);
  const data = await res.json();
  data.forEach((project) => {
    createProjectLi(project.projectName, project.id);
  });
}

function createProjectLi(name, index) {
  const projectsList = document.querySelector(".projects-list");
  const projectsListEl = document.createElement("li");
  const projectsListElBtn = document.createElement("button");
  projectsListElBtn.classList.add("project-name");
  projectsListEl.dataset.index = index;
  projectsListElBtn.textContent = name;
  projectsListEl.appendChild(projectsListElBtn);
  projectsList.appendChild(projectsListEl);
}

async function removeProject(e) {
  const index = e.target.dataset.index;
  const projectName = document.querySelector(".active-project-header");
  let uri = `http://localhost:3000/PROJECTS/${index}`;
  await fetch(uri, { method: "DELETE" });
  const removeProjectBtn = document.getElementById("remove-project-btn");
  removeProjectBtn.classList.remove("active");
  clearTodosAfterRemovingProject(projectName.textContent);
  projectName.textContent = "Your TODOS";
  renderTodos();
  renderProjects();
}

async function clearTodosAfterRemovingProject(name) {
  let uri = `http://localhost:3000/TODOS?project=${name}`;
  const res = await fetch(uri);
  const data = await res.json();

  data.forEach(async (el) => {
    let uri = `http://localhost:3000/TODOS/${el.id}`;
    await fetch(uri, { method: "DELETE" });
  });
}

async function renderProjects() {
  const list = document.querySelector(".projects-list");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  getProjects();
}

async function getTodos() {
  const activeProject = document.querySelector(
    ".active-project-header"
  ).textContent;

  let uri = `http://localhost:3000/TODOS?project=${activeProject}`;
  const res = await fetch(uri);
  const data = await res.json();

  data.forEach((todo) => {
    createTodo(todo, todo.id, todo.isChecked);
  });
}

async function renderTodos() {
  const list = document.querySelector(".todos-list");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  getTodos();
}

async function handleCheck(e) {
  const checkboxStatus = e.target.checked;
  const index = e.target.parentNode.dataset.index;
  const data = {
    isChecked: checkboxStatus,
  };
  await fetch(`http://localhost:3000/TODOS/${index}`, {
    method: `PATCH`,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export {
  openModal,
  closeModal,
  setDateInput,
  removeChildren,
  setFormInputs,
  getTodos,
  renderTodos,
  handleCheck,
  getProjects,
  removeProject,
  renderProjects,
  convertDate,
  handleBurgerMenu,
};
