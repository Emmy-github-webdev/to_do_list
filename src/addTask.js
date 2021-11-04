/* eslint-disable import/no-cycle */
import './css/style.css';
const list = document.getElementById('list');

// classes names
const UNCHECK = 'fa-circle-thin';
const CHECK = 'fa-check-circle';
const LINE_THROUGH = 'lineThrough';

// add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : '';
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

export default addToDo;