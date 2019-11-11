import './index.css';

var letters = {
    'a': [225, 180],
    'b': [270, 180],
    'c': [315, 180],
    'd': [0, 180],
    'e': [180, 45],
    'f': [180, 90],
    'g': [180, 135],
    'h': [270, 225],
    'i': [225, 315],
    'j': [0, 90],
    'k': [225, 0],
    'l': [225, 45],
    'm': [225, 90],
    'n': [225, 135],
    'o': [270, 315],
    'p': [270, 0],
    'q': [270, 45],
    'r': [270, 90],
    's': [270, 135],
    't': [315, 0],
    'u': [315, 45],
    'v': [0, 135],
    'w': [45, 90],
    'x': [45, 135],
    'y': [315, 90],
    'z': [135, 90],
    ' ': [135, 225],
};

var message = '';
var match = /^\?m=([a-z0-9]+)$/i.exec(document.location.search);
if (match) {
    message = atob(match[1]);
    document.getElementById('message-plain').placeholder = 'Reply...';
}
var leftArm = document.getElementById('left-arm');
var rightArm = document.getElementById('right-arm');
var current = document.getElementById('current');
var index = 0;
var timeout;

function setLetter(letter) {
    if (typeof letters[letter] === 'undefined') {
        letter = ' '; // treat unknown chars as spaces
    }
    var angles = letters[letter];
    leftArm.style.transform = 'rotate(' + angles[0] + 'deg)';
    rightArm.style.transform = 'rotate(' + angles[1] + 'deg)';
}

function nextLetter() {
    if (index > message.length) return;
    var char = message[index];
    current.innerText = message.substr(0, index+1);
    setLetter(char.toLowerCase());
    index += 1;
    if (index < message.length) {
        timeout = setTimeout(nextLetter, 1000);
    }
    else {
        timeout = setTimeout(stop, 1000);
    }
}

function stop() {
    clearTimeout(timeout);
    setLetter(' ');
}

function start() {
    index = 0;
    current.innerText = '';
    if (message.length > 0) {
        setLetter(' ');
        timeout = setTimeout(nextLetter, 500);
    }
}

function doSemaphore(e) {
    e.preventDefault();
    stop();
    message = input.value;
    start();
}

var form = document.getElementById('message-form');
form.onsubmit = () => {
    // obfuscate message for shenanigans
    var message = document.getElementById('message-plain').value;
    document.getElementById('message-base64').value = btoa(message);
};

if (message) {
    start();
}