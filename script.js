// To-Do input field
const todoInput = document.getElementById("todoInput");

// Add button
const addButton = document.getElementById("addButton");

// To-Do list container
const todoList = document.getElementById("searches");


// Store unique To-Do tasks in Set
let todoSet = new Set();

// Event listener to Add button
addButton.addEventListener("click", function () {
  addTask();
});

// Function to add new to-do task
function addTask() {
    const task = todoInput.value.trim().toLowerCase();
    //Validate input

    if( task == ""){
        alert("Please enter something");

    } else if (todoSet.has(task)) {
        alert("This exists on the list")
    
} else {
    // Create list item
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "10px";

    // Create span to hold text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task;
    listItem.appendChild(taskSpan);

    // Create Update button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", function () {
      updateTask(listItem, taskSpan, task);
    });

    // Create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.addEventListener("click", function () {
      deleteTask(listItem, task);
    });

    // Create Complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark as Complete";
    completeButton.style.backgroundColor = "green";
    completeButton.style.color = "white";
    //Added ID for button 
    completeButton.id="cButton";
    completeButton.addEventListener("click", function () {
      completeTask(listItem, taskSpan, task);
    });

    // Append buttons to list item
    listItem.appendChild(updateButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(completeButton);

    // Append list item to To-Do list
    todoList.appendChild(listItem);

    // Add task to Set
    todoSet.add(task);

    // Clear input field
    todoInput.value = "";
  }
}
// Function to update a To-Do item
function updateTask(listItem, taskSpan, oldTask) {
  const newTask = prompt("Update your task:", taskSpan.textContent);

  if (newTask && newTask.trim() !== "") {
    const normalizedNewTask = newTask.trim().toLowerCase();

    if (todoSet.has(normalizedNewTask) && normalizedNewTask !== oldTask) {
      alert("This task already exists!");
    } else {
      // Remove the old task from the Set
      todoSet.delete(oldTask);

      // Update UI
      taskSpan.textContent = newTask;

      // Add the new task to the Set
      todoSet.add(normalizedNewTask);
    }
  }
}

// Function to delete a To-Do item
function deleteTask(listItem, task) {
  listItem.remove(); // Remove item from UI
  todoSet.delete(task); // Fully remove from Set
}

// Function to mark as complete a To-Do item

function completeTask(listItem, taskSpan, task) {
  //Show an alert
  alert ("This is marked as completed");
  taskSpan.classList.add("completed");
  // Mark the task as completed (line-through)
  taskSpan.style.textDecoration = "line-through";

  // Disable all buttons in this list item
  const buttons = listItem.querySelectorAll("button");
  buttons.forEach((btn) => {
    if (btn.textContent === "Mark as Complete") {
      btn.textContent = "Completed";
      btn.style.backgroundColor = "blue";
      btn.disabled = true;
    }
  });
}



 