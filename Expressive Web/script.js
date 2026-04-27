const room = document.getElementById("room");
const radioStage = document.querySelector(".radio-stage");
const player = document.getElementById("player");
const buttons = document.querySelectorAll(".mood-btn");
const moodText = document.getElementById("moodText");
const screenText = document.getElementById("screenText");
const callerText = document.getElementById("callerText");
const particlesContainer = document.getElementById("particles");
const objectText = document.getElementById("objectText");
const toggleAudioBtn = document.getElementById("toggleAudioBtn");
const resetBtn = document.getElementById("resetBtn");
const onAirIndicator = document.getElementById("onAirIndicator");
const staticFlash = document.getElementById("staticFlash");

const dialControl = document.getElementById("dialControl");
const antennaControl = document.getElementById("antennaControl");
const speakerControl = document.getElementById("speakerControl");

const moodContent = {
  default: {
    text: "Tune a station and let the page become your broadcast space.",
    screen: "Station idle...",
    particleCount: 0
  },
  dreamy: {
    text: "Frequency 101.2 - soft synths and drifting late-night voices.",
    screen: "Now tuning: Dreamy FM 101.2",
    particleCount: 18
  },
  lonely: {
    text: "Frequency 88.4 - quiet static, rain ambience, and distant stories.",
    screen: "Now tuning: Lonely AM 88.4",
    particleCount: 8
  },
  energetic: {
    text: "Frequency 107.9 - bright beats, shout-outs, and electric color.",
    screen: "Now tuning: Energetic FM 107.9",
    particleCount: 28
  }
};

const interactionResponses = {
  default: {
    dial: "Dial moved: volume at {value}%.",
    antenna: "Antenna tuned: signal clarity at {value}%.",
    speaker: "Speaker toggled. Tap again to switch monitor mode."
  },
  dreamy: {
    dial: "Dreamy FM swells to {value}% volume.",
    antenna: "Signal clears and the whispering synths come into focus ({value}%).",
    speaker: "Soft-monitor mode shifts the station into a warmer tone."
  },
  lonely: {
    dial: "Lonely AM drifts at {value}% volume.",
    antenna: "Static thins and the piano signal lands at {value}% clarity.",
    speaker: "Wall-speaker mode makes the station feel distant and fragile."
  },
  energetic: {
    dial: "Energetic FM hits {value}% - the beat pushes harder.",
    antenna: "Antenna boost drives signal strength to {value}%.",
    speaker: "Club-speaker mode engages with extra punch."
  }
};

const callerSnippets = {
  default: [
    "Caller line: No incoming voices yet.",
    "Caller line: Keep turning the dial.",
    "Caller line: This station wakes up when you touch it."
  ],
  dreamy: [
    "Caller line: This reminds me of walking home at 2AM.",
    "Caller line: Can you play the version with more reverb?",
    "Caller line: The station feels like a foggy memory."
  ],
  lonely: [
    "Caller line: I am listening from a train with no signal bars.",
    "Caller line: Leave the static in, it sounds honest.",
    "Caller line: This channel feels like old voicemail."
  ],
  energetic: [
    "Caller line: Shout-out to everyone dancing in their headphones.",
    "Caller line: Turn it up and keep this drop rolling.",
    "Caller line: This frequency is pure neon."
  ]
};

let currentMood = "default";
let currentVolume = 0.55;
let signalStrength = 0.75;
let speakerBoost = false;
let dialDragging = false;
let antennaDragging = false;
let callerTimer = null;

let audioContext = null;
let mediaSource = null;
let analyserNode = null;
let filterNode = null;
let gainNode = null;
let audioReady = false;
let visualizerLevel = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clearParticles() {
  particlesContainer.innerHTML = "";
}

function createParticles(count) {
  clearParticles();

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 14 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.background = "white";
    particlesContainer.appendChild(particle);
  }
}

function updateOnAirIndicator() {
  const live = !!player.src && !player.paused;
  onAirIndicator.textContent = live ? "ON AIR" : "OFF AIR";
  onAirIndicator.classList.toggle("live", live);
}

