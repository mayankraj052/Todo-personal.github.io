// Initialize the todo list
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to render the todos
function renderTodos() {
  const todosContainer = document.getElementById("todos");
  todosContainer.innerHTML = "";

  if (todos.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No todos yet!";
    todosContainer.appendChild(emptyState);
  } else {
    todos.forEach((todo) => {
      const todoRow = document.createElement("div");
      todoRow.innerHTML = `
        <span>${todo.task}</span>
        <button onclick="deleteTodo('${todo.id}')">Delete</button>
      `;
      todosContainer.appendChild(todoRow);
    });
  }
}

// Function to add a new todo
function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const task = todoInput.value.trim();

  if (task) {
    const newTodo = {
      id: generateUniqueId(),
      task: task,
    };

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    renderTodos();
  } else {
    alert("Task cannot be empty."); // Error check for empty input
  }
}

// Function to delete a specific todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Function to delete all todos
function deleteAllTodos() {
    if(todos.length === 0) {
        alert("Nothing to delete. the List is already empty.");
        return;
    }
  if (confirm("Are you sure you want to delete all todos?")) {
    todos = []; // Clear the todos array
    localStorage.removeItem("todos"); // Remove from local storage
    renderTodos(); // Re-render the todos
  }
}

// Function to generate a unique ID
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Load todos on page load
window.onload = function () {
  renderTodos();
};
