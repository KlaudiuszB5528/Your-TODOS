import { openModal, setFormInputs, handleCheck } from "./utils";

export default async function handleList(e) {
  const ulTodos = document.querySelector(".todos-list");
  const form = document.getElementById("todo-form");
  const index = e.target.parentNode.dataset.index;
  if (e.target.classList.contains("fa-circle-info")) {
    const descriptionEl = e.target.parentNode.querySelector(".details");
    const titleOfTodo = e.target.previousSibling;

    descriptionEl.classList.toggle("active");
    titleOfTodo.classList.toggle("active");
  }
  if (e.target.classList.contains("fa-trash")) {
    ulTodos.removeChild(e.target.parentNode);
    deleteFN(index);
  }

  if (e.target.classList.contains("fa-pen")) {
    form.dataset.formIndex = index;
    setFormInputs(index);
    openModal("Save");
  }

  if (e.target.classList.contains("todo-check")) handleCheck(e);
}

async function deleteFN(index) {
  let uri = `http://localhost:3000/TODOS/${index}`;
  await fetch(uri, { method: "DELETE" });
}
