import ToDoList from './to-do-list';
import taskCompleted from './completed';
import editTask from './editToDo';

const clearButton = document.getElementById('clear');
const taskContainer = document.getElementById('tasks');

const removeOnetask = (id) => {
  const taskToBeRemoved = document.getElementById(id);
  taskToBeRemoved.remove();
  const newTasks = ToDoList.currentTasks.filter((task) => task.index !== id);

  taskContainer.innerHTML = '';
  for (let i = 0; i < newTasks.length; i += 1) {
    newTasks[i].index = i;

    const newTask = `<div id="${i}" class="section">
      <div class="checkbox">
        <input type="checkbox" ${newTasks[i].completed ? 'checked' : ''} id="checkbox-${i}"/>
        <input type="text" value="${newTasks[i].description}" id="edit-task-${i}" ${newTasks[i].completed ? "style='text-decoration: line-through; color: gray'" : ''} class="new-input" maxlength="30" />
      </div>
      <ion-icon name="ellipsis-vertical-outline" class="icon" id="edit-${i}"></ion-icon>

        <ion-icon name="trash-outline" class="icon displayNotActive" id="remove-this-${i}"></ion-icon>
    </div>`;

    taskContainer.insertAdjacentHTML('beforeend', newTask);

    const checkbox = document.getElementById(`checkbox-${i}`);
    checkbox.addEventListener('change', function listener() {
      taskCompleted(i, this.checked);
    });

    const editTaskIcon = document.getElementById(`edit-task-${i}`);
    editTaskIcon.addEventListener('click', function edit() {
      editTask(i, this.click);
    });

    const removeOne = document.getElementById(`remove-this-${i}`);
    removeOne.addEventListener('click', function removeOne() {
      removeOnetask(i, this.click);
    });
  }

  localStorage.setItem('tasks', JSON.stringify(ToDoList.currentTasks));

  if (newTasks.length) {
    ToDoList.newArray = newTasks;
    const checkCompletedTasks = newTasks.filter((task) => task.completed === true);
    if (checkCompletedTasks.length) {
      clearButton.classList.remove('clear-notactive');
      clearButton.classList.add('clear-Active');
    } else {
      clearButton.classList.remove('clear-active');
      clearButton.classList.add('clear-notActive');
    }
  } else {
    ToDoList.newArray = [];
    clearButton.style.display = 'none';
  }
  localStorage.setItem('tasks', JSON.stringify(ToDoList.currentTasks));
};

export default removeOnetask;