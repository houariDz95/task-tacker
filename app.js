// Retrieve DOM elements
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('add-task-form');

// Array to store tasks
let tasks = []
const storedTasks = localStorage.getItem('tasks');
tasks = storedTasks ? JSON.parse(storedTasks) : [];

// Function to render the task list
function renderTaskList() {
  // Clear existing task list
  taskList.innerHTML = '';

  // Render each task item
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskItem.innerHTML = `
      <span>${task.title}</span>
      <p>${task.description}</p>
      <p>Due Date: ${task.dueDate}</p>
      <div>
        <input type="checkbox" id="checkbox-${index}" ${task.completed ? 'checked' : ''}>
        <label for="checkbox-${index}">Completed</label>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

// Function to add a new task
function addTask(event) {
  event.preventDefault();

  // Retrieve form values
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const dueDate = document.getElementById('task-due-date').value;

  // Create new task object
  const newTask = {
    title,
    description,
    dueDate,
    completed: false
  };

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Save tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Render the updated task list
  renderTaskList();

  // Reset the form fields
  taskForm.reset();
}

// Function to toggle task completion
function toggleTaskCompletion(event) {
  const checkbox = event.target;
  const index = checkbox.id.split('-')[1];
  tasks[index].completed = checkbox.checked;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Function to delete a task
function deleteTask(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTaskList();
  }
}
// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('change', toggleTaskCompletion);
taskList.addEventListener('click', deleteTask);

// Initial render
renderTaskList();

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', (event) => {
  const color = event.target.value;
  document.documentElement.style.setProperty('--task-color', color);
});