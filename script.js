document.addEventListener('DOMContentLoaded', function() {
    const AddTask = document.getElementById('add-task');
    const openAddTask = document.getElementById('add-task-sidebar');
    const taskForm = document.querySelector('.task-form');
    const taskList = document.querySelector('.task-list');
    const completedTaskCount = document.getElementById('completed-task-count');
    const pendingTaskCount = document.getElementById('pending-task-count');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const filterSelect = document.getElementById('filter');
    const searchInput = document.querySelector('.search-box');
    const searchButton = document.querySelector('.search-btn');

    let completedTasks = 0;
    let pendingTasks = 0;
    let currentTask = null; 

    function updateTaskCounts() {
        completedTasks = 0;
        pendingTasks = 0;

        taskList.querySelectorAll('.task').forEach(task => {
            const checkbox = task.querySelector('.task-check');
            if (checkbox.checked) {
                completedTasks++;
            } else {
                pendingTasks++;
            }
        });

        completedTaskCount.textContent = completedTasks;
        pendingTaskCount.textContent = pendingTasks;
    }

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const taskTitle = document.getElementById('task-title').value;
        const taskDeadline = document.getElementById('task-deadline').value;
        const taskPriority = document.getElementById('task-priority').value;
        const taskCategory = document.getElementById('task-category').value;
        const taskDescription = document.getElementById('task-desc').value;

        if (currentTask) {
          
            currentTask.querySelector('.task-title').textContent = taskTitle;
            currentTask.querySelector('.task-deadline').textContent = taskDeadline;
            currentTask.querySelector('.task-priority').textContent = taskPriority;
            currentTask.querySelector('.task-category').textContent = taskCategory;
            currentTask.querySelector('.task-description').textContent = taskDescription;

            currentTask = null; 
            AddTask.style.display = 'none'; 
            formSubmitBtn.textContent = 'Add Task'; 
            taskForm.reset();
        } else {
          
            const task = document.createElement('div');
            task.className = 'task';
            task.innerHTML = `
                <div class="task-details">
                    <input type="checkbox" class="task-check">
                    <h3 class="task-title">${taskTitle}</h3>
                    <span class="task-deadline">${taskDeadline}</span> |
                    <span class="task-priority">${taskPriority}</span> |
                    <span class="task-category">${taskCategory}</span>
                    <p class="task-description">${taskDescription}</p>
                </div>
                <div class="task-action-btn">
                    <button class="view-btn">View</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(task);
        }

        taskForm.reset();
        AddTask.style.display = 'none'; 
        updateTaskCounts();
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
           
            const taskElement = e.target.closest('.task');

            
            const title = taskElement.querySelector('.task-title').textContent;
            const deadline = taskElement.querySelector('.task-deadline').textContent;
            const priority = taskElement.querySelector('.task-priority').textContent.toLowerCase();
            const category = taskElement.querySelector('.task-category').textContent.toLowerCase();
            const description = taskElement.querySelector('.task-description').textContent;

           
            document.getElementById('task-title').value = title;
            document.getElementById('task-deadline').value = deadline; // Ensure format is YYYY-MM-DD
            document.getElementById('task-priority').value = priority;
            document.getElementById('task-category').value = category;
            document.getElementById('task-desc').value = description;

       
            AddTask.style.display = 'block';


            currentTask = taskElement;
        }

        if (e.target.classList.contains('delete-btn')) {
          
            const taskElement = e.target.closest('.task');
            taskList.removeChild(taskElement);
            updateTaskCounts();
        }

        if (e.target.classList.contains('task-check')) {
          
            updateTaskCounts();
        }

        if (e.target.classList.contains('view-btn')) {
            const taskElement = e.target.closest('.task');
            const title = taskElement.querySelector('.task-title').textContent;
            const deadline = taskElement.querySelector('.task-deadline').textContent;
            const priority = taskElement.querySelector('.task-priority').textContent;
            const category = taskElement.querySelector('.task-category').textContent;
            const description = taskElement.querySelector('.task-description').textContent;

          
            const taskInfo = `Task Title: ${title}\nDeadline: ${deadline}\nPriority: ${priority}\nCategory: ${category}\nDescription: ${description}`;
            
            
            alert(taskInfo);
        }
    });

    if (openAddTask) {
        openAddTask.addEventListener('click', function(event) {
            event.preventDefault();
           
            if (AddTask.style.display === 'none' || AddTask.style.display === '') {
                AddTask.style.display = 'block'; 
            } else {
                AddTask.style.display = 'none'; 
            }
        });
    } else {
        console.error('Element(s) not found.');
    }



filterSelect.addEventListener('change', function() {
    const filterValue = filterSelect.value.toLowerCase();

    taskList.querySelectorAll('.task').forEach(task => {
        const taskPriority = task.querySelector('.task-priority').textContent.toLowerCase();
        const taskCategory = task.querySelector('.task-category').textContent.toLowerCase();

        if (filterValue === 'all' || filterValue === taskPriority || filterValue === taskCategory) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
});

searchInput.addEventListener('input', searchTasks);


searchButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    searchTasks();
});



function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const tasks = taskList.querySelectorAll('.task');

    tasks.forEach(task => {
        const taskTitle = task.querySelector('.task-title').textContent.toLowerCase();
        const taskDescription = task.querySelector('.task-description').textContent.toLowerCase();

 
        if (taskTitle.includes(searchText) || taskDescription.includes(searchText)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none'; 
        }
    });
}


});
