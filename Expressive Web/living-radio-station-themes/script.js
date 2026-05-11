const room = document.getElementById("room");
const roomShell = document.getElementById("roomShell");
const themeLayer = document.getElementById("themeLayer");
const architecture = document.getElementById("architecture");
const signalSeeds = document.getElementById("signalSeeds");
const waveField = document.getElementById("waveField");
const player = document.getElementById("player");
const stationGrid = document.getElementById("stationGrid");
const tuner = document.getElementById("tuner");
const volume = document.getElementById("volume");
const density = document.getElementById("density");
const playPause = document.getElementById("playPause");
const scanBtn = document.getElementById("scanBtn");
const rebuildBtn = document.getElementById("rebuildBtn");
const dimBtn = document.getElementById("dimBtn");
const screenText = document.getElementById("screenText");
const roomText = document.getElementById("roomText");
const storyText = document.getElementById("storyText");
const onAir = document.getElementById("onAir");
const frequencyReadout = document.getElementById("frequencyReadout");

const TUNER_MIN = 87.5;
const TUNER_MAX = 108;
const TUNE_LOCK_RANGE = 0.22;

const stations = [
  {
    id: "drone",
    frequency: 88.4,
    name: "Drone Zone",
    room: "blue radio receiver chamber",
    motif: "slow rings / antenna ribs",
    visualizer: "soft-rings",
    slug: "dronezone",
    color: "#93c5fd",
    color2: "#dbeafe",
    color3: "#1d4ed8",
    energy: 0.28,
    speed: 0.52,
    densityBias: 1.02,
    forms: ["ring", "column", "panel", "ring", "node"],
    layout: "radioCavern",
    stream: "https://ice5.somafm.com/dronezone-128-mp3",
    story: [
      "Drone Zone opens as a blue receiver chamber: slow radio rings, antenna ribs, and soft fog.",
      "The space breathes like an old speaker cabinet, building itself in long waves.",
      "Clicking the room plants low-frequency ripples that expand like a broadcast finding range."
    ],
    interaction: "A low broadcast ripple spreads across the receiver chamber."
  },
  {
    id: "groove",
    frequency: 90.6,
    name: "Groove Salad",
    room: "warm vinyl lounge",
    motif: "record grooves / lounge panels",
    visualizer: "groove-bars",
    slug: "groovesalad",
    color: "#facc15",
    color2: "#fef3c7",
    color3: "#92400e",
    energy: 0.46,
    speed: 0.82,
    densityBias: 1.12,
    forms: ["panel", "ring", "column", "ring"],
    layout: "vinylLounge",
    stream: "https://ice5.somafm.com/groovesalad-128-mp3",
    story: [
      "Groove Salad becomes a vinyl lounge: amber grooves rotate through the floor and walls.",
      "Rounded panels rise like low furniture, and every ring feels like a needle finding a loop.",
      "Clicking the room drops a temporary groove marker into the lounge."
    ],
    interaction: "A new groove marker drops into the lounge and warms the floor."
  },
  {
    id: "space",
    frequency: 92.8,
    name: "Deep Space One",
    room: "orbital music player",
    motif: "HUD rings / orbit nodes",
    visualizer: "hud-pulse",
    slug: "deepspaceone",
    color: "#67e8f9",
    color2: "#cffafe",
    color3: "#a855f7",
    energy: 0.38,
    speed: 0.68,
    densityBias: 1.32,
    forms: ["ring", "node", "ring", "panel"],
    layout: "orbitalCore",
    stream: "https://ice5.somafm.com/deepspaceone-128-mp3",
    story: [
      "Deep Space One turns the room into a futuristic player: HUD rings orbit a glowing core.",
      "The horizon becomes a navigation line and the walls behave like a listening cockpit.",
      "Clicking the room launches a small orbit marker into the signal field."
    ],
    interaction: "A small orbital marker joins the futuristic player core."
  },
  {
    id: "station",
    frequency: 94.4,
    name: "Space Station Soma",
    room: "violet star cabin",
    motif: "windows / cabin light strips",
    visualizer: "star-cabin",
    slug: "spacestation",
    color: "#a78bfa",
    color2: "#ede9fe",
    color3: "#4c1d95",
    energy: 0.56,
    speed: 0.92,
    densityBias: 1.18,
    forms: ["panel", "ring", "column", "node"],
    layout: "starCabin",
    stream: "https://ice5.somafm.com/spacestation-128-mp3",
    story: [
      "Space Station Soma builds a violet star cabin: window panels, light strips, and a drifting ceiling.",
      "The space feels like a lounge parked between planets, half cabin and half spacecraft.",
      "Clicking the room pins a tiny star marker to the cabin wall."
    ],
    interaction: "A violet star marker sticks to the cabin window."
  },
  {
    id: "vapor",
    frequency: 96.3,
    name: "Vaporwaves",
    room: "vaporwave glass corridor",
    motif: "sunset grid / chrome spheres",
    visualizer: "vapor-sunset",
    slug: "vaporwaves",
    color: "#ff71ce",
    color2: "#01cdfe",
    color3: "#b967ff",
    energy: 0.5,
    speed: 0.78,
    densityBias: 1.08,
    forms: ["panel", "panel", "ring", "node"],
    layout: "glassCorridor",
    stream: "https://ice5.somafm.com/vaporwaves-128-mp3",
    story: [
      "Vaporwaves transforms the room into a vaporwave corridor: neon grid, sunset disk, chrome spheres.",
      "The space feels like an empty mall after closing, glowing with pink glass and blue scanlines.",
      "Clicking the room leaves a glossy neon fingerprint on the grid."
    ],
    interaction: "A neon fingerprint blooms on the vaporwave grid."
  },
  {
    id: "beat",
    frequency: 98.1,
    name: "Beat Blender",
    room: "green equalizer workshop",
    motif: "equalizer towers / pulse pads",
    visualizer: "club-eq",
    slug: "beatblender",
    color: "#34d399",
    color2: "#d1fae5",
    color3: "#064e3b",
    energy: 0.76,
    speed: 1.16,
    densityBias: 1.26,
    forms: ["column", "column", "panel", "node"],
    layout: "pulseWorkshop",
    stream: "https://ice5.somafm.com/beatblender-128-mp3",
    story: [
      "Beat Blender builds a green equalizer workshop where columns lift like mixer channels.",
      "The room is more mechanical: pads, towers, and pulse blocks counting time.",
      "Clicking the room triggers a small beat pad in the workshop."
    ],
    interaction: "A beat pad lights up and syncs with the workshop columns."
  },
  {
    id: "agent",
    frequency: 100.5,
    name: "Secret Agent",
    room: "noir radar lounge",
    motif: "radar sweep / blinds / dossier cards",
    visualizer: "radar-scan",
    slug: "secretagent",
    color: "#f97316",
    color2: "#ffedd5",
    color3: "#7c2d12",
    energy: 0.62,
    speed: 0.96,
    densityBias: 1.0,
    forms: ["panel", "column", "node", "panel"],
    layout: "spyLounge",
    stream: "https://ice5.somafm.com/secretagent-128-mp3",
    story: [
      "Secret Agent forms a noir radar lounge: orange blinds, spy panels, and a sweeping scanner.",
      "The room feels stylish, dangerous, and slightly amused, like a radio hidden behind a bookshelf.",
      "Clicking the room plants a clue marker in the lounge."
    ],
    interaction: "A clue marker flashes under the radar sweep."
  },
  {
    id: "synphaera",
    frequency: 102.7,
    name: "Synphaera Radio",
    room: "crystalline ambient temple",
    motif: "prisms / suspended arcs",
    visualizer: "crystal-prism",
    slug: "synphaera",
    color: "#38bdf8",
    color2: "#e0f2fe",
    color3: "#075985",
    energy: 0.34,
    speed: 0.62,
    densityBias: 1.44,
    forms: ["ring", "panel", "node", "ring"],
    layout: "crystalGallery",
    stream: "https://ice5.somafm.com/synphaera-128-mp3",
    story: [
      "Synphaera grows into a crystalline ambient temple: prisms, cold arcs, and calibrated blue light.",
      "The room is less decorated than tuned; every shape feels cut from the same frequency.",
      "Clicking the room places a small prism into the gallery."
    ],
    interaction: "A prism marker catches the signal and refracts it."
  },
  {
    id: "defcon",
    frequency: 105.1,
    name: "DEF CON Radio",
    room: "green terminal bunker",
    motif: "code columns / scanlines",
    visualizer: "terminal-code",
    slug: "defcon",
    color: "#22c55e",
    color2: "#dcfce7",
    color3: "#14532d",
    energy: 0.7,
    speed: 1.08,
    densityBias: 1.12,
    forms: ["column", "node", "panel", "column"],
    layout: "terminalBunker",
    stream: "https://ice5.somafm.com/defcon-128-mp3",
    story: [
      "DEF CON Radio boots the room into a terminal bunker: code columns, scanlines, encrypted walls.",
      "The architecture looks like it is waiting for a password.",
      "Clicking the room inserts a temporary packet into the bunker."
    ],
    interaction: "A packet marker pings through the terminal bunker."
  },
  {
    id: "mission",
    frequency: 107.9,
    name: "Mission Control",
    room: "telemetry command room",
    motif: "countdown rings / telemetry lines",
    visualizer: "command-telemetry",
    slug: "missioncontrol",
    color: "#f8fafc",
    color2: "#fefce8",
    color3: "#94a3b8",
    energy: 0.52,
    speed: 0.88,
    densityBias: 1.24,
    forms: ["ring", "column", "panel", "node"],
    layout: "commandRoom",
    stream: "https://ice5.somafm.com/missioncontrol-128-mp3",
    story: [
      "Mission Control builds a pale command room: telemetry lines, countdown rings, and a long horizon.",
      "The floor becomes a launch diagram and the walls wait for a voice from orbit.",
      "Clicking the room places a small telemetry ping in the command field."
    ],
    interaction: "A telemetry ping appears on the command-room grid."
  }
];

