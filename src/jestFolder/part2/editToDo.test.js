import editTask from './editToDo';
import addTaskToList from '../part1/addTask';

import ToDoList from '../../to-do-list';

describe('Edit tasks', () => {
  beforeEach(() => {
    ToDoList.newArray = [];
    global.document.getElementById('tasks').innerHTML = '';
  });

  test('Add 2 valid tasks and edit the first task description to "TaskDone", checking appropriate saved in ToDoList Array', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    const positionOfTask = 0;
    global.document.getElementById(`edit-task-${positionOfTask}`).value = 'edittedTask';

    editTask(positionOfTask);

    expect(ToDoList.currentTasks[positionOfTask].description).toBe('edittedTask');
  });

  test('Add 1 valid task and edit the task with an empty string, checking validation"', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();

    const positionOfTask = 0;
    global.document.getElementById(`edit-task-${positionOfTask}`).value = '';

    expect(editTask(positionOfTask)).toBeUndefined();
  });

  test('Add 1 valid task and edit the task with an empty string", checking appropriate saved in localStorage and ToDoList Array', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask3';
    addTaskToList();

    const positionOfTask = 2;
    global.document.getElementById(`edit-task-${positionOfTask}`).value = 'newEditedTask3';
    editTask(positionOfTask);

    expect(ToDoList.currentTasks).toBe(window.localStorage);
  });

  test('Add 2 valid task and edit last task with "Item 1", check if the DOM input value was succesfully changed', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    const positionOfTask = 1;
    const inputToEdit = global.document.getElementById(`edit-task-${positionOfTask}`);

    inputToEdit.value = 'Item 1';
    editTask(positionOfTask);

    expect(inputToEdit.value).toBe('Item 1');
  });
});
