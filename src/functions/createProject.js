import { renderProjects } from "./utils";

export default function addProject() {
  const btn = document.getElementById("add-project-btn");
  const mainContentMenu = document.querySelector(".main-content-menu");
  const projectInput = document.createElement("input");
  projectInput.id = "add-project-input";
  projectInput.setAttribute("autocomplete", "off");
  projectInput.setAttribute("maxlength", "20");
  projectInput.addEventListener("keydown", handleProjectInput);

  mainContentMenu.removeChild(btn);
  mainContentMenu.appendChild(projectInput);
  projectInput.focus();

  async function handleProjectInput(e) {
    if (e.key === "Enter") {
      const projectsList = document.querySelector(".projects-list");
      mainContentMenu.removeChild(projectInput);
      mainContentMenu.appendChild(btn);
      const projectsListEl = document.createElement("li");
      const projectsListElBtn = document.createElement("button");
      projectsListElBtn.classList.add("project-name");
      projectsListElBtn.textContent = projectInput.value;
      const data = {
        projectName: projectInput.value,
      };
      await fetch(`http://localhost:3000/PROJECTS`, {
        method: `POST`,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      projectsListEl.appendChild(projectsListElBtn);
      projectsList.appendChild(projectsListEl);
      renderProjects();
    }
  }
}
