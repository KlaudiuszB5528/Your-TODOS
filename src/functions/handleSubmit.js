import createTodo from "./createTodo";
import { closeModal, renderTodos } from "./utils";

async function handleSubmit(e) {
  e.preventDefault();
  const btnTextContent = document.getElementById("todo-submit-btn").textContent;
  const projectName = document.querySelector(
    ".active-project-header"
  ).textContent;
  const todoTitle = document.getElementById("todo-title").value;
  const todoDate = document.getElementById("todo-date").value;
  const todoPriority = document.getElementById("todo-priority").value;
  const todoDescription = document.getElementById("todo-description").value;
  const data = {
    project: `${projectName}`,
    title: todoTitle,
    dueDate: todoDate,
    priority: todoPriority,
    description: todoDescription,
    isChecked: false,
  };
  const index = e.target.dataset.formIndex;
  btnTextContent === "Submit" ? handlePOST(data) : handlePUT(index);
  closeModal();
}

async function handlePOST(data) {
  await fetch(`http://localhost:3000/TODOS`, {
    method: `POST`,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const arr = await fetch(`http://localhost:3000/TODOS`);
  const arrJson = await arr.json();
  const index = arrJson.length;
  createTodo(data, index);
}

async function handlePUT(index) {
  const projectName = document.querySelector(
    ".active-project-header"
  ).textContent;
  const todoTitle = document.getElementById("todo-title").value;
  const todoDate = document.getElementById("todo-date").value;
  const todoPriority = document.getElementById("todo-priority").value;
  const todoDescription = document.getElementById("todo-description").value;
  const data = {
    project: `${projectName}`,
    title: todoTitle,
    dueDate: todoDate,
    priority: todoPriority,
    description: todoDescription,
  };
  await fetch(`http://localhost:3000/TODOS/${index}`, {
    method: `PUT`,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  renderTodos();
}

export default handleSubmit;
