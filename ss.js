
    button.addEventListener('click', function() {
        // Find the parent task element
        const taskElement = this.closest('.task');
        
        // Extract data from the task element
        const title = taskElement.querySelector('.task-title').textContent;
        const deadline = taskElement.querySelector('.task-deadline').textContent;
        const priority = taskElement.querySelector('.task-priority').textContent;
        const category = taskElement.querySelector('.task-category').textContent;
        const description = taskElement.querySelector('.task-description').textContent;
        
        // Populate the form with task data
        document.getElementById('task-title').value = title;
        document.getElementById('task-deadline').value = deadline;
        document.getElementById('task-priority').value = priority.toLowerCase();
        document.getElementById('task-category').value = category.toLowerCase();
        document.getElementById('task-desc').value = description;

        // Show the form
        AddTask.style.display = 'block';
    });




