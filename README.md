# typingGame-js

[참고 강의](https://youtu.be/Yw-SYSG-028)<br>
[완성 페이지](https://dashing-rugelach-d9e539.netlify.app/)

## 기본 html 구조
[github](https://github.com/bradtraversy/wordbeater/blob/master/dist/index.html)에서 제공되는 html을 사용하였습니다.

## JS 작성
기본적으로 time, score을 재할당이 가능한 변수 let으로 정의해 줍니다.
```javascript
let time = 5;
let score = 0;
let isPlaying;
```

```javascript
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
```

html에 있는 `id` 값을 불러오는 변수를 작성해 줍니다.

단어가 적혀 있는 배열 변수를 만들어 주고, 그 단어들이 랜덤하게 들어갈 수 있도록 함수를 작성해 줍니다.
```javascript
function init() {
  showWord(words);
};

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
};
```
상단의 함수는 게임을 초기화 해 주는 함수입니다.

아래 함수는 랜덤 값을 정해 주는 함수입니다. `Math.floor`은 소수점을 버리는 것이고, `Math.random`을 통해서 랜덤한 값을 가진 후 words 배열의 개수 만큼 곱해 주게 되면 랜덤한 index 값을 얻을 수 있습니다. 해당 함수를 작성한 후 계속해서 새로고침을 하게 되면 단어가 바뀌는 것을 확인할 수 있습니다.

```javascript
function init() {
  showWord(words);
  setInterval(countdown, 1000);
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}
```

`setInterval`을 통해서 1초마다 카운트 되게 설정해 줍니다. 숫자가 0보다 클 때는 1초씩 감소하게 하고, 0이라면 게임이 끝나게 해야 합니다.

```javascript
function init() {
  showWord(words);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 500);
}

function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!'
  }
}
```

게임의 상태는 500ms 단위로 확인해 줍니다. `isPlaying`의 값과 `time`이 0과 같다면 `Game Over!!` 이라는 문구가 뜨게 설정해 줍니다. `time`의 값이 0이 되면 `isPlaying`의 값이 false가 되게 `countdown`의 함수에 작성을 했기 때문에 `!isPlaying`의 값은 truthy가 되고, time === 0의 값도 truthy가 되기 때문에 그 상황이 되면 `Game Over!!`이 출력됩니다.

```javascript
function init() {
  showWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 500);
}

function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time = 6;
    showWord(words);
    wordInput.value = '';
    score += 1;
  }
  scoreDisplay.innerHTML = score;
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}
```

게임을 시작하는 함수입니다. 콜백함수로 `matchWords` 함수를 받아 줍니다. `matchWords`는 메시지가 맞으면 `Correct!!` 문구와 함께 true라는 값을 반환하고 메시지가 틀리면 false값을 반환합니다. `startMatch` 함수에서 게임이 다시 재시작되는 값들을 설정합니다. `isPlaying`의 값을 true로 시작하고, 새로 고침을 하여 정보를 받는 시간까지 포함한 `time`으로 6의 값을 줍니다. 단어들을 불러오고, input의 value값을 빈칸으로 만들어 주어 계속해서 단어를 칠 수 있게 합니다. 그리고 정답일 시 `score`의 점수를 1씩 올려 주고, 1씩 올려 준 것을 html에 넣어 줍니다.

```javascript
if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }

function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!'
    score = -1;
  }
}
```

게임을 새로고침 하지 않고 그냥 바로 시작하는 경우에는 time이 흘러가지 않기 때문에 얼마만에 단어를 작성하였는지 모릅니다. 그래서 score가 바로 1점이 되는 것이 불공평하지 않으므로 ~~(강사님의 말 ㅋㅋ)~~ -1에서부터 시작해야 합니다. 그러나 화면상 -1이 아니라 0에서 시작하는 것으로 보여야 하기 때문에 if문을 작성해 줍니다.

```javascript
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
}

// To change level
const currentLevel = levels.medium;

let time = currentLevel;

function init() {
  seconds.innerHTML = currentLevel;
  showWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 500);
}
```

level 단계를 설정하여서 단계마다 초가 바뀌도록 설정합니다.<br>

---
해당 강의의 내용은 여기까지 이고, 사용자가 단계를 설정하는 것과 local storage를 통해서 high score를 저장할 수 있는 것을 구현하게 되면 내용을 더 추가하겠습니다!