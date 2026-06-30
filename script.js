const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const STORAGE_KEY = 'todo-list-app';

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Список пуст';
    todoList.appendChild(empty);
    return;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const left = document.createElement('div');
    left.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;

    const text = document.createElement('span');
    text.className = 'todo-text' + (todo.done ? ' done' : '');
    text.textContent = todo.text;

    checkbox.addEventListener('change', () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    text.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });

    left.appendChild(checkbox);
    left.appendChild(text);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Удалить';

    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(left);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTodo();
});

renderTodos();