/* eslint-disable */
import letters from './letters';

const leftArm = document.getElementById('left-arm');
const rightArm = document.getElementById('right-arm');
const current = document.getElementById('current');
const form = document.getElementById('message-form');

/*
also needs to be set in index.css
search for 'Ref: transition delay'
*/
const transitionDelay = 500;
const letterHold = 500;
const spaceLength = 500;
const doubleLength = 0;

const queue = [];
const index = 0;
let timeout;

function setLetter(letter) {
  if (typeof letters[letter] === 'undefined') {
    letter = ' '; // treat unknown chars as spaces
  }
  const angles = letters[letter];
  leftArm.style.transform = `rotate(${angles[0]}deg)`;
  rightArm.style.transform = `rotate(${angles[1]}deg)`;
}

function nextLetter() {
  if (!queue.length) return;
  const char = queue.shift();
  let delay = transitionDelay + letterHold;
  switch (char) {
    case 'start':
      setLetter(' ');
      delay = transitionDelay;
      break;
    case 'end':
      setLetter(' ');
      break;
    case 'double':
      setLetter(' ');
      delay = transitionDelay + doubleLength;
      break;
    case 'numerals':
      setLetter('numerals');
      break;
    case 'alpha':
      setLetter('j');
      break;
    case ' ':
      delay = transitionDelay + spaceLength;
      current.innerHTML += '&nbsp;';
      setLetter('space');
      break;
    default:
      current.innerText += char;
      setLetter(char.toLowerCase());
  }

  if (char !== 'end') {
    timeout = setTimeout(nextLetter, delay);
  }
}

function start(message) {
  // generate a queue from the message
  let lastChar = null;
  let isNumerals = false;
  queue.push('start');
  for (let c = 0; c < message.length; c += 1) {
    const char = message[c].toLowerCase();
    if (typeof letters[char] === 'undefined') continue;
    if (char === lastChar) queue.push('double');
    lastChar = char;
    if (/^\d$/.test(char)) {
      if (!isNumerals) queue.push('numerals');
      isNumerals = true;
      queue.push(char);
    } else {
      if (isNumerals) queue.push('alpha');
      isNumerals = false;
      queue.push(char);
    }
  }
  queue.push('end');

  // process queue
  nextLetter();
}

form.onsubmit = () => {
  // obfuscate message for shenanigans
  const message = document.getElementById('message-plain').value;
  document.getElementById('message-base64').value = btoa(message);
};

/* Kickoff */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('m')) {
  let message = urlParams.get('m');
  message = atob(message);
  start(message);
}