let currentStation = null;
let isScanning = false;
let scanTimer = null;
let storyTimer = null;
let animationFrame = null;
let visualTime = 0;
let currentStreamAttempt = 0;
let staticCooldown = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function stationClass(id) {
  return `station-${id || "idle"}`;
}

function streamCandidates(station) {
  return [
    station.stream,
    `https://ice1.somafm.com/${station.slug}-128-mp3`,
    `https://ice2.somafm.com/${station.slug}-128-mp3`,
    `https://ice4.somafm.com/${station.slug}-128-mp3`
  ];
}

function renderStationButtons() {
  stationGrid.innerHTML = stations.map((station) => `
    <button class="station-card" type="button" data-id="${station.id}" style="--card-color: ${station.color}">
      <span>${station.frequency.toFixed(1)} FM</span>
      <strong>${station.name}</strong>
      <em>${station.room}</em>
      <small>${station.motif}</small>
    </button>
  `).join("");
}

function setTheme(station) {
  const classes = ["room", stationClass(station ? station.id : "idle")];
  if (room.classList.contains("dimmed")) classes.push("dimmed");
  room.className = classes.join(" ");
  room.dataset.state = station ? "station" : "idle";

  if (station) {
    room.style.setProperty("--accent", station.color);
    room.style.setProperty("--accent-2", station.color2);
    room.style.setProperty("--accent-3", station.color3 || station.color);
    room.dataset.visualizer = station.visualizer || "default";
  } else {
    room.style.removeProperty("--accent");
    room.style.removeProperty("--accent-2");
    room.style.removeProperty("--accent-3");
    room.dataset.visualizer = "idle";
  }
}

