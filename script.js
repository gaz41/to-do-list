// Get references to HTML elements
const inputBox = document.getElementById("input-box"); // Input field for new tasks
const addBtn = document.getElementById("addBtn"); // Button to add tasks
const listContainer = document.getElementById("list-container"); // Container for task list
const emptyInputMsg = document.getElementById("empty-input-msg"); // Message for empty input
const taskCount = document.getElementById("task-count"); // Display for task count
const reset = document.getElementById("reset"); // Button to reset tasks

taskCount.innerHTML = ""; // Clear previous messag
inputBox.focus(); // Focus back on input box

// Function to add a new task
function AddTask() {
  const taskValue = inputBox.value.trim(); // Get trimmed input value

  // Check if the input is empty
  if (!taskValue) {
    emptyInputMsg.innerHTML = "Add a task to do"; // Show message if empty
    inputBox.focus(); // Focus back on input box
    return; // Exit function
  }

  // Create a new task object
  const task = { todo: taskValue, completed: false };
  const tasks = getTasks(); // Retrieve existing tasks
  tasks.push(task); // Add new task to the list
  saveData(tasks); // Save updated task list
  renderTasks(tasks); // Render updated task list
  inputBox.value = ""; // Clear input box
  inputBox.focus(); // Focus back on input box
  emptyInputMsg.innerHTML = ""; // Clear empty input message
}

// Event listener for the button to add tasks
addBtn.addEventListener("click", AddTask);

// Event listener for clicks on the task list
listContainer.addEventListener(
  "click",
  function (e) {
    const tasks = getTasks(); // Retrieve existing tasks
    if (e.target.tagName === "LI") {
      // Toggle completion status if a task is clicked
      const index = e.target.dataset.index; // Get index of clicked task
      tasks[index].completed = !tasks[index].completed; // Toggle completed status
    } else if (
      e.target.tagName === "SPAN" &&
      e.target.className !== "edit-btn"
    ) {
      // Delete task if delete button is clicked
      const index = e.target.parentElement.dataset.index; // Get index of task
      tasks.splice(index, 1); // Remove task from list
    } else if (e.target.className === "edit-btn") {
      // Edit task if edit button is clicked
      const index = e.target.parentElement.dataset.index; // Get index of task
      inputBox.value = tasks[index].todo; // Populate input box with task
      tasks.splice(index, 1); // Remove task from list
      inputBox.focus(); // Focus back on input box
    }
    saveData(tasks); // Save updated task list
    renderTasks(tasks); // Render updated task list
  },
  false,
);

// Function to save the current task list to local storage
function saveData(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks as JSON string
}

// Function to retrieve tasks from local storage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || []; // Parse JSON string or return empty array
}

// Function to render tasks
function renderTasks(tasks) {
  listContainer.innerHTML = ""; // Clear existing tasks
  tasks.forEach((task, index) => {
    const li = document.createElement("li"); // Create list item
    li.textContent = task.todo; // Set task text
    li.className = task.completed ? "checked" : ""; // Set class based on completion
    li.dataset.index = index; // Store index in dataset

    // Create edit button
    const editBtn = document.createElement("span");
    editBtn.textContent = "\u270e"; // Edit icon '✎'
    editBtn.className = "edit-btn"; // Set class for styling
    li.appendChild(editBtn); // Append edit button to list item

    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7"; // Delete icon 'x'
    deleteBtn.className = "delete-btn"; // Set class for styling
    li.appendChild(deleteBtn); // Append delete button to list item
    listContainer.appendChild(li); // Append list item to container
  });
  updateTaskCount(); // Update task count display
}

// Function to clear data from local storage and reset display
function clearData() {
  localStorage.removeItem("tasks"); // Remove tasks from local storage
  renderTasks([]); // Render empty task list
  emptyInputMsg.innerHTML = ""; // Clear empty input message
  inputBox.focus(); // Focus back on input box
}

// Function to update the task count
function updateTaskCount() {
  const tasks = getTasks(); // Retrieve existing tasks
  const totalTasks = tasks.length; // Get total number of tasks
  const taskNum = totalTasks === 1 ? "task" : "tasks"; // Determine if more than 1 task
  const completedTasks = tasks.filter((task) => task.completed).length; // Count completed tasks
  taskCount.innerHTML = `completed <span class="taskText">${completedTasks}</span> of <span class="taskText">${totalTasks}</span> ${taskNum}`; // Update task count display
}

// Event listener to clear data from local storage
reset.addEventListener("click", clearData);

// Call renderTasks to display tasks on page load
renderTasks(getTasks());

// COPYRIGHT NOTICE
// Dynamically generate copyright information
const copyright = document.getElementById("copy");
copyright.innerHTML =
  "Copyright &copy; " + // Start of the copyright string
  new Date().getFullYear() + // Get the current year
  ` <a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">All Rights Reserved</span>`;

// resources
// https://www.youtube.com/watch?v=G0jO8kUrg-I
// https://www.youtube.com/watch?v=-oP7JK_rXUI
// https://www.youtube.com/watch?v=3OqWCGVaOkA
