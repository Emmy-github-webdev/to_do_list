/* eslint-disable import/no-cycle */
import './css/style.css';
import LIST from './index.js';

//remove to do

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
};

export default removeToDo;