function setActiveButton(station) {
  document.querySelectorAll(".station-card").forEach((button) => {
    button.classList.toggle("active", Boolean(station && button.dataset.id === station.id));
  });
}

function updateOnAir() {
  const live = Boolean(currentStation && !player.paused);
  onAir.textContent = live ? "ON AIR" : "OFF AIR";
  onAir.classList.toggle("live", live);
  playPause.textContent = live ? "Pause" : "Play";
}

function findStationByFrequency(freq) {
  return stations.find((station) => Math.abs(station.frequency - freq) <= TUNE_LOCK_RANGE) || null;
}

function nearestStation(freq) {
  return stations.reduce((closest, station) => {
    const d = Math.abs(station.frequency - freq);
    return !closest || d < closest.distance ? { station, distance: d } : closest;
  }, null);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function addThemePiece(type, options = {}) {
  const piece = document.createElement("span");
  piece.className = `theme-piece ${type}`;
  piece.style.setProperty("--tx", `${randomBetween(options.xMin ?? 14, options.xMax ?? 86)}%`);
  piece.style.setProperty("--ty", `${randomBetween(options.yMin ?? 20, options.yMax ?? 76)}%`);
  piece.style.setProperty("--tz", `${randomBetween(options.zMin ?? -120, options.zMax ?? 180)}px`);
  piece.style.setProperty("--tw", `${randomBetween(options.wMin ?? 40, options.wMax ?? 160)}px`);
  piece.style.setProperty("--th", `${randomBetween(options.hMin ?? 24, options.hMax ?? 160)}px`);
  piece.style.setProperty("--tr", `${randomBetween(options.rMin ?? -16, options.rMax ?? 16)}deg`);
  piece.style.setProperty("--td", `${randomBetween(0, options.delayMax ?? 1.4)}s`);
  piece.style.setProperty("--dur", `${randomBetween(options.durMin ?? 4.5, options.durMax ?? 10)}s`);
  themeLayer.appendChild(piece);
}

function addThemePieces(type, count, options = {}) {
  for (let i = 0; i < count; i += 1) {
    addThemePiece(type, options);
  }
}

function buildThemeLayer(station) {
  themeLayer.innerHTML = "";
  if (!station) return;

  const densityValue = Number(density.value);
  const light = densityValue < 24 ? 1 : densityValue < 42 ? 2 : 3;

  switch (station.id) {
    case "drone":
      addThemePieces("radio-ring", 5 + light, { xMin: 32, xMax: 68, yMin: 30, yMax: 62, wMin: 90, wMax: 260, hMin: 90, hMax: 260, zMin: -190, zMax: 120, durMin: 9, durMax: 16 });
      addThemePieces("antenna-rib", 6, { xMin: 10, xMax: 90, yMin: 18, yMax: 78, wMin: 4, wMax: 9, hMin: 100, hMax: 310, zMin: -230, zMax: 60, rMin: -8, rMax: 8 });
      break;

    case "groove":
      addThemePieces("vinyl-disc", 3 + light, { xMin: 22, xMax: 76, yMin: 45, yMax: 76, wMin: 120, wMax: 300, hMin: 120, hMax: 300, zMin: -100, zMax: 180, durMin: 7, durMax: 15 });
      addThemePieces("tone-arm", 2, { xMin: 55, xMax: 82, yMin: 34, yMax: 52, wMin: 120, wMax: 220, hMin: 6, hMax: 12, zMin: 80, zMax: 220, rMin: -36, rMax: -18 });
      break;

    case "space":
      addThemePieces("hud-ring", 4 + light, { xMin: 32, xMax: 68, yMin: 32, yMax: 64, wMin: 120, wMax: 310, hMin: 120, hMax: 310, zMin: -160, zMax: 220, durMin: 8, durMax: 15 });
      addThemePieces("orbit-node", 12, { xMin: 18, xMax: 82, yMin: 18, yMax: 78, wMin: 10, wMax: 24, hMin: 10, hMax: 24, zMin: -210, zMax: 260 });
      break;

    case "station":
      addThemePieces("cabin-window", 4 + light, { xMin: 14, xMax: 86, yMin: 24, yMax: 54, wMin: 100, wMax: 220, hMin: 56, hMax: 140, zMin: -220, zMax: 120, rMin: -8, rMax: 8 });
      addThemePieces("star-strip", 8, { xMin: 12, xMax: 88, yMin: 60, yMax: 82, wMin: 80, wMax: 230, hMin: 3, hMax: 8, zMin: -180, zMax: 160 });
      break;

    case "vapor":
      addThemePiece("vapor-sun", { xMin: 43, xMax: 57, yMin: 27, yMax: 39, wMin: 170, wMax: 260, hMin: 170, hMax: 260, zMin: -230, zMax: -60, durMin: 10, durMax: 18 });
      addThemePieces("chrome-sphere", 3 + light, { xMin: 18, xMax: 84, yMin: 40, yMax: 76, wMin: 52, wMax: 110, hMin: 52, hMax: 110, zMin: -80, zMax: 240 });
      addThemePieces("glass-slab", 6 + light, { xMin: 12, xMax: 90, yMin: 22, yMax: 70, wMin: 70, wMax: 190, hMin: 88, hMax: 220, zMin: -220, zMax: 140, rMin: -32, rMax: 32 });
      break;

    case "beat":
      addThemePieces("eq-tower", 10 + light * 2, { xMin: 10, xMax: 90, yMin: 44, yMax: 76, wMin: 16, wMax: 38, hMin: 80, hMax: 260, zMin: -150, zMax: 220, rMin: -2, rMax: 2, durMin: 2.5, durMax: 5.8 });
      addThemePieces("pulse-pad", 6, { xMin: 16, xMax: 86, yMin: 66, yMax: 84, wMin: 80, wMax: 170, hMin: 24, hMax: 62, zMin: 20, zMax: 260 });
      break;

    case "agent":
      addThemePiece("radar-sweep", { xMin: 42, xMax: 58, yMin: 36, yMax: 54, wMin: 210, wMax: 300, hMin: 210, hMax: 300, zMin: -140, zMax: 80, durMin: 7, durMax: 12 });
      addThemePieces("blind-slat", 9, { xMin: 12, xMax: 88, yMin: 24, yMax: 68, wMin: 130, wMax: 300, hMin: 6, hMax: 14, zMin: -230, zMax: 120, rMin: -12, rMax: 12 });
      addThemePieces("dossier-card", 3 + light, { xMin: 22, xMax: 78, yMin: 38, yMax: 72, wMin: 70, wMax: 135, hMin: 90, hMax: 170, zMin: -60, zMax: 180, rMin: -10, rMax: 10 });
      break;

    case "synphaera":
      addThemePieces("crystal-spire", 8 + light, { xMin: 14, xMax: 86, yMin: 42, yMax: 78, wMin: 28, wMax: 70, hMin: 120, hMax: 280, zMin: -190, zMax: 200, rMin: -24, rMax: 24, durMin: 6, durMax: 12 });
      addThemePieces("prism-arc", 5, { xMin: 30, xMax: 70, yMin: 26, yMax: 60, wMin: 120, wMax: 260, hMin: 60, hMax: 140, zMin: -160, zMax: 180 });
      break;

    case "defcon":
      addThemePieces("terminal-code", 10 + light, { xMin: 8, xMax: 92, yMin: 22, yMax: 72, wMin: 46, wMax: 120, hMin: 80, hMax: 220, zMin: -230, zMax: 130, rMin: -3, rMax: 3, durMin: 3, durMax: 7 });
      addThemePieces("scan-line", 5, { xMin: 10, xMax: 90, yMin: 18, yMax: 84, wMin: 180, wMax: 420, hMin: 2, hMax: 5, zMin: -200, zMax: 200 });
      break;

    case "mission":
      addThemePieces("telemetry-line", 8 + light, { xMin: 12, xMax: 88, yMin: 26, yMax: 70, wMin: 120, wMax: 360, hMin: 3, hMax: 8, zMin: -240, zMax: 120, rMin: -5, rMax: 5 });
      addThemePieces("countdown-ring", 4, { xMin: 30, xMax: 70, yMin: 28, yMax: 62, wMin: 120, wMax: 280, hMin: 120, hMax: 280, zMin: -170, zMax: 160, durMin: 9, durMax: 14 });
      break;
  }
}

function createWaveBars(station = currentStation) {
  waveField.innerHTML = "";
  const visualizer = station ? station.visualizer : "static-drift";
  const barCount = station && station.id === "beat" ? 64 : station && station.id === "vapor" ? 54 : 44;
  waveField.dataset.visualizer = visualizer;

  for (let i = 0; i < barCount; i += 1) {
    const bar = document.createElement("span");
    bar.className = `wave-bar visualizer-${visualizer}`;
    bar.style.setProperty("--bar-h", String(randomBetween(18, 130)));
    bar.style.setProperty("--bar-i", String(i));
    waveField.appendChild(bar);
  }
}

function getPieceSize(station, form) {
  const energyLift = 0.72 + station.energy;

  if (form === "node") {
    const size = randomBetween(10, 30) * (station.layout === "terminalBunker" ? 0.82 : 1);
    return { width: size, height: size };
  }

  if (form === "ring") {
    const size = randomBetween(42, 140) * (station.layout === "orbitalCore" ? 1.35 : 1);
    return { width: size, height: size };
  }

  if (station.layout === "vinylLounge") {
    return { width: randomBetween(34, 110), height: randomBetween(18, 74) };
  }

  if (station.layout === "terminalBunker") {
    return { width: randomBetween(18, 48), height: randomBetween(70, 240) * energyLift };
  }

  if (station.layout === "glassCorridor" || station.layout === "spyLounge") {
    return { width: randomBetween(50, 150), height: randomBetween(38, 170) };
  }

  return {
    width: randomBetween(22, 80),
    height: randomBetween(62, 230) * energyLift
  };
}

function layoutGeometry(station, form, i, count) {
  const t = count <= 1 ? 0.5 : i / (count - 1);
  const side = i % 2 === 0 ? -1 : 1;
  let x;
  let y;
  let z;
  let ry;
  let rx;

  switch (station.layout) {
    case "radioCavern":
      x = 50 + side * randomBetween(16, 42);
      y = randomBetween(24, 74);
      z = randomBetween(-260, 70);
      ry = side * randomBetween(6, 30);
      rx = randomBetween(-4, 8);
      break;

    case "vinylLounge": {
      const angle = t * Math.PI * 4.2;
      const radius = randomBetween(9, 38);
      x = 50 + Math.cos(angle) * radius;
      y = 61 + Math.sin(angle) * randomBetween(5, 17);
      z = randomBetween(-150, 150);
      ry = randomBetween(-16, 16);
      rx = randomBetween(8, 24);
      break;
    }

    case "orbitalCore": {
      const angle = t * Math.PI * 2.8;
      const radius = randomBetween(14, 36);
      x = 50 + Math.cos(angle) * radius;
      y = 46 + Math.sin(angle) * randomBetween(8, 24);
      z = randomBetween(-210, 220);
      ry = randomBetween(-42, 42);
      rx = randomBetween(-24, 24);
      break;
    }

    case "starCabin":
      x = 50 + side * randomBetween(8, 36);
      y = 38 + (i % 5) * 8 + randomBetween(-4, 4);
      z = randomBetween(-230, 130);
      ry = side * randomBetween(10, 34);
      rx = randomBetween(-6, 12);
      break;

    case "glassCorridor":
      x = 50 + side * (18 + (i % 4) * 7);
      y = 35 + (i % 6) * 7;
      z = -230 + (i % 9) * 48;
      ry = side * randomBetween(24, 58);
      rx = randomBetween(-3, 6);
      break;

    case "pulseWorkshop":
      x = 16 + (i % 8) * 10;
      y = randomBetween(34, 74);
      z = randomBetween(-190, 170);
      ry = randomBetween(-8, 8);
      rx = randomBetween(-3, 5);
      break;

    case "spyLounge":
      x = 18 + (i % 7) * 12;
      y = 29 + (i % 5) * 9;
      z = randomBetween(-220, 100);
      ry = side * randomBetween(26, 62);
      rx = randomBetween(-5, 8);
      break;

    case "crystalGallery": {
      const angle = t * Math.PI * 3.6;
      x = 50 + Math.cos(angle) * randomBetween(18, 43);
      y = 50 + Math.sin(angle) * randomBetween(14, 31);
      z = randomBetween(-250, 210);
      ry = randomBetween(-50, 50);
      rx = randomBetween(-18, 18);
      break;
    }

    case "terminalBunker":
      x = 12 + (i % 9) * 9.5;
      y = 30 + Math.floor(i / 9) * 9 + randomBetween(-2, 2);
      z = randomBetween(-210, 95);
      ry = 0;
      rx = randomBetween(-2, 4);
      break;

    case "commandRoom":
      x = 50 + side * randomBetween(6, 38);
      y = 30 + (i % 6) * 7;
      z = randomBetween(-245, 115);
      ry = side * randomBetween(6, 22);
      rx = randomBetween(-5, 7);
      break;

    default:
      x = 50 + side * randomBetween(4, 38);
      y = randomBetween(28, 72);
      z = randomBetween(-220, 190);
      ry = side * randomBetween(8, 48);
      rx = randomBetween(-8, 12);
  }

  return {
    x: clamp(x, 8, 92),
    y: clamp(y, 18, 82),
    z,
    ry,
    rx
  };
}

function buildSpace(station) {
  architecture.innerHTML = "";
  buildThemeLayer(station);

  if (!station) {
    createWaveBars(null);
    return;
  }

  const count = Math.min(70, Math.round(Number(density.value) * station.densityBias));
  const forms = station.forms;

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    const form = forms[i % forms.length];
    const row = Math.floor(i / 2);
    const geometry = layoutGeometry(station, form, i, count);
    const size = getPieceSize(station, form);
    const delay = 32 * i + row * 10;
    const speed = `${randomBetween(4.8, 11.5) / station.speed}s`;

    piece.className = `arch-piece ${form} layout-${station.layout}`;
    piece.style.setProperty("--x", `${geometry.x}%`);
    piece.style.setProperty("--y", `${geometry.y}%`);
    piece.style.setProperty("--z", `${geometry.z}px`);
    piece.style.setProperty("--w", `${size.width}px`);
    piece.style.setProperty("--h", `${size.height}px`);
    piece.style.setProperty("--ry", `${geometry.ry}deg`);
    piece.style.setProperty("--rx", `${geometry.rx}deg`);
    piece.style.setProperty("--delay", `${delay}ms`);
    piece.style.setProperty("--speed", speed);
    piece.dataset.phase = String(randomBetween(0, Math.PI * 2));
    piece.dataset.amp = String(randomBetween(0.25, 1.12));

    architecture.appendChild(piece);
  }

  createWaveBars(station);
}
function showStatic(freq) {
  currentStation = null;
  signalSeeds.innerHTML = "";
  setTheme(null);
  setActiveButton(null);
  frequencyReadout.textContent = `${freq.toFixed(1)} FM`;
  screenText.textContent = `${freq.toFixed(1)} FM — signal drift`;
  roomText.textContent = "Between stations, the room becomes a hallway of half-built static.";
  storyText.textContent = "Keep tuning. The next station may build a completely different space.";
  updateOnAir();

  if (Date.now() - staticCooldown > 500) {
    room.classList.add("static-hit");
    window.setTimeout(() => room.classList.remove("static-hit"), 260);
    staticCooldown = Date.now();
  }

  buildSpace(null);
}

