const API_URL = "http://localhost:3000/api/todos";  // <-- CORRECT PORT

function loadTodos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(todos => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      todos.forEach(todo => {
        list.innerHTML += `
          <li class="todo-item">
            <span class="title">${todo.title}</span>
            <span class="description">
              ${todo.description ? "— " + todo.description : ""}
            </span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
          </li>
        `;
      });
    });
}

function addTodo() {
  const titleInput = document.getElementById("todoInput");
  const descInput = document.getElementById("todoDescription");

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title) return;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  }).then(() => {
    titleInput.value = "";
    descInput.value = "";
    loadTodos();
  });
}

function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(loadTodos);
}

loadTodos();
