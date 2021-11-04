/* eslint-disable import/no-cycle */
import './css/style.css';
import taskCompleted from './completed';
import addTaskToList from './addTask';
import ToDoList from './to-do-list';
import removeCompleteTasksFromList from './removeCompletedTask';
import editTask from './editToDo';
import removeOnetask from './removeATask';

const input = document.getElementById('addNewInput');
const icon = document.getElementById('addNewIcon');
const taskContainer = document.getElementById('tasks');
const clearButton = document.getElementById('clear');
const clearAllTask = document.querySelector('.clear-all-task');

window.onload = () => {
  let readyToClear = false;
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTaskToList();
    }
  });

  icon.addEventListener('click', addTaskToList);

  clearButton.addEventListener('click', removeCompleteTasksFromList);

  const savedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (savedTasks && savedTasks.length) {
    clearButton.style.display = 'flex';

    ToDoList.newArray = savedTasks;
    for (let i = 0; i < savedTasks.length; i += 1) {
      const newTask = `<div class="section" id="${savedTasks[i].index}">
        <div class="checkbox">
          <input  ${savedTasks[i].completed ? 'checked' : ''} type="checkbox" id="checkbox-${savedTasks[i].index}" />
          <input type="text" value="${savedTasks[i].description}" id="edit-task-${savedTasks[i].index}" ${savedTasks[i].completed ? "style='text-decoration: line-through; color: gray'" : ''} class="new-input" maxlength="30" />
          </div>
          <ion-icon name="ellipsis-vertical-outline" class="icon" id="edit-${savedTasks[i].index}"></ion-icon>

        <ion-icon name="trash-outline" class="icon displayNotActive" id="remove-this-${savedTasks[i].index}"></ion-icon>

      </div>`;

      taskContainer.insertAdjacentHTML('beforeend', newTask);

      const checkbox = document.getElementById(`checkbox-${savedTasks[i].index}`);
      checkbox.addEventListener('change', function listener() {
        taskCompleted(savedTasks[i].index, this.checked);
      });

      const editTaskIcon = document.getElementById(`edit-task-${savedTasks[i].index}`);
      editTaskIcon.addEventListener('click', function edit() {
        editTask(savedTasks[i].index, this.click);
      });

      const removeOne = document.getElementById(`remove-this-${savedTasks[i].index}`);
      removeOne.addEventListener('click', function removeOne() {
        removeOnetask(savedTasks[i].index, this.click);
      });

      if (savedTasks[i].completed) {
        readyToClear = true;
      }
    }
    if (readyToClear) {
      clearButton.classList.remove('clear-notActive');
      clearButton.classList.add('clear-active');
    }
  }
};

// clear localstorage
clearAllTask.addEventListener('click', () => {
  localStorage.clear();
});
