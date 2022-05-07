import addTaskToList from './addTask';
import ToDoList from '../../to-do-list';

describe('Add tasks to TasksList', () => {
  beforeEach(() => {
    ToDoList.newArray = [];
    global.document.getElementById('tasks').innerHTML = '';
  });

  test('Add one new task from input (length > 0)', () => {
    global.document.getElementById('addNewInput').value = '555';
    expect(addTaskToList()).toBe('555');
  });

  test('Adding a empty input === undefined', () => {
    global.document.getElementById('addNewInput').value = '';
    expect(addTaskToList()).toBe(undefined);
  });

  test('Adding 2 valid tasks from input and one invalid task (length <= 0), saved toDoList array length === 2', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = '';
    addTaskToList();

    expect(ToDoList.currentTasks.length).toBe(2);
  });

  test('Added 3 valid tasks from input and one invalid task (length <= 0), localStorage length === 3, also toDoList saved array should be equal to localStorage saved array.', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask3';
    addTaskToList();
    global.document.getElementById('addNewInput').value = '';
    addTaskToList();

    expect(ToDoList.currentTasks).toBe(window.localStorage);
    expect(ToDoList.currentTasks.length).toBe(3);
  });

  test('Added 3 valid tasks and 3 invalid tasks (length <= 0), check the DOM for only 3 tasks elements (each task element starts with the class="section")', () => {
    global.document.getElementById('addNewInput').value = 'newTask1';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask2';
    addTaskToList();
    global.document.getElementById('addNewInput').value = '';
    addTaskToList();
    global.document.getElementById('addNewInput').value = 'newTask4';
    addTaskToList();
    global.document.getElementById('addNewInput').value = '';
    addTaskToList();
    global.document.getElementById('addNewInput').value = '';
    addTaskToList();

    const taskContainer = global.document.getElementById('tasks');
    const taskCounter = taskContainer.getElementsByClassName('section');

    // Add 3 valid tasks
    expect(ToDoList.currentTasks.length).toBe(taskCounter.length);
    expect(window.localStorage.length).toBe(taskCounter.length);

    expect(ToDoList.currentTasks.length).toBe(3);
    expect(window.localStorage.length).toBe(3);
  });
});
