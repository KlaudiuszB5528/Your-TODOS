import createTodo from "./createTodo";
import handleList from "./handleList";
import { renderTodos, convertDate, removeChildren } from "./utils";

const mainContentTodos = document.querySelector(".main-content-todos");
const removeProjectBtn = document.getElementById("remove-project-btn");
const list = document.querySelector(".projects-list");
const addTodoBtn = document.getElementById("add-todo-btn");

function handleMenu(e) {
  if (e.target.classList.contains("open-projects-list-btn")) {
    list.classList.toggle("active");
  }

  if (e.target.classList.contains("project-name")) {
    const todosHeader = document.querySelector(".active-project-header");
    addTodoBtn.classList.add("active");
    if (todosHeader && todosHeader.textContent != e.target.textContent) {
      todosHeader.textContent = e.target.textContent;
      todosHeader.textContent == "Your TODOS"
        ? removeProjectBtn.classList.remove("active")
        : removeProjectBtn.classList.add("active");
      removeProjectBtn.dataset.index = e.target.parentNode.dataset.index;
      renderTodos();
    } else {
      e.target.textContent == "Your TODOS"
        ? removeProjectBtn.classList.remove("active")
        : removeProjectBtn.classList.add("active");
      mainContentTodos.innerHTML = "";
      const h2 = document.createElement("h2");
      h2.classList.add("active-project-header");
      const ul = document.createElement("ul");
      ul.classList.add("todos-list");
      ul.addEventListener("click", handleList);
      h2.textContent = e.target.textContent;
      mainContentTodos.appendChild(h2);
      mainContentTodos.appendChild(ul);
      renderTodos();
    }
  }
  if (e.target.id == "inbox") {
    addTodoBtn.classList.remove("active");
    removeProjectBtn.classList.remove("active");
    const todosHeader = document.querySelector(".active-project-header");
    if (!todosHeader) return;
    mainContentTodos.removeChild(todosHeader);
    const inboxNav = document.createElement("ul");
    inboxNav.classList.add("inbox-nav");
    const navAll = document.createElement("li");
    const navToday = document.createElement("li");
    const navThisWeek = document.createElement("li");
    const allBtn = document.createElement("button");
    const todayBtn = document.createElement("button");
    const thisWeekBtn = document.createElement("button");
    allBtn.textContent = "All";
    todayBtn.textContent = "Today";
    thisWeekBtn.textContent = "7 Days";

    navAll.appendChild(allBtn);
    navToday.appendChild(todayBtn);
    navThisWeek.appendChild(thisWeekBtn);

    inboxNav.appendChild(navAll);
    inboxNav.appendChild(navToday);
    inboxNav.appendChild(navThisWeek);
    inboxNav.addEventListener("click", handleNav);
    allTodos();
    mainContentTodos.insertBefore(inboxNav, mainContentTodos.firstChild);
  }
}

function handleNav(e) {
  if (e.target.textContent == "All") handleNavButtons(e, allTodos);

  if (e.target.textContent == "7 Days") handleNavButtons(e, thisWeekTodos);

  if (e.target.textContent == "Today") handleNavButtons(e, todayTodos);
}

function handleNavButtons(e, func) {
  const btns = e.target.closest("ul").children;
  [...btns].forEach((btn) => {
    btn.classList.remove("active");
  });
  e.target.parentNode.classList.add("active");
  func();
}

async function thisWeekTodos() {
  const list = document.querySelector(".todos-list");
  removeChildren(list);
  let uri = `http://localhost:3000/TODOS?_sort=dueDate&_order=asc`;
  const res = await fetch(uri);
  const data = await res.json();
  const thisWeek = new Date();
  thisWeek.setDate(new Date().getDate() + 7);
  const convertedThisWeek = convertDate(thisWeek);

  data.forEach((todo) => {
    if (todo.dueDate < convertedThisWeek)
      createTodo(todo, todo.id, todo.isChecked, "active");
  });
}

async function todayTodos() {
  const list = document.querySelector(".todos-list");
  removeChildren(list);
  let uri = `http://localhost:3000/TODOS?_sort=dueDate&_order=asc`;
  const res = await fetch(uri);
  const data = await res.json();
  const today = new Date();
  const convertedToday = convertDate(today);

  data.forEach((todo) => {
    if (todo.dueDate == convertedToday)
      createTodo(todo, todo.id, todo.isChecked, "active");
  });
}

async function allTodos() {
  const list = document.querySelector(".todos-list");
  removeChildren(list);
  let uri = `http://localhost:3000/TODOS`;
  const res = await fetch(uri);
  const data = await res.json();

  data.forEach((dataEl) => {
    createTodo(dataEl, dataEl.id, dataEl.isChecked, "active");
  });
}

export default handleMenu;