async function enterStation(station, shouldPlay = true) {
  if (!station) return;

  currentStation = station;
  signalSeeds.innerHTML = "";
  currentStreamAttempt = 0;
  setTheme(station);
  setActiveButton(station);
  tuner.value = station.frequency;
  frequencyReadout.textContent = `${station.frequency.toFixed(1)} FM`;
  screenText.textContent = `${station.frequency.toFixed(1)} FM — ${station.name}`;
  roomText.textContent = `${station.room}: ${station.story[0]}`;
  storyText.textContent = station.story[1] || station.story[0];
  player.volume = Number(volume.value);
  buildSpace(station);
  startStoryRotation();

  const candidates = streamCandidates(station);
  if (player.src !== candidates[0]) {
    player.src = candidates[0];
  }

  if (!shouldPlay) {
    updateOnAir();
    return;
  }

  try {
    await player.play();
  } catch (error) {
    screenText.textContent = `Click Play to start ${station.name}.`;
    console.error(error);
  }
  updateOnAir();
}

function tuneTo(freq, shouldPlay = true) {
  const numericFreq = clamp(Number(freq), TUNER_MIN, TUNER_MAX);
  tuner.value = numericFreq;
  const found = findStationByFrequency(numericFreq);

  if (found) {
    if (!currentStation || currentStation.id !== found.id) {
      enterStation(found, shouldPlay);
    }
    return;
  }

  player.pause();
  showStatic(numericFreq);
}

