export default function createTodo(todo, index, isChecked = false, display) {
  const todosList = document.querySelector(".todos-list");
  const listElement = document.createElement("li");

  const listCheckbox = document.createElement("input");
  listCheckbox.type = "checkbox";
  listCheckbox.name = "todo-check";
  listCheckbox.checked = isChecked;
  listCheckbox.classList.add("todo-check");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.textContent = todo.title;

  const infoIcon = document.createElement("i");
  infoIcon.classList.add("fa-solid", "fa-circle-info");

  const flagIcon = document.createElement("i");
  flagIcon.classList.add("fa-solid", "fa-flag");
  switch (todo.priority) {
    case "low":
      flagIcon.style.color = "blue";
      break;
    case "medium":
      flagIcon.style.color = "var(--medium)";
      break;
    case "high":
      flagIcon.style.color = "red";
      break;
  }

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen", `${display}`);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", `${display}`);

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("details");
  const detailsContentDiv = document.createElement("div");
  detailsContentDiv.classList.add("details-content");

  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = todo.description || "There's no description";
  const dueDateDiv = document.createElement("div");
  const [year, month, day] = todo.dueDate.split("-");
  dueDateDiv.textContent = `Due date : ${day}.${month}.${year}`;

  descriptionDiv.classList.add("description");
  dueDateDiv.classList.add("dueDate");

  detailsContentDiv.appendChild(descriptionDiv);
  detailsContentDiv.appendChild(dueDateDiv);
  detailsDiv.appendChild(detailsContentDiv);

  listElement.appendChild(listCheckbox);
  listElement.appendChild(titleDiv);
  listElement.appendChild(infoIcon);
  listElement.appendChild(flagIcon);
  listElement.appendChild(editIcon);
  listElement.appendChild(deleteIcon);
  listElement.appendChild(detailsDiv);
  listElement.dataset.index = index;
  listElement.classList.add("todo-element");

  todosList.appendChild(listElement);
}

//   <li>
//     <input type="checkbox" name="todo-check" class="todo-check" />
//     <div class="title">Title</div>
//     <i class="fa-solid fa-circle-info"></i>
//     <i class="fa-solid fa-flag"></i>
//     <button class="edit"><i class="fa-solid fa-pen"></i></button>
//     <button class="delete"><i class="fa-solid fa-trash"></i></button>
//     <div class="details">
//       <div class="details-content">
//         <div class="description">Description</div>
//         <div class="dueDate">Due Date : 22.03.2022</div>
//       </div>
//     </div>
//   </li>
