const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hh = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);

  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);

  const diffInMs = (diffInSec - ss) * 1000;
  const ms = Math.floor(diffInMs / 10); // keep 2-digit ms

  const formattedHH = hh.toString().padStart(2, '0');
  const formattedMM = mm.toString().padStart(2, '0');
  const formattedSS = ss.toString().padStart(2, '0');
  const formattedMS = ms.toString().padStart(2, '0');

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
  display.textContent = txt;
}

function start() {
  if (isRunning) return;

  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pause() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timerInterval);

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function reset() {
  isRunning = false;
  clearInterval(timerInterval);
  print("00:00:00.00");
  elapsedTime = 0;
  lapsContainer.innerHTML = '';

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function lap() {
  if (!isRunning) return;
  const lapTime = timeToString(elapsedTime);
  const lapElem = document.createElement('div');
  lapElem.classList.add('lap');
  lapElem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
  lapsContainer.appendChild(lapElem);
  lapsContainer.scrollTop = lapsContainer.scrollHeight;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 's') start();
  if (key === 'p') pause();
  if (key === 'r') reset();
  if (key === 'l') lap();
});

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
