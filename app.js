// Ambil elemen dari DOM
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const allFilter = document.getElementById('all-filter');
const completedFilter = document.getElementById('completed-filter');
const incompleteFilter = document.getElementById('incomplete-filter');

// Fungsi untuk memuat tugas dari local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
}

// Fungsi untuk menyimpan tugas ke local storage
function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        todos.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi untuk menambah tugas ke DOM
function addTodoToDOM(todo) {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');
    
    const taskText = document.createElement('span');
    taskText.textContent = todo.text;
    taskText.classList.add('task-text');
    taskText.onclick = function() {
        li.classList.toggle('completed');
        saveTodos();
    };
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        todoList.removeChild(li);
        saveTodos();
    };
    
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

// Fungsi untuk menambah tugas
function addTodo() {
    const task = todoInput.value.trim();
    if (task !== '') {
        const todo = { text: task, completed: false };
        addTodoToDOM(todo);
        saveTodos();
        todoInput.value = '';
    }
}

// Fungsi untuk memfilter tugas
function filterTodos(filter) {
    document.querySelectorAll('#todo-list li').forEach(li => {
        switch(filter) {
            case 'all':
                li.style.display = '';
                break;
            case 'completed':
                li.style.display = li.classList.contains('completed') ? '' : 'none';
                break;
            case 'incomplete':
                li.style.display = li.classList.contains('completed') ? 'none' : '';
                break;
        }
    });
}

// Tambahkan event listener ke tombol 'Add'
addButton.addEventListener('click', addTodo);

// Tambahkan event listener untuk input field agar dapat menambahkan tugas dengan menekan Enter
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Tambahkan event listener ke tombol filter
allFilter.addEventListener('click', () => filterTodos('all'));
completedFilter.addEventListener('click', () => filterTodos('completed'));
incompleteFilter.addEventListener('click', () => filterTodos('incomplete'));

// Muat tugas dari local storage saat halaman dimuat
window.onload = loadTodos;