function startStoryRotation() {
  window.clearInterval(storyTimer);
  if (!currentStation) return;

  let index = 0;
  storyTimer = window.setInterval(() => {
    if (!currentStation) return;
    index = (index + 1) % currentStation.story.length;
    storyText.textContent = currentStation.story[index];
  }, 5200);
}

function startScan() {
  isScanning = true;
  scanBtn.textContent = "Stop";
  let freq = Number(tuner.value);

  scanTimer = window.setInterval(() => {
    freq += 0.1;
    if (freq > TUNER_MAX) freq = TUNER_MIN;
    tuner.value = freq;
    tuneTo(freq, true);
  }, 150);
}

function stopScan() {
  isScanning = false;
  scanBtn.textContent = "Scan";
  window.clearInterval(scanTimer);
}

function visualizerLoop() {
  const playing = currentStation && !player.paused;
  const station = currentStation || nearestStation(Number(tuner.value)).station;
  const vol = Number(volume.value);
  const stationEnergy = station ? station.energy : 0.18;
  const stationSpeed = station ? station.speed : 0.35;

  visualTime += 0.018 * stationSpeed * (playing ? 1 : 0.35);

  const pulse = playing
    ? clamp(
      0.22 +
      Math.abs(Math.sin(visualTime * 2.1)) * stationEnergy * 0.58 +
      Math.abs(Math.sin(visualTime * 5.3)) * stationEnergy * 0.28 +
      vol * 0.22,
      0.08,
      1
    )
    : 0.12 + Math.abs(Math.sin(visualTime * 0.9)) * 0.1;

  room.style.setProperty("--pulse", pulse.toFixed(3));
  room.style.setProperty("--breath", (0.3 + pulse * 0.7).toFixed(3));

  const pieces = architecture.querySelectorAll(".arch-piece");
  pieces.forEach((piece, i) => {
    const phase = Number(piece.dataset.phase || 0);
    const amp = Number(piece.dataset.amp || 1);
    const shimmer = 0.45 + Math.abs(Math.sin(visualTime * (1 + amp) + phase)) * 0.55;
    piece.style.opacity = String(clamp(0.15 + pulse * shimmer, 0.12, 0.95));
    piece.style.filter = `brightness(${1 + pulse * shimmer * 0.5})`;

    if (i % 5 === 0 && playing) {
      piece.style.scale = String(0.94 + pulse * 0.2);
    }
  });

  waveField.querySelectorAll(".wave-bar").forEach((bar, i) => {
    const h = 12 + Math.abs(Math.sin(visualTime * (1.4 + (i % 7) * 0.14) + i * 0.45)) * (70 + stationEnergy * 90) * (0.35 + vol);
    bar.style.setProperty("--bar-h", h.toFixed(1));
  });

  animationFrame = requestAnimationFrame(visualizerLoop);
}

