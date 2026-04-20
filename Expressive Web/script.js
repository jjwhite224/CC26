const room = document.getElementById("room");
const player = document.getElementById("player");
const buttons = document.querySelectorAll(".mood-btn");
const moodText = document.getElementById("moodText");
const screenText = document.getElementById("screenText");
const particlesContainer = document.getElementById("particles");

const moodContent = {
  dreamy: {
    text: "The room softens. Blue light drifts across the walls.",
    screen: "Now tuning to: Dreamy",
    particleCount: 18
  },
  lonely: {
    text: "The room quiets down. Shadows stretch and the air feels colder.",
    screen: "Now tuning to: Lonely",
    particleCount: 8
  },
  energetic: {
    text: "The room comes alive. Light pulses and the walls seem to vibrate.",
    screen: "Now tuning to: Energetic",
    particleCount: 28
  }
};

function clearParticles() {
  particlesContainer.innerHTML = "";
}

function createParticles(count) {
  clearParticles();

  for (let i = 0; i < count; i++) {
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

async function setMood(mood, songPath) {
  room.className = `room ${mood}`;

  moodText.textContent = moodContent[mood].text;
  screenText.textContent = moodContent[mood].screen;

  createParticles(moodContent[mood].particleCount);

  if (player.src !== songPath) {
    player.src = songPath;
  }

  try {
    await player.play();
  } catch (error) {
    screenText.textContent = "Playback was blocked. Click again to play.";
    console.error(error);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    const song = button.dataset.song;
    setMood(mood, song);
  });
});