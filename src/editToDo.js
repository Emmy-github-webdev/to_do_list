import ToDoList from './to-do-list';

const submitEditTask = (id) => {
  const inputToSave = document.getElementById(`edit-task-${id}`);
  const taskContainer = document.getElementById(id);
  const taskEditButton = document.getElementById(`edit-${id}`);
  const taskDeleteButton = document.getElementById(`remove-this-${id}`);

  const newTask = inputToSave.value;

  taskContainer.style.backgroundColor = 'white';
  inputToSave.style.backgroundColor = 'white';

  taskEditButton.classList.remove('displayNotActive');
  taskEditButton.classList.add('displayActive');

  taskDeleteButton.classList.remove('displayActive');
  taskDeleteButton.classList.add('displayNotActive');

  const updatedTasks = ToDoList.currentTasks;
  updatedTasks[id].description = newTask;

  ToDoList.newArray = updatedTasks;

  localStorage.setItem('tasks', JSON.stringify(ToDoList.currentTasks));
};

const cleanSelectedTasks = () => {
  const taskToClean = ToDoList.currentTasks;
  for (let i = 0; i < taskToClean.length; i += 1) {
    const taskContainer = document.getElementById(taskToClean[i].index);
    const taskInput = document.getElementById(
      `edit-task-${taskToClean[i].index}`,
    );
    const taskEditButton = document.getElementById(
      `edit-${taskToClean[i].index}`,
    );
    const taskDeleteButton = document.getElementById(
      `remove-this-${taskToClean[i].index}`,
    );

    taskContainer.style.backgroundColor = 'white';
    taskInput.style.backgroundColor = 'white';

    taskEditButton.classList.add('displayActive');
    taskEditButton.classList.remove('displayNotActive');

    taskDeleteButton.classList.add('displayNotActive');
    taskDeleteButton.classList.remove('displayActive');
  }
};

const editTask = (id) => {
  cleanSelectedTasks();
  const taskContainerToEdit = document.getElementById(id);
  const taskInputToEdit = document.getElementById(`edit-task-${id}`);
  const taskEditButton = document.getElementById(`edit-${id}`);
  const taskDeleteButton = document.getElementById(`remove-this-${id}`);

  taskContainerToEdit.style.backgroundColor = '#fffec8';

  taskEditButton.classList.remove('displayActive');
  taskEditButton.classList.add('displayNotActive');

  taskDeleteButton.classList.remove('displayNotActive');
  taskDeleteButton.classList.add('displayActive');

  taskInputToEdit.style.backgroundColor = '#fffec8';

  taskInputToEdit.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      submitEditTask(id);
    }
  });
};

export default editTask;
