import ToDoList from '../../to-do-list';
import addTaskToList from '../part1/addTask';
import { removeOnetask, removeCompleteTasksFromList } from './delete';

describe('Remove only one element when call to function removeOnetask', () => {
  beforeEach(() => {
    ToDoList.newArray = [];
    global.document.getElementById('tasks').innerHTML = '';
  });

  test('Add 2 valid tasks and 1 invalid (length > 0), and then remove the second task. removeOneTask must return the ToDoList Array and it has to be equal to localStorage ', () => {
    global.document.getElementById('addNewInput').value = 'NewTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = '';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'NewTask2';
    addTaskToList();

    expect(removeOnetask(1)).toBe(window.localStorage);
  });

  test('Remove one task when toDoList array length is 0 return undefined', () => {
    expect(removeOnetask(1)).toBe(undefined);
  });

  test('Added 3 valid tasks, remove 1. Check the DOM for only two tasks painted in the DOM (each task element starts with the class="section")', () => {
    global.document.getElementById('addNewInput').value = 'NewTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'NewTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'NewTask3';
    addTaskToList();

    removeOnetask(1);

    const taskContainer = global.document.getElementById('tasks');
    const taskCounter = taskContainer.getElementsByClassName('section');

    expect(taskCounter.length).toEqual(2);
  });
});

describe('Remove all completed tasks when call to function removeCompleteTasksFromList', () => {
  beforeEach(() => {
    ToDoList.newArray = [];
    global.document.getElementById('tasks').innerHTML = '';
  });

  test('Add 4 valid tasks, then set last 2 to completed === true, and delete all completed, toDoArray and localStorage length should be 2', () => {
    global.document.getElementById("addNewInput").value = "NewTask1";
    addTaskToList();
    global.document.getElementById("addNewInput").value = 'NewTask2';
    addTaskToList();
    global.document.getElementById("addNewInput").value = 'NewTask3';
    addTaskToList();
    global.document.getElementById("addNewInput").value = 'NewTask4';
    addTaskToList();

    const toDoArray = ToDoList.currentTasks;
    toDoArray[0].completed = false;
    toDoArray[1].completed = true;
    toDoArray[2].completed = true;

    removeCompleteTasksFromList();

    expect(ToDoList.currentTasks.length).toEqual(2);
    expect(window.localStorage.length).toEqual(2);
  });

  test('Add 3 valid tasks, then set first 2 to completed === true, and delete all completed, Check the DOM for only two tasks painted in the DOM (each task element starts with the class="section")', () => {
    global.document.getElementById('addNewInput').value = 'NewTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'NewTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'NewTask3';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'NewTask3';
    addTaskToList();

    const toDoArray = ToDoList.currentTasks;
    toDoArray[0].completed = true;
    toDoArray[1].completed = true;

    removeCompleteTasksFromList();

    const taskContainer = global.document.getElementById('tasks');
    const taskCounter = taskContainer.getElementsByClassName('section');

    expect(taskCounter.length).toEqual(2);
  });

  test('Add 1 valid tasks, then check if it is defined, Check the DOM for only one tasks printed in the DOM (each task element starts with the class="section")', () => {
    global.document.getElementById('addNewInput').value = 'NewTask1';
    addTaskToList();
    
    const toDoArray = ToDoList.currentTasks;
    
    removeCompleteTasksFromList();

    const taskContainer = global.document.getElementById('tasks');
    const taskCounter = taskContainer.getElementsByClassName('section');

    expect(taskCounter.length).not.toBeUndefined();
  });

  test('Remove all completed when toDoList array length is 0 return undefined', () => {
    expect(removeCompleteTasksFromList()).toBeUndefined;
  });
});
