/* eslint-disable import/no-cycle */
import './css/style.css';
import completeToDo from './completed.js';
import addToDo from './addTask.js';
import removeToDo from './removeATask';

// select the element
const clear = document.querySelector('.clear');
const input = document.getElementById('input');
const clearCompletedTask = document.querySelector('.clear-completed-task');
const list = document.getElementById('list');


// variables
/* eslint-disable import/no-mutable-exports */
let LIST = [];
let id = 0;

// get item from localstorage
const data = localStorage.getItem('TODO');

// load items to the user's interface
function loadList(array) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// check if there is data in localstorage
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // check if there is no data in localstorage
  LIST = [];
  id = 0;
}

//clear the localstorage
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
})

// add an item to the list when user click the enter key
document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const toDo = input.value;

    // check if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id,
        done: false,
        trash: false,
      });
      // Add item to localstorage
      localStorage.setItem('TODO', JSON.stringify(LIST));
      id += 1;
    }
    input.value = '';
  }
});

list.addEventListener('click', (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'completed') {
    completeToDo(element);
  }
  else if (elementJob == "delete"){
    removeToDo(element);
    localStorage.clear(element);
  }
    // Update localstorage
    localStorage.setItem('TODO', JSON.stringify(LIST));
});


export { LIST as default };