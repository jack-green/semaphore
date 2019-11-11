import './index.css';

const letters = {
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

const leftArm = document.getElementById('left-arm');
const rightArm = document.getElementById('right-arm');
const current = document.getElementById('current');
const form = document.getElementById('message-form');
let message = '';
let index = 0;
let timeout;

function setLetter(letter) {
    if (typeof letters[letter] === 'undefined') {
        letter = ' '; // treat unknown chars as spaces
    }
    const angles = letters[letter];
    leftArm.style.transform = 'rotate(' + angles[0] + 'deg)';
    rightArm.style.transform = 'rotate(' + angles[1] + 'deg)';
}

function nextLetter() {
    if (index > message.length) return;
    const char = message[index];
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

form.onsubmit = () => {
    // obfuscate message for shenanigans
    const message = document.getElementById('message-plain').value;
    document.getElementById('message-base64').value = btoa(message);
};

/* Kickoff */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('m')) {
    message = urlParams.get('m');
    message = atob(message);
}

if (message) {
    start();
}