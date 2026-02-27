/**
 * Todo module logic
 * Handles adding, toggling, and deleting todos, using StorageService for persistence.
 */

const TODO_STORAGE_KEY = 'todo-list-tasks';

let todos = [];

/**
 * Initialize the todo list
 */
function init() {
    const savedTodos = StorageService.getItem(TODO_STORAGE_KEY);
    if (savedTodos && Array.isArray(savedTodos)) {
        todos = savedTodos;
    }
    renderTodos();
}

/**
 * Render todos to the DOM
 */
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('todo-empty-state');
    
    if (!todoList || !emptyState) return;

    todoList.innerHTML = '';

    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 transition-colors';
            
            const todoContent = `
                <div class="flex items-center gap-3">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                        class="w-5 h-5 text-blue-500 rounded border-gray-300 dark:border-gray-500 focus:ring-blue-500"
                        onchange="toggleTodo(${index})">
                    <span class="${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'} font-medium">
                        ${escapeHTML(todo.text)}
                    </span>
                </div>
                <button onclick="deleteTodo(${index})" class="text-red-400 hover:text-red-600 p-1 transition-colors" title="Eliminar tarea">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;
            
            li.innerHTML = todoContent;
            todoList.appendChild(li);
        });
    }
}

/**
 * Add a new todo
 * @param {string} text 
 */
function addTodo(text) {
    if (!text.trim()) return;
    
    todos.push({
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    saveAndRender();
}

/**
 * Toggle todo completion status
 * @param {number} index 
 */
function toggleTodo(index) {
    if (todos[index]) {
        todos[index].completed = !todos[index].completed;
        saveAndRender();
    }
}

/**
 * Delete a todo
 * @param {number} index 
 */
function deleteTodo(index) {
    if (todos[index]) {
        todos.splice(index, 1);
        saveAndRender();
    }
}

/**
 * Helper to save state and refresh UI
 */
function saveAndRender() {
    StorageService.setItem(TODO_STORAGE_KEY, todos);
    renderTodos();
}

/**
 * Simple HTML escape to prevent XSS
 * @param {string} str 
 */
function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    init();

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = '';
        });
    }
});
