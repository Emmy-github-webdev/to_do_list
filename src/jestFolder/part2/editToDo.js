import ToDoList from '../../to-do-list';

const submitEditTask = (id) => {
  const inputToSave = global.document.getElementById(`edit-task-${id}`);

  const newTask = inputToSave.value;

  if (newTask.length) {
    const updatedTasks = ToDoList.currentTasks;
    updatedTasks[id].description = newTask;

    ToDoList.newArray = updatedTasks;

    Object.defineProperty(window, 'localStorage', {
      value: ToDoList.currentTasks,
    });
  }

  return undefined;
};

export default submitEditTask;
