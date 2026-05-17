// Select Elements
let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");

// Array to store todos
let todos = [];

// ===============================
// Load Todos From localStorage
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    let storedTodos = localStorage.getItem("todos");

    // Check if data exists
    if(storedTodos){

        // Convert JSON string into array
        todos = JSON.parse(storedTodos);

        // Show todos on screen
        displayTodos();
    }
});

// ===============================
// Add Todo
// ===============================

addBtn.addEventListener("click", () => {

    let task = todoInput.value.trim();

    // Prevent empty input
    if(task === ""){
        alert("Please enter a task");
        return;
    }

    // Create Todo Object
    let todoObj = {
        id: Date.now(),
        text: task
    };

    // Add into array
    todos.push(todoObj);

    // Save into localStorage
    saveTodos();

    // Show updated todos
    displayTodos();

    // Clear input field
    todoInput.value = "";
});

// ===============================
// Display Todos
// ===============================

function displayTodos(){

    // Clear previous todos
    todoList.innerHTML = "";

    // Loop through array
    todos.forEach((todo) => {

        // Create LI
        let li = document.createElement("li");

        li.classList.add("todo-item");

        // Add HTML inside LI
        li.innerHTML = `
        
            <span class="task-text">
                ${todo.text}
            </span>

            <div class="buttons">

                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    Delete
                </button>

            </div>
        `;

        // Append into UL
        todoList.appendChild(li);
    });
}

// ===============================
// Delete Todo
// ===============================

function deleteTodo(id){

    // Remove matching todo
    todos = todos.filter((todo) => {
        return todo.id !== id;
    });

    // Save updated array
    saveTodos();

    // Refresh UI
    displayTodos();
}

// ===============================
// Save Todos in localStorage
// ===============================

function saveTodos(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}