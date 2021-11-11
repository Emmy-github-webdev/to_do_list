import addTaskToList from '../part1/addTask';

import ToDoList from '../../to-do-list';

import taskCompleted from './completed';

describe('Completed tasks from TasksList', () => {
  beforeEach(() => {
    ToDoList.newArray = [];
    global.document.getElementById('tasks').innerHTML = '';
  });

  test('Add 2 valid tasks and change the complete status of the second one to completed(true),toDoList array must have the updated information', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    taskCompleted(0, true);
    expect(ToDoList.currentTasks[0].completed).toBe(true);
  });

  test('Add 1 valid tasks and check if by default the completed task is false', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    expect(ToDoList.currentTasks[0].completed).toBe(false);
  });

  test('Add 2 valid tasks and change the complete status of the second one to completed(true),toDoList array must have the updated information', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask3';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask4';
    addTaskToList();
    taskCompleted(0, true);
    taskCompleted(1, false);
    taskCompleted(2, true);
    taskCompleted(3, false);
    taskCompleted(2, false);

    expect(ToDoList.currentTasks[0].completed).toBe(true);
    expect(ToDoList.currentTasks[1].completed).toBe(false);
    expect(ToDoList.currentTasks[2].completed).toBe(false);
    expect(ToDoList.currentTasks[3].completed).toBe(false);
  });

  test('Add 2 valid tasks and check check if the DOM input value was succesfully changed', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    taskCompleted(1, true);
    const taskSelected = global.document.getElementById(`checkbox-${1}`).checked;

    expect(taskSelected).toBe(true);
  });

  test('Add 3 valid task and change the complete status of the second one to completed(true), checking appropriate saved in localStorage and ToDoList Array', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask3';
    addTaskToList();

    taskCompleted(1, true);

    expect(ToDoList.currentTasks).toBe(window.localStorage);
  });
});
