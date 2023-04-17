window.onload = () => {
  const taskForm = document.getElementById("add-task");
  const taskList = document.querySelector(".list .content ul");

  taskForm.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
};

const ele = document.getElementById("title");

// Get the placeholder attribute
const placeholder = ele.getAttribute("text-placeholder");

// Set the placeholder as initial content if it's empty
if (ele.innerHTML.trim() === "") {
  ele.innerHTML = placeholder;
}

ele.addEventListener("focus", (e) => {
  const value = e.target.innerHTML.trim();
  if (value === placeholder) {
    ele.innerHTML = "";
  }
});

ele.addEventListener("blur", (e) => {
  const value = e.target.innerHTML.trim();
  if (value === "" || value === "<br>") {
    ele.innerHTML = placeholder;
  }
});

const el = document.getElementById("heading1");
const plchldr = el.getAttribute("heading-placeholder");

// Set the placeholder as initial content if it's empty
if (el.innerHTML.trim() === "") {
  el.innerHTML = plchldr;
}

el.addEventListener("focus", (e) => {
  const value = e.target.innerHTML.trim();
  if (value === plchldr) {
    el.innerHTML = "";
  }
});

el.addEventListener("blur", (e) => {
  const value = e.target.innerHTML.trim();
  if (value === "" || value === "<br>") {
    el.innerHTML = plchldr;
  }
});

function changeText(event) {
  console.log('triggered');
  // Check if click event originated from edit button
  if (event.target.classList.contains("edit")) {
    let taskText = event.currentTarget.querySelector("span");
    let taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = taskText.textContent;
    event.currentTarget.replaceChild(taskInput, taskText);

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    event.currentTarget.appendChild(saveBtn);

    saveBtn.addEventListener("click", function () {
      let newTaskText = document.createElement("span");
      newTaskText.textContent = taskInput.value;
      event.currentTarget.replaceChild(newTaskText, taskInput);
      event.currentTarget.removeChild(saveBtn);
    });
  } else {
    // Perform strike-through effect
    if (this.style.textDecoration != "line-through") {
      this.style.textDecoration = "line-through";
    } else {
      this.style.textDecoration = "none";
    }
  }
}

document
  .querySelectorAll("li.bullet")
  .forEach((e) => e.addEventListener("click", changeText));

function addTask(event) {
  event.preventDefault();

  const taskFormInput = document.getElementById("task-form");
  const taskText = taskFormInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = document.createElement("li");
  task.classList.add("bullet");
  console.log("added");

  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "Delete";

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "Edit";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);

  task.appendChild(taskTextSpan);
  task.appendChild(buttonsDiv);

  document.querySelector(".list .content ul").appendChild(task);
  taskFormInput.value = "";

  // Add click event listener to the newly created task element
  task.addEventListener("click", changeText);

  // add click event listener to edit button
  editBtn.addEventListener("click", () => {
    let taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = taskTextSpan.textContent;
    task.replaceChild(taskInput, taskTextSpan);

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    buttonsDiv.appendChild(saveBtn);

    saveBtn.addEventListener("click", function () {
      taskTextSpan.textContent = taskInput.value;
      task.replaceChild(taskTextSpan, taskInput);
      buttonsDiv.removeChild(saveBtn);
    });
  });
}

function deleteTask(event) {
  const deleteBtn = event.target.closest(".delete");
  if (deleteBtn) {
    const task = deleteBtn.closest(".bullet");
    task.remove();
  }
}

function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}