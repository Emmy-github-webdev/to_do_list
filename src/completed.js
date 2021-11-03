/* eslint-disable import/no-cycle */
import './css/style.css';
import {LIST} from './index';

const clear = document.querySelector('.clear');


//classes names
const UNCHECK = 'fa-circle-thin';
const CHECK = 'fa-check-circle';
const LINE_THROUGH = 'lineThrough';

//complete to do
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

export default completeToDo;