function setMouseDepth(event) {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;
  const tiltY = (x - 0.5) * 8;
  const tiltX = (0.5 - y) * 5;
  room.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
  room.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  room.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
  room.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
}

function addSignalSeed(event) {
  const rect = roomShell.getBoundingClientRect();
  const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 5, 95);
  const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 8, 92);
  const seed = document.createElement("span");
  seed.className = `signal-seed seed-${currentStation ? currentStation.id : "idle"}`;
  seed.style.setProperty("--sx", `${x}%`);
  seed.style.setProperty("--sy", `${y}%`);
  seed.style.setProperty("--seed-z", `${randomBetween(80, 220)}px`);
  seed.style.setProperty("--seed-size", `${randomBetween(18, 44)}px`);
  seed.style.setProperty("--seed-delay", `${randomBetween(0, 0.45)}s`);
  signalSeeds.appendChild(seed);

  while (signalSeeds.children.length > 14) {
    signalSeeds.firstElementChild.remove();
  }

  storyText.textContent = currentStation
    ? currentStation.interaction
    : "A small marker appears, but the static cannot hold its shape for long.";

  window.setTimeout(() => seed.remove(), 9000);
}

function handleKeyboard(event) {
  const tag = event.target.tagName;
  if (["INPUT", "BUTTON", "TEXTAREA", "SELECT"].includes(tag)) return;

  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    stopScan();
    const step = event.shiftKey ? 1 : 0.1;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    tuneTo(Number(tuner.value) + direction * step, true);
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    playPause.click();
    return;
  }

  if (event.key.toLowerCase() === "s") {
    event.preventDefault();
    scanBtn.click();
    return;
  }

  if (event.key.toLowerCase() === "r") {
    event.preventDefault();
    rebuildBtn.click();
    return;
  }

  if (event.key.toLowerCase() === "d") {
    event.preventDefault();
    dimBtn.click();
  }
}

