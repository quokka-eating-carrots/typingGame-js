window.addEventListener('load', init);

// Globals

// Available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
}

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'wish',
  'wise',
  'volume',
  'up',
  'until',
  'tomato',
  'title',
  'tent',
  'apple',
  'movie',
  'story',
  'lost',
  'strange',
  'star',
  'rural',
  'run',
  'ruler',
  'record',
  'push',
  'pull',
  'publish',
  'down',
  'punch',
  'photo',
  'paino',
  'outside',
  'over',
  'awesome',
  'none',
  'nine',
  'myself',
  'neat',
  'naked',
  'music',
  'multiplay',
  'mouse',
  'mouth',
  'most',
  'meal',
  'measure',
  'maybe',
  'look',
  'long',
  'logic',
  'after',
  'like',
  'kick',
  'kilogram',
  'kind',
  'junior',
  'keen',
  'keyboard',
  'june',
  'juice',
  'install',
  'instead',
  'inner',
  'injury',
  'hurt',
  'how',
  'human',
  'hungry',
  'here',
  'hello',
  'help',
  'grab',
  'grandfather',
  'grass',
  'general',
  'gear',
  'gather',
  'formal',
  'family',
  'formula',
  'fix',
  'floor',
  'food',
  'excuse',
  'exhibit',
  'evil',
  'every',
  'effort',
  'egg',
  'eleven',
  'double',
  'door',
  'dress',
  'disc',
  'diet',
  'devote',
  'cycle',
  'dad',
  'custom',
  'crack',
  'credit',
  'crash',
  'cover',
  'consult',
  'constant',
  'cloth',
  'cloud',
  'change',
  'branch',
  'break',
  'breathe',
  'boy',
  'girl',
  'byte',
  'bite',
  'block',
  'because',
  'approve',
  'argue',
  'artistic',
  'amuse',
  'angle',
  'alter',
  'accident',
  'abuse',
  'side',
  'shut',
  'sign',
  'silence',
  'small',
  'slowly',
  'square',
  'stand',
  'sun',
  'target',
  'team',
  'tape',
  'technology',
  'text',
  'theory',
  'today',
  'travel',
  'unload',
  'unsteady',
  'wet',
  'war',
  'where',
  'while',
  'your',
  'yard',
  'zone',
  'zero',
  'one',
  'yesterday',
  'wrong'
];

// Intirialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // load word form array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 500);
}

// start match
function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score += 1;
  }
  
  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure rime is not run out
  if(time > 0) {
    time--;
  } else if(time === 0) {
    // Game is over
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

// check status
function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!'
    score = -1;
  }
}