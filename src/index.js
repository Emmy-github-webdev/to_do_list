/* eslint-disable import/no-cycle */
import './css/style.css';
import completeToDo from './completed';

// select the element
const list = document.getElementById('list');
const input = document.getElementById('input');

//classes names
const UNCHECK = 'fa-circle-thin';
const CHECK = 'fa-check-circle';
const LINE_THROUGH = 'lineThrough';

//variables
let LIST = [], id = 0;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if there is data in localstorage
if(data){
  LIST = JSON.parse(data);
  id = LIST.length; //set the id to the last one in the list
  loadList(LIST); //load the list to the user interface
}else {
  //check if there is no data in localstorage
  LIST = [];
  id = 0;
}

//load items to the user's interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//add to do function

function addToDo(toDo, id, done, trash) {

  if(trash){ return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `
          <li class="item">
            <i class="fa ${DONE} co" job="completed" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
          </li>
        `;
  const position = 'beforeEnd';
  list.insertAdjacentHTML(position, item);
}

//add an item to the list when user click the enter key
document.addEventListener('keyup', function(event) {
  if(event.keyCode == 13) {
    const toDo = input.value;

    //check if the input isn't empty
    if(toDo){
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      //Add item to localstorage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

list.addEventListener("click", function(event){
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if(elementJob == "completed"){
    completeToDo(element);
  } 
  // else if (elementJob == "delete"){
  //   removeToDo(element);
  //   localStorage.clear(element);
  // }
  //Update localstorage
localStorage.setItem("TODO", JSON.stringify(LIST));
});

export {LIST};