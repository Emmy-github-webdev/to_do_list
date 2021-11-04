import ToDoList from './to-do-list';

const clearButton = document.getElementById('clear');

const taskCompleted = (id, checked) => {
  const taskSelected = document.getElementById(`edit-task-${id}`);
  const tasks = ToDoList.currentTasks;
  const newArrayOfTasks = [];

  if (checked) {
    taskSelected.style.textDecoration = 'line-through';
    taskSelected.style.color = 'gray';

    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].index === id) {
        tasks[i].completed = true;
        newArrayOfTasks.push(tasks[i]);
      } else {
        newArrayOfTasks.push(tasks[i]);
      }
    }
    ToDoList.newArray = newArrayOfTasks;
  } else {
    taskSelected.style.textDecoration = 'none';
    taskSelected.style.color = 'black';
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].index === id) {
        tasks[i].completed = false;
        newArrayOfTasks.push(tasks[i]);
      } else {
        newArrayOfTasks.push(tasks[i]);
      }
    }
    ToDoList.newArray = newArrayOfTasks;
  }
  localStorage.setItem('tasks', JSON.stringify(ToDoList.currentTasks));

  const checkCompleted = ToDoList.currentTasks.filter((task) => task.completed === true);

  if (checkCompleted.length) {
    clearButton.classList.remove('clear-notActive');
    clearButton.classList.add('clear-active');
  } else {
    clearButton.classList.remove('clear-active');
    clearButton.classList.add('clear-notActive');
  }
};

export default taskCompleted;