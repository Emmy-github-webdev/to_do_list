import ToDoList from './to-do-list';
import taskCompleted from './completed';
import editTask from './editToDo';
import removeOnetask from './removeATask';

const clearButton = document.getElementById('clear');
const taskContainer = document.getElementById('tasks');

const removeCompleteTasksFromList = () => {
  const checkCompleted = ToDoList.currentTasks.filter((task) => task.completed === true);

  if (checkCompleted.length) {
    const newArray = ToDoList.currentTasks.filter((task) => task.completed === false);

    taskContainer.innerHTML = '';
    for (let i = 0; i < newArray.length; i += 1) {
      newArray[i].index = i;

      const newTask = `<div class="section" id="${i}">
        <div class="checkbox">
          <input  type="checkbox" id="checkbox-${i}" />
          <input type="text" value="${newArray[i].description}" id="edit-task-${i}" class="new-input" maxlength="30" />
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
    ToDoList.newArray = newArray;
    localStorage.setItem('tasks', JSON.stringify(ToDoList.currentTasks));
    clearButton.classList.remove('clear-active');
    clearButton.classList.add('clear-notActive');

    if (!newArray.length) {
      clearButton.style.display = 'none';
    }
  }
};

export default removeCompleteTasksFromList;