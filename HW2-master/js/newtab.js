document.body.style.backgroundImage = `url('https://source.unsplash.com/random/1920x1080/?modern')`;

const timeElement = document.createElement('div');
timeElement.id = 'time';
document.body.appendChild(timeElement);

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  timeElement.textContent = `${hours} : ${minutes}`;
  timeElement.title = 'Hover to see seconds';
  timeElement.onmouseover = () => {
    timeElement.textContent = `${hours} : ${minutes} : ${seconds}`;
  };
  timeElement.onmouseleave = () => {
    timeElement.textContent = `${hours} : ${minutes}`;
  };
}
setInterval(updateTime, 1000);

const greetingElement = document.createElement('div');
greetingElement.id = 'greeting';
document.body.appendChild(greetingElement);

function updateGreeting() {
  const name = localStorage.getItem('name') || 'User';
  greetingElement.innerHTML = `Hello, <span contenteditable="false" id="editableName">${name}</span>`;
  const editableName = document.getElementById('editableName');
  editableName.ondblclick = () => {
    editableName.contentEditable = "true";
    editableName.focus();
  };
  editableName.onblur = () => {
    editableName.contentEditable = "false";
    localStorage.setItem('name', editableName.textContent);
  };
}
updateGreeting();

document.addEventListener('DOMContentLoaded', (event) => {
    const changeQuoteButton = document.getElementById('changeQuoteButton');

    function fetchRandomQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                const quoteElement = document.getElementById('quote');
                quoteElement.innerHTML = `"${data.content}" - ${data.author}`;
            })
            .catch(error => console.log('Error fetching quote:', error));
    }

    changeQuoteButton.addEventListener('click', fetchRandomQuote);

    fetchRandomQuote();
});

  const pomodoroTimer = document.createElement('div');
const startButton = document.createElement('button');
const pauseButton = document.createElement('button');
const resetButton = document.createElement('button');

let pomodoroSeconds = 25 * 60; 
let intervalId;

function updateTimerDisplay() {
  pomodoroTimer.textContent = `${Math.floor(pomodoroSeconds / 60)}:${String(pomodoroSeconds % 60).padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(intervalId); 
  intervalId = setInterval(() => {
    if (pomodoroSeconds > 0) {
      pomodoroSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(intervalId);
      alert('Time is up!');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  clearInterval(intervalId);
  pomodoroSeconds = 25 * 60; 
  updateTimerDisplay();
}

startButton.textContent = 'Start';
pauseButton.textContent = 'Pause';
resetButton.textContent = 'Reset';
startButton.onclick = startTimer;
pauseButton.onclick = pauseTimer;
resetButton.onclick = resetTimer;

document.body.appendChild(pomodoroTimer);
document.body.appendChild(startButton);
document.body.appendChild(pauseButton);
document.body.appendChild(resetButton);

updateTimerDisplay();