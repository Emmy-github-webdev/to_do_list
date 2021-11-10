const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><div class="card">
<div class="section">
  <h1 class="title">Today's To Do</h1>
  <ion-icon name="refresh-outline" class="icon"></ion-icon>
</div>

<div class="section">
<input class="new-input" id="addNewInput" placeholder="Add to your list..."/>
<ion-icon name="add-outline" id="addNewIcon" class="icon"></ion-icon>
</div>

<div id="tasks">
  
</div>

<div class="clear-notActive" id="clear">
  <span>Clear all completed</span>
</div>

</div>`);

global.document = dom.window.document;
global.window = dom.window;