function triggerStaticFlash() {
  staticFlash.classList.remove("flash");
  window.requestAnimationFrame(() => staticFlash.classList.add("flash"));
}

function updateCallerText(force = false) {
  const lines = callerSnippets[currentMood] || callerSnippets.default;
  if (!force && callerText.textContent && lines.includes(callerText.textContent)) {
    return;
  }
  const randomLine = lines[Math.floor(Math.random() * lines.length)];
  callerText.textContent = randomLine;
}

function startCallerRotation() {
  if (callerTimer) {
    window.clearInterval(callerTimer);
  }
  callerTimer = window.setInterval(() => {
    updateCallerText(true);
  }, 4600);
}

function renderInteractionMessage(controlName, value = null) {
  const map = interactionResponses[currentMood] || interactionResponses.default;
  let message = map[controlName] || "Signal adjusted.";
  if (value !== null) {
    message = message.replace("{value}", String(value));
  }
  objectText.textContent = message;
}

function updateDialVisual() {
  const angle = -110 + currentVolume * 220;
  radioStage.style.setProperty("--dial-angle", `${angle}deg`);
}

function updateAntennaVisual() {
  radioStage.style.setProperty("--signal-strength", String(signalStrength));
  const staticOpacity = 0.5 - signalStrength * 0.36;
  radioStage.style.setProperty("--static-opacity", staticOpacity.toFixed(2));
}

function applyAudioControls() {
  const boostedVolume = clamp(currentVolume * (speakerBoost ? 1.35 : 1), 0, 1);
  player.volume = boostedVolume;

  if (gainNode) {
    gainNode.gain.value = speakerBoost ? 1.2 : 1;
  }

  if (filterNode) {
    const cutoff = 1200 + signalStrength * 17000;
    filterNode.frequency.value = cutoff;
    filterNode.Q.value = 0.4 + (1 - signalStrength) * 7;
  }
}

function initAudioContext() {
  if (audioReady) {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    return;
  }

  audioContext = new window.AudioContext();
  mediaSource = audioContext.createMediaElementSource(player);
  analyserNode = audioContext.createAnalyser();
  filterNode = audioContext.createBiquadFilter();
  gainNode = audioContext.createGain();

  analyserNode.fftSize = 512;
  filterNode.type = "lowpass";

  mediaSource.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  filterNode.connect(analyserNode);

  audioReady = true;
  applyAudioControls();
}

function updateVisualizerLevel() {
  if (!analyserNode) {
    visualizerLevel = 0;
    return;
  }

  const data = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i += 1) {
    sum += data[i];
  }
  visualizerLevel = sum / data.length / 255;
}

function setVolumeFromPointer(clientY) {
  const rect = dialControl.getBoundingClientRect();
  const centerY = rect.top + rect.height / 2;
  const delta = centerY - clientY;
  currentVolume = clamp(0.5 + delta / 180, 0, 1);
  updateDialVisual();
  applyAudioControls();
  renderInteractionMessage("dial", Math.round(currentVolume * 100));
}

function setSignalFromPointer(clientY) {
  const rect = antennaControl.getBoundingClientRect();
  const ratio = clamp((rect.bottom - clientY) / rect.height, 0, 1);
  signalStrength = ratio;
  updateAntennaVisual();
  applyAudioControls();
  renderInteractionMessage("antenna", Math.round(signalStrength * 100));
}

function setupControlInteractions() {
  dialControl.addEventListener("pointerdown", (event) => {
    dialDragging = true;
    dialControl.setPointerCapture(event.pointerId);
    setVolumeFromPointer(event.clientY);
  });

  dialControl.addEventListener("pointermove", (event) => {
    if (!dialDragging) return;
    setVolumeFromPointer(event.clientY);
  });

  const stopDialDrag = () => {
    dialDragging = false;
  };
  dialControl.addEventListener("pointerup", stopDialDrag);
  dialControl.addEventListener("pointercancel", stopDialDrag);

  antennaControl.addEventListener("pointerdown", (event) => {
    antennaDragging = true;
    antennaControl.setPointerCapture(event.pointerId);
    setSignalFromPointer(event.clientY);
  });

  antennaControl.addEventListener("pointermove", (event) => {
    if (!antennaDragging) return;
    setSignalFromPointer(event.clientY);
  });

  const stopAntennaDrag = () => {
    antennaDragging = false;
  };
  antennaControl.addEventListener("pointerup", stopAntennaDrag);
  antennaControl.addEventListener("pointercancel", stopAntennaDrag);

  speakerControl.addEventListener("click", () => {
    speakerBoost = !speakerBoost;
    speakerControl.classList.toggle("active", speakerBoost);
    applyAudioControls();
    renderInteractionMessage("speaker");
  });
}

