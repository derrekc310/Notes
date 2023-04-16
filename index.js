function changeText(event) {
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

    saveBtn.addEventListener("click", function() {
      let newTaskText = document.createElement("span");
      newTaskText.textContent = taskInput.value;
      event.currentTarget.replaceChild(newTaskText, taskInput);
      event.currentTarget.removeChild(saveBtn);
    });
  } else {
    // Perform strike-through effect
    if (this.style.textDecoration != 'line-through') {
      this.style.textDecoration = 'line-through';
    } else {
      this.style.textDecoration = 'none';
    }
  }
}


document
  .querySelectorAll("li.bullet")
  .forEach((el) => el.addEventListener("click", changeText));

const taskList = document.querySelectorAll(".bullet");

// Add functionality to delete tasks
for (let i = 0; i < taskList.length; i++) {
  let deleteBtn = taskList[i].querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    taskList[i].remove();
  });
}

// Add functionality to edit tasks
for (let i = 0; i < taskList.length; i++) {
  let editBtn = taskList[i].querySelector(".edit");
  editBtn.addEventListener("click", function () {
    editBtn.disabled = true;
    let taskText = taskList[i].firstChild;
    let taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = taskText.textContent;
    taskList[i].setAttribute("contentEditable", true);
    taskList[i].replaceChild(taskInput, taskText);

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    taskList[i].appendChild(saveBtn);

    var savedEvent = function () {
      let newTaskText = document.createElement("span");
      newTaskText.setAttribute("id", "text");
      newTaskText.textContent = taskInput.value;
      taskList[i].replaceChild(newTaskText, taskInput);
      taskList[i].removeChild(saveBtn);
      taskList[i].setAttribute("contentEditable", false);
      editBtn.disabled = false;
    }

    saveBtn.addEventListener("click", savedEvent);
    taskInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        saveBtn.click();
      }
    })
  });
}


  
  // Add functionality to add new tasks
  const addBtn = document.getElementById("add");
  addBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const taskForm = document.getElementById("task-form");
    if (taskForm.value === "") {
      alert("Please enter a task!");
    } else {
      const task = document.createElement("li");
      task.classList.add("bullet");
      const taskText = document.createElement("span");
      taskText.textContent = taskForm.value;
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      deleteBtn.textContent = "delete";
      const editBtn = document.createElement("button");
      editBtn.classList.add("edit");
      editBtn.textContent = "edit";
      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttons");
      buttonsDiv.appendChild(editBtn);
      buttonsDiv.appendChild(deleteBtn);
      task.appendChild(taskText);
      task.appendChild(buttonsDiv);
      const taskList = document.querySelector(".list .content ul");
      taskList.appendChild(task);
      taskForm.value = "";
    }
  });
  
