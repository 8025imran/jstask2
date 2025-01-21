function addTask() {
    const task = document.getElementById('task');
    const taskList = document.getElementById('taskList');

    if (task.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = task.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            taskList.removeChild(li);
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);

        task.value = '';
    }
}