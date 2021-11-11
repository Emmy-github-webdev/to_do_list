import ToDoList from '../../to-do-list';

const clearButton = global.document.getElementById('clear');
const taskContainer = global.document.getElementById('tasks');

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
    }
    ToDoList.newArray = newArray;
    Object.defineProperty(window, 'localStorage', {
      value: ToDoList.currentTasks,
    });
    clearButton.classList.remove('clear-active');
    clearButton.classList.add('clear-notActive');

    if (!newArray.length) {
      clearButton.style.display = 'none';
    }
  }
};

const removeOnetask = (id) => {
  if (ToDoList.currentTasks.length) {
    const taskToBeRemoved = global.document.getElementById(id);
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
    }

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

      Object.defineProperty(window, 'localStorage', {
        value: ToDoList.currentTasks,
      });

      return ToDoList.currentTasks;
    }
    ToDoList.newArray = [];
    clearButton.style.display = 'none';
    Object.defineProperty(window, 'localStorage', {
      value: ToDoList.currentTasks,
    });

    return undefined;
  }
  return undefined;
};

export { removeOnetask, removeCompleteTasksFromList };