function initEvents() {
  stationGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".station-card");
    if (!card) return;
    stopScan();
    const station = stations.find((item) => item.id === card.dataset.id);
    enterStation(station, true);
  });

  tuner.addEventListener("input", () => {
    stopScan();
    tuneTo(tuner.value, true);
  });

  volume.addEventListener("input", () => {
    player.volume = Number(volume.value);
  });

  density.addEventListener("input", () => {
    buildSpace(currentStation);
  });

  playPause.addEventListener("click", async () => {
    if (!currentStation) {
      const closest = findStationByFrequency(Number(tuner.value)) || stations[0];
      await enterStation(closest, true);
      return;
    }

    if (player.paused) {
      try {
        await player.play();
      } catch (error) {
        screenText.textContent = "Playback blocked. Select the station again.";
        console.error(error);
      }
    } else {
      player.pause();
    }
    updateOnAir();
  });

  scanBtn.addEventListener("click", () => {
    if (isScanning) {
      stopScan();
    } else {
      startScan();
    }
  });

  rebuildBtn.addEventListener("click", () => {
    buildSpace(currentStation);
    storyText.textContent = currentStation
      ? `The ${currentStation.room} rebuilds itself from the live signal.`
      : "The static hallway redraws its walls.";
  });

  dimBtn.addEventListener("click", () => {
    room.classList.toggle("dimmed");
    dimBtn.textContent = room.classList.contains("dimmed") ? "Brighten" : "Dim";
  });

  player.addEventListener("play", updateOnAir);
  player.addEventListener("pause", updateOnAir);
  player.addEventListener("ended", updateOnAir);
  player.addEventListener("error", () => {
    if (!currentStation) return;
    const candidates = streamCandidates(currentStation);
    currentStreamAttempt += 1;
    if (currentStreamAttempt < candidates.length) {
      player.src = candidates[currentStreamAttempt];
      player.play().catch(() => {
        screenText.textContent = `Stream fallback ready. Press Play for ${currentStation.name}.`;
      });
    } else {
      screenText.textContent = `${currentStation.name} is not responding. Try another station.`;
      updateOnAir();
    }
  });

  roomShell.addEventListener("click", addSignalSeed);
  window.addEventListener("pointermove", setMouseDepth);
  window.addEventListener("keydown", handleKeyboard);
}

renderStationButtons();
createWaveBars(null);
initEvents();
showStatic(TUNER_MIN);
visualizerLoop();
