const articleInput = document.getElementById("articleInput");
const wpmInput = document.getElementById("wpmInput");
const wpmRange = document.getElementById("wpmRange");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const wordDisplay = document.getElementById("wordDisplay");
const progressText = document.getElementById("progressText");
const statusText = document.getElementById("statusText");

let words = [];
let index = 0;
let intervalId = null;
let isPaused = false;

function normalizeText(text) {
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function loadWords() {
  const raw = normalizeText(articleInput.value);
  if (!raw) {
    words = [];
    return;
  }
  words = raw.split(/\s+/);
}

function updateProgress() {
  const total = words.length;
  progressText.textContent = `${Math.min(index + 1, total)} / ${total}`;
}

function setStatus(message) {
  statusText.textContent = message;
}

function updateDisplay() {
  if (words.length === 0) {
    wordDisplay.textContent = "Paste an article and press Start.";
    progressText.textContent = "0 / 0";
    return;
  }

  const currentWord = words[index] || "";
  wordDisplay.textContent = currentWord;
  updateProgress();
}

function setControlsPlaying(playing) {
  startButton.disabled = playing;
  pauseButton.disabled = !playing;
  resetButton.disabled = !playing && index === 0;
}

function getDelay() {
  const wpm = Number(wpmInput.value) || 300;
  return 60000 / wpm;
}

function tick() {
  if (index >= words.length) {
    stopReading();
    return;
  }

  updateDisplay();
  index += 1;
}

function startReading() {
  loadWords();
  if (words.length === 0) {
    setStatus("Add text before starting.");
    return;
  }

  if (intervalId) {
    return;
  }

  if (isPaused) {
    isPaused = false;
    setStatus("Resumed");
  } else {
    index = 0;
    setStatus("Reading...");
  }

  updateDisplay();
  intervalId = window.setInterval(() => {
    tick();
  }, getDelay());
  setControlsPlaying(true);
}

function pauseReading() {
  if (!intervalId) {
    return;
  }
  window.clearInterval(intervalId);
  intervalId = null;
  isPaused = true;
  setStatus("Paused");
  setControlsPlaying(false);
}

function stopReading() {
  if (intervalId) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
  setStatus("Complete");
  setControlsPlaying(false);
}

function resetReading() {
  if (intervalId) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
  index = 0;
  isPaused = false;
  setStatus("Ready");
  updateDisplay();
  setControlsPlaying(false);
}

wpmInput.addEventListener("input", () => {
  wpmRange.value = wpmInput.value;
});

wpmRange.addEventListener("input", () => {
  wpmInput.value = wpmRange.value;
});

startButton.addEventListener("click", () => {
  startReading();
});

pauseButton.addEventListener("click", () => {
  pauseReading();
});

resetButton.addEventListener("click", () => {
  resetReading();
});

articleInput.addEventListener("input", () => {
  if (!intervalId) {
    updateDisplay();
  }
});

window.addEventListener("load", () => {
  updateDisplay();
});
