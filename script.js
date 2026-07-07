const articleInput = document.getElementById("articleInput");
const wpmInput = document.getElementById("wpmInput");
const wpmRange = document.getElementById("wpmRange");
const rampEndInput = document.getElementById("rampEndInput");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const wordDisplay = document.getElementById("wordDisplay");
const progressText = document.getElementById("progressText");
const effectiveWpmText = document.getElementById("effectiveWpmText");
const statusText = document.getElementById("statusText");

let words = [];
let index = 0;
let timeoutId = null;
let isPaused = false;
let startWpm = 300;
let targetWpm = 300;

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

function findOptimalLetterIndex(word) {
  if (!word) return 0;
  const len = word.length;
  if (len <= 3) {
    return 0;
  }
  return Math.max(0, Math.floor((len - 1) / 2));
}

function buildHighlightedWord(word) {
  const index = findOptimalLetterIndex(word);
  const before = word.slice(0, index);
  const highlight = word.slice(index, index + 1);
  const after = word.slice(index + 1);
  return `${before}<span class="highlight">${highlight}</span>${after}`;
}

function updateDisplay() {
  if (words.length === 0) {
    wordDisplay.textContent = "Paste an article and press Start.";
    progressText.textContent = "0 / 0";
    effectiveWpmText.textContent = "0 WPM";
    return;
  }

  const currentWord = words[index] || "";
  wordDisplay.innerHTML = buildHighlightedWord(currentWord);
  updateProgress();
  updateEffectiveWpm();
}

function setControlsPlaying(playing) {
  startButton.disabled = playing;
  pauseButton.disabled = !playing;
  resetButton.disabled = !playing && index === 0;
}

function getCurrentWpm() {
  const baseWpm = Number(startWpm) || 300;
  const endWpm = Math.max(baseWpm, Number(rampEndInput.value) || baseWpm);
  const progress = Math.min(1, index / Math.max(1, words.length - 1));
  return Math.round(baseWpm + (endWpm - baseWpm) * progress);
}

function getDelay() {
  return 60000 / getCurrentWpm();
}

function updateEffectiveWpm() {
  effectiveWpmText.textContent = `${getCurrentWpm()} WPM`;
}

function scheduleNextWord() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }
  timeoutId = window.setTimeout(() => {
    tick();
  }, getDelay());
}

function tick() {
  if (index >= words.length - 1) {
    stopReading();
    return;
  }

  index += 1;
  updateDisplay();
  scheduleNextWord();
}

function startReading() {
  loadWords();
  if (words.length === 0) {
    setStatus("Add text before starting.");
    return;
  }

  if (timeoutId) {
    return;
  }

  startWpm = Number(wpmInput.value) || 300;
  targetWpm = Math.max(startWpm, Number(rampEndInput.value) || startWpm);

  if (isPaused) {
    isPaused = false;
    setStatus("Resumed");
  } else {
    index = 0;
    setStatus("Reading...");
  }

  updateDisplay();
  scheduleNextWord();
  setControlsPlaying(true);
}

function pauseReading() {
  if (!timeoutId) {
    return;
  }
  window.clearTimeout(timeoutId);
  timeoutId = null;
  isPaused = true;
  setStatus("Paused");
  setControlsPlaying(false);
}

function stopReading() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
  setStatus("Complete");
  setControlsPlaying(false);
}

function resetReading() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
  index = 0;
  isPaused = false;
  setStatus("Ready");
  updateDisplay();
  setControlsPlaying(false);
}

wpmInput.addEventListener("input", () => {
  wpmRange.value = wpmInput.value;
  const newStart = Number(wpmInput.value) || 300;
  if (Number(rampEndInput.value) < newStart) {
    rampEndInput.value = newStart;
  }
  rampEndInput.min = newStart;
});

wpmRange.addEventListener("input", () => {
  wpmInput.value = wpmRange.value;
  const newStart = Number(wpmRange.value) || 300;
  if (Number(rampEndInput.value) < newStart) {
    rampEndInput.value = newStart;
  }
  rampEndInput.min = newStart;
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
  if (!timeoutId) {
    updateDisplay();
  }
});

window.addEventListener("load", () => {
  updateDisplay();
});
