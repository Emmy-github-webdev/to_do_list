// select the element

// const clear = document.querySelector('.clear');
// const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Define classes
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// Create variables
const LIST = [];
let id = 0;

// show today's date
// const options = {weekday : "long", month :"short", day :"numeric"};
// const today = new Date();
// dateElement.innerHTML = today.toLocaleDateString("en-us", options);

// Add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) { return; }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : '';
  const item = `
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
  `;

  const position = 'afterEnd';
  list.insertAdjacentHTML(position, item);
}

// add an item to the list when enter key is pressed
document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const toDo = input.value;
    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id,
        done: false,
        trash: false,
      });
      id += 1;
    }
    input.value = '';
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  LIST[element.id].done = !LIST[element.id].done;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener('click', (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'complete') {
    completeToDo(element);
  } else if (elementJob === 'delete') {
    removeToDo(element);
  }
});