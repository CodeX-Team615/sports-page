'use strict';
let username = prompt('What is your name?');
let greeting = document.querySelector ('.greeting');
greeting.textContent = `Hi ${username}!! Welcome to the Sport's Page`;
