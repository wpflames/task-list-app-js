// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');

        // Add class
        li.className = 'collection-item';

        // Create textnode and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');

        // Add class
        link.className = 'delete-item secondary-content';

        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to the li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e){
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon HTML
    //link.innerHTML = '<svg height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to the li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInlocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInlocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            // Remove from the DOM
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){ 
    console.log(taskItem);

    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task ){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTasks(e){
    //taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();

}

// Clear from Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });
}