function setupP5Visualizer() {
  const sketch = (p) => {
    let canvas;
    p.setup = () => {
      const host = document.getElementById("visualizer");
      canvas = p.createCanvas(host.clientWidth, host.clientHeight);
      canvas.parent(host);
      p.noFill();
    };

    p.windowResized = () => {
      const host = document.getElementById("visualizer");
      p.resizeCanvas(host.clientWidth, host.clientHeight);
    };

    p.draw = () => {
      updateVisualizerLevel();
      const boost = speakerBoost ? 0.22 : 0.04;
      const energy = clamp(visualizerLevel + boost, 0, 1);
      p.clear();
      p.blendMode(p.SCREEN);

      for (let i = 0; i < 5; i += 1) {
        const radius = 60 + i * 28 + energy * (120 + i * 10);
        const alpha = 20 + energy * 100 - i * 8;
        p.stroke(190 + i * 10, 220 - i * 12, 255, alpha);
        p.strokeWeight(2);
        p.circle(p.width * 0.35, p.height * 0.52, radius);
      }

      const bars = 40;
      const baseY = p.height - 24;
      const signalFactor = 0.3 + signalStrength * 0.7;
      for (let x = 0; x < bars; x += 1) {
        const step = p.width / bars;
        const h = (20 + energy * 90) * signalFactor * (0.4 + Math.sin((p.frameCount + x * 6) * 0.06) * 0.6);
        p.stroke(255, 220, 140, 85);
        p.line(x * step, baseY, x * step, baseY - h);
      }
    };
  };

  new window.p5(sketch);
}

async function setMood(mood, songPath) {
  currentMood = mood;
  room.className = `room ${mood}`;
  moodText.textContent = moodContent[mood].text;
  screenText.textContent = moodContent[mood].screen;
  objectText.textContent = "Tip: drag the dial, lift the antenna, and tap the speaker.";
  createParticles(moodContent[mood].particleCount);
  updateCallerText(true);
  triggerStaticFlash();

  if (!songPath) {
    player.pause();
    player.removeAttribute("src");
    player.load();
    toggleAudioBtn.textContent = "Play Audio";
    updateOnAirIndicator();
    return;
  }

  initAudioContext();
  if (!player.src.includes(songPath)) {
    player.src = songPath;
  }

  try {
    await player.play();
    toggleAudioBtn.textContent = "Pause Audio";
  } catch (error) {
    screenText.textContent = "Playback was blocked. Click the mood button again.";
    console.error(error);
  }
  updateOnAirIndicator();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    const song = button.dataset.song;
    setMood(mood, song);
  });
});

toggleAudioBtn.addEventListener("click", async () => {
  if (!player.src) {
    screenText.textContent = "Pick a mood first, then audio can play.";
    return;
  }

  initAudioContext();

  if (player.paused) {
    try {
      await player.play();
      toggleAudioBtn.textContent = "Pause Audio";
    } catch (error) {
      screenText.textContent = "Playback was blocked. Click the mood button again.";
      console.error(error);
    }
    updateOnAirIndicator();
    return;
  }

  player.pause();
  toggleAudioBtn.textContent = "Play Audio";
  updateOnAirIndicator();
});

resetBtn.addEventListener("click", () => {
  currentVolume = 0.55;
  signalStrength = 0.75;
  speakerBoost = false;
  speakerControl.classList.remove("active");
  updateDialVisual();
  updateAntennaVisual();
  applyAudioControls();
  setMood("default", "");
});

updateDialVisual();
updateAntennaVisual();
setupControlInteractions();
startCallerRotation();
setupP5Visualizer();