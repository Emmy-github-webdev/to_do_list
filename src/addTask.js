import ToDoList from './to-do-list';
import taskCompleted from './completed';
import editTask from './editToDo';
import removeOnetask from './removeATask';

const input = document.getElementById('addNewInput');
const taskContainer = document.getElementById('tasks');
const clearButton = document.getElementById('clear');

const maxIdValue = (ToDoList) => {
  const ids = ToDoList.map((task) => task.index);
  const sorted = ids.sort((a, b) => a - b);
  return sorted[sorted.length - 1] + 1;
};

const addTaskToList = () => {
  const validation = input.classList;
  let id;
  if (ToDoList.currentTasks.length) {
    id = maxIdValue(ToDoList.currentTasks);
  } else {
    id = 0;
  }

  if (input.value.length) {
    validation.remove('errorInput');
    validation.add('new-input');

    const newTask = `<div class="section" id="${id}">
        <div class="checkbox">
          <input  type="checkbox" id="checkbox-${id}" />
          <input type="text" value="${input.value}" id="edit-task-${id}" class="new-input" maxlength="30" />
          </div>
          <ion-icon name="ellipsis-vertical-outline" class="icon" id="edit-${id}"></ion-icon>

        <ion-icon name="trash-outline" class="icon displayNotActive" id="remove-this-${id}"></ion-icon>

      </div>`;

    taskContainer.insertAdjacentHTML('beforeend', newTask);

    const checkbox = document.getElementById(`checkbox-${id}`);
    checkbox.addEventListener('change', function listener() {
      taskCompleted(id, this.checked);
    });

    const editTaskIcon = document.getElementById(`edit-task-${id}`);
    editTaskIcon.addEventListener('click', function edit() {
      editTask(id, this.click);
    });

    const removeOne = document.getElementById(`remove-this-${id}`);
    removeOne.addEventListener('click', function removeOne() {
      removeOnetask(id, this.click);
    });

    ToDoList.updateTasks = {
      index: id,
      description: input.value,
      completed: false,
    };

    localStorage.setItem('tasks', JSON.stringify(ToDoList.currentTasks));

    input.value = '';
    clearButton.style.display = 'flex';
  } else {
    validation.remove('new-input');
    validation.add('errorInput');
  }
};

export default addTaskToList;