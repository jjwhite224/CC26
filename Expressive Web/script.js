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
const nowPlayingText = document.getElementById("nowPlayingText");
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
let archPieces = [];
let waveBars = [];

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

let nowPlayingTimer = null;
let p5Instance = null;

function updateOnAir() {
  const live = Boolean(currentStation && !player.paused);
  onAir.textContent = live ? "ON AIR" : "OFF AIR";
  onAir.classList.toggle("live", live);
  playPause.textContent = live ? "Pause" : "Play";
}

function removeP5Sketch() {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
}

function installP5Sketch(station) {
  removeP5Sketch();
  if (!station) return;

  const container = document.getElementById('p5-container');
  if (!container) return;

  const sketches = {
    drone: createDroneZoneSketch,
    groove: createGrooveSketch,
    space: createDeepSpaceSketch,
    station: createStationSketch,
    vapor: createVaporwavesSketch,
    beat: createBeatSketch,
    agent: createAgentSketch,
    synphaera: createSynphaerSketch,
    defcon: createDefconSketch,
    mission: createMissionSketch
  };

  const createSketch = sketches[station.id];
  if (createSketch) {
    p5Instance = new p5(createSketch, 'p5-container');
  }
}

function createDroneZoneSketch(p) {
  const particles = [];
  const ripples = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    p.clear();
    for (let i = 0; i < 20; i += 1) {
      particles.push({ x: p.random(p.width), y: p.random(p.height), vx: p.random(-0.05, 0.05), vy: p.random(-0.1, 0.1), life: p.random(0.5, 1) });
    }
  };

  p.draw = function () {
    p.clear();
    p.noStroke();
    p.fill(147, 197, 253, 25);
    p.rect(0, 0, p.width, p.height);

    particles.forEach((par) => {
      par.x += par.vx;
      par.y += par.vy;
      par.life -= 0.003;
      if (par.life <= 0) {
        par.x = p.random(p.width);
        par.y = p.random(p.height);
        par.life = p.random(0.5, 1);
      }
      p.fill(147, 197, 253, par.life * 80);
      p.ellipse(par.x, par.y, 4);
    });

    const baseAlpha = 35;
    for (let i = 0; i < 3; i += 1) {
      p.stroke(147, 197, 253, baseAlpha + i * 12);
      p.strokeWeight(1.5);
      p.noFill();
      const radius = p.frameCount * 0.2 + i * 70;
      p.circle(p.width * 0.5, p.height * 0.45, radius % (p.width * 1.2));
    }

    ripples.forEach((rip, index) => {
      rip.r += 1.2;
      rip.life -= 0.018;
      p.stroke(147, 197, 253, rip.life * 140);
      p.strokeWeight(2);
      p.noFill();
      p.circle(rip.x, rip.y, rip.r);
      if (rip.life <= 0) ripples.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'drone' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      ripples.push({ x: p.mouseX, y: p.mouseY, r: 20, life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createGrooveSketch(p) {
  const particles = [];
  const grooves = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 25; i += 1) {
      particles.push({ x: p.random(p.width), y: p.random(p.height * 0.65, p.height), vy: p.random(-0.2, -0.02), alpha: p.random(40, 90) });
    }
  };

  p.draw = function () {
    p.clear();
    p.noStroke();
    p.fill(250, 204, 21, 18);
    p.rect(0, 0, p.width, p.height);

    grooves.forEach((groove, index) => {
      groove.r += 1.0;
      groove.life -= 0.015;
      p.stroke(250, 204, 21, groove.life * 90);
      p.noFill();
      p.strokeWeight(2);
      p.circle(groove.x, groove.y, groove.r);
      if (groove.life <= 0) grooves.splice(index, 1);
    });

    particles.forEach((par) => {
      par.y += par.vy;
      if (par.y < 0) par.y = p.height;
      p.fill(250, 204, 21, par.alpha);
      p.ellipse(par.x, par.y, 4, 4);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'groove' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      grooves.push({ x: p.mouseX, y: p.mouseY, r: 10, life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createDeepSpaceSketch(p) {
  const stars = [];
  const satellites = [];
  const hud = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 50; i += 1) {
      stars.push({ x: p.random(p.width), y: p.random(p.height), size: p.random(1, 2.5), alpha: p.random(60, 140) });
    }
    for (let i = 0; i < 3; i += 1) {
      hud.push({ r: 80 + i * 90, angle: p.random(p.TWO_PI) });
    }
  };

  p.draw = function () {
    p.clear();
    p.noStroke();
    p.fill(8, 14, 32, 50);
    p.rect(0, 0, p.width, p.height);

    stars.forEach((star) => {
      star.alpha += p.random(-1, 1);
      star.alpha = p.constrain(star.alpha, 40, 180);
      p.fill(167, 243, 249, star.alpha);
      p.ellipse(star.x, star.y, star.size);
    });

    const cx = p.width / 2;
    const cy = p.height / 2;

    hud.forEach((ring) => {
      ring.angle += 0.003;
      p.stroke(167, 243, 249, 90);
      p.strokeWeight(1.2);
      p.noFill();
      p.circle(cx, cy, ring.r);
      const sx = cx + p.cos(ring.angle) * (ring.r / 2);
      const sy = cy + p.sin(ring.angle) * (ring.r / 2);
      p.fill(168, 85, 247, 180);
      p.noStroke();
      p.ellipse(sx, sy, 6);
    });

    satellites.forEach((sat, index) => {
      sat.angle += sat.speed;
      sat.life -= 0.012;
      const x = cx + p.cos(sat.angle) * sat.radius;
      const y = cy + p.sin(sat.angle) * sat.radius;
      p.fill(168, 85, 247, sat.life * 200);
      p.ellipse(x, y, 8);
      if (sat.life <= 0) satellites.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'space' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      satellites.push({ angle: p.random(p.TWO_PI), radius: p.random(60, 140), speed: p.random(0.004, 0.01), life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createStationSketch(p) {
  const stars = [];
  const windows = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 40; i += 1) {
      stars.push({ x: p.random(p.width), y: p.random(p.height), alpha: p.random(60, 130), speed: p.random(0.005, 0.02) });
    }
    for (let i = 0; i < 6; i += 1) {
      windows.push({ x: p.random(p.width), y: p.random(p.height * 0.6), alpha: p.random(40, 90), phase: p.random(1000) });
    }
  };

  p.draw = function () {
    p.clear();
    p.noStroke();
    p.fill(168, 85, 247, 35);
    p.rect(0, 0, p.width, p.height);

    stars.forEach((star) => {
      star.y += star.speed;
      if (star.y > p.height) star.y = 0;
      p.fill(167, 243, 249, star.alpha);
      p.ellipse(star.x, star.y, 3);
    });

    windows.forEach((win) => {
      const flicker = p.sin((p.frameCount + win.phase) * 0.02) * 20;
      p.fill(168, 85, 247, win.alpha + flicker);
      p.rect(win.x, win.y, 22, 22);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };
}

function createVaporwavesSketch(p) {
  const lines = [];
  const fingerprints = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 15; i += 1) {
      lines.push({ y: p.height * 0.2 + i * 30, offset: p.random(1000) });
    }
  };

  p.draw = function () {
    p.clear();
    p.background(16, 20, 38, 40);
    p.fill(317, 100, 85, 15);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    p.noFill();
    lines.forEach((line) => {
      line.offset += 0.015;
      p.stroke(320, 100, 90, 55);
      p.beginShape();
      for (let x = 0; x <= p.width; x += 40) {
        const y = line.y + p.sin(x * 0.02 + line.offset) * 12;
        p.vertex(x, y);
      }
      p.endShape();
    });

    fingerprints.forEach((fp, index) => {
      fp.y += 0.8;
      fp.life -= 0.015;
      p.fill(320, 100, 100, fp.life * 90);
      p.noStroke();
      p.rect(fp.x - 10, fp.y, 20, 20, 4);
      if (fp.life <= 0) fingerprints.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'vapor' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      fingerprints.push({ x: p.mouseX, y: p.mouseY, life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createBeatSketch(p) {
  const bars = [];
  const pulses = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 8; i += 1) {
      bars.push({ x: 50 + i * 60, height: p.random(40, 120), target: p.random(40, 140) });
    }
  };

  p.draw = function () {
    p.clear();
    p.fill(52, 211, 153, 30);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    bars.forEach((bar) => {
      bar.height += (bar.target - bar.height) * 0.06;
      if (p.frameCount % 50 === 0) bar.target = p.random(40, 160);
      p.fill(52, 211, 153, 180);
      p.rect(bar.x, p.height - bar.height - 80, 24, bar.height);
    });

    pulses.forEach((pulse, index) => {
      pulse.size += 1.5;
      pulse.life -= 0.015;
      p.stroke(52, 211, 153, pulse.life * 150);
      p.noFill();
      p.rect(pulse.x - pulse.size / 2, pulse.y - pulse.size / 2, pulse.size, pulse.size, 6);
      if (pulse.life <= 0) pulses.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'beat' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      pulses.push({ x: p.mouseX, y: p.mouseY, size: 12, life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createAgentSketch(p) {
  const clues = [];
  const blinds = [];
  let radarAngle = 0;

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 5; i += 1) {
      blinds.push({ y: i * (p.height / 5), offset: p.random(1000) });
    }
  };

  p.draw = function () {
    p.clear();
    p.background(8, 8, 12, 40);
    radarAngle += 0.015;
    const cx = p.width / 2;
    const cy = p.height / 2;

    p.fill(249, 115, 22, 18);
    p.noStroke();
    blinds.forEach((blind) => {
      blind.offset += 0.03;
      const y = blind.y + p.sin(blind.offset) * 6;
      p.rect(0, y, p.width, 8);
    });

    p.stroke(249, 115, 22, 110);
    p.strokeWeight(2);
    p.noFill();
    p.circle(cx, cy, 140);
    p.line(cx, cy, cx + p.cos(radarAngle) * 70, cy + p.sin(radarAngle) * 70);

    clues.forEach((clue, index) => {
      clue.life -= 0.015;
      p.fill(249, 115, 22, clue.life * 180);
      p.noStroke();
      p.rect(clue.x - 5, clue.y - 5, 10, 10);
      if (clue.life <= 0) clues.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'agent' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      clues.push({ x: p.mouseX, y: p.mouseY, life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createSynphaerSketch(p) {
  const beams = [];
  const shards = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 15; i += 1) {
      shards.push({ x: p.random(p.width), y: p.random(p.height), size: p.random(20, 50), angle: p.random(p.TWO_PI) });
    }
  };

  p.draw = function () {
    p.clear();
    p.background(12, 20, 36, 40);
    p.stroke(56, 189, 248, 110);
    p.noFill();
    shards.forEach((shard) => {
      shard.angle += 0.001;
      p.push();
      p.translate(shard.x, shard.y);
      p.rotate(shard.angle);
      p.rect(-shard.size / 2, -shard.size / 2, shard.size, shard.size);
      p.line(-shard.size / 2, 0, shard.size / 2, 0);
      p.line(0, -shard.size / 2, 0, shard.size / 2);
      p.pop();
    });

    beams.forEach((beam, index) => {
      beam.life -= 0.015;
      p.stroke(56, 189, 248, beam.life * 150);
      p.line(beam.x1, beam.y1, beam.x2, beam.y2);
      if (beam.life <= 0) beams.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'synphaera' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      for (let i = 0; i < 3; i += 1) {
        beams.push({ x1: p.mouseX, y1: p.mouseY, x2: p.mouseX + p.random(-120, 120), y2: p.mouseY + p.random(-120, 120), life: 1 });
      }
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createDefconSketch(p) {
  const chars = [];
  const packets = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    p.textSize(12);
    p.textFont('monospace');
    for (let i = 0; i < 100; i += 1) {
      chars.push({ x: p.random(p.width), y: p.random(p.height), char: String.fromCharCode(48 + p.floor(p.random(10))), alpha: p.random(30, 120) });
    }
  };

  p.draw = function () {
    p.clear();
    p.background(0, 10, 0, 40);
    chars.forEach((item) => {
      item.alpha += p.random(-1.5, 1.5);
      item.alpha = p.constrain(item.alpha, 30, 140);
      p.fill(34, 197, 94, item.alpha);
      p.text(item.char, item.x, item.y);
    });

    packets.forEach((packet, index) => {
      packet.x += packet.vx;
      packet.life -= 0.015;
      p.fill(34, 197, 94, packet.life * 180);
      p.noStroke();
      p.rect(packet.x, packet.y, 6, 6);
      if (packet.life <= 0) packets.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'defcon' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      packets.push({ x: p.mouseX, y: p.mouseY, vx: p.random(3, 6), life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function createMissionSketch(p) {
  const pings = [];
  const rings = [];

  p.setup = function () {
    const container = document.getElementById('p5-container');
    p.createCanvas(container.clientWidth, container.clientHeight);
    for (let i = 0; i < 3; i += 1) {
      rings.push({ r: 70 + i * 65, angle: p.random(p.TWO_PI) });
    }
  };

  p.draw = function () {
    p.clear();
    p.background(16, 20, 38, 40);
    const cx = p.width / 2;
    const cy = p.height / 2;
    p.noFill();
    p.stroke(248, 250, 252, 120);
    p.strokeWeight(1.6);
    rings.forEach((ring) => {
      ring.angle += 0.003;
      p.circle(cx, cy, ring.r);
    });

    pings.forEach((ping, index) => {
      ping.x += ping.vx;
      ping.life -= 0.015;
      p.fill(248, 250, 252, ping.life * 200);
      p.noStroke();
      p.rect(ping.x, ping.y, 4, 4);
      if (ping.life <= 0) pings.splice(index, 1);
    });
  };

  p.windowResized = function () {
    const container = document.getElementById('p5-container');
    p.resizeCanvas(container.clientWidth, container.clientHeight);
  };

  p.mousePressed = function () {
    if (currentStation?.id === 'mission' && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      pings.push({ x: 30, y: p.mouseY, vx: 3.6, life: 1 });
      addSignalSeed({ clientX: p.mouseX, clientY: p.mouseY });
      return false;
    }
  };
}

function setNowPlaying(artist, song, fallback) {
  if (artist && song) {
    nowPlayingText.textContent = `Now playing: ${song} — ${artist}`;
  } else if (fallback) {
    nowPlayingText.textContent = fallback;
  } else {
    nowPlayingText.textContent = `Now playing: ${currentStation?.name ?? "SomaFM"}`;
  }
}

function parseNowPlayingTitle(title = "") {
  const clean = title.trim();
  if (!clean) return null;
  const parts = clean.split(/\s+[-—|]\s+/);
  if (parts.length >= 2) {
    return { artist: parts[0].trim(), song: parts.slice(1).join(" - ").trim() };
  }
  return { artist: "SomaFM", song: clean };
}

async function fetchNowPlaying(station) {
  if (!station?.slug) return null;
  const url = `https://somafm.com/${station.slug}/songhistory.html`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Song history fetch failed: ${response.status}`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const row = Array.from(doc.querySelectorAll("tr")).find((tr) => tr.textContent.includes("(Now)"));
    if (!row) return null;
    const cells = row.querySelectorAll("td");
    if (cells.length >= 3) {
      const artist = cells[1].textContent.trim();
      const song = cells[2].textContent.trim();
      return { artist, song };
    }
    const nowText = row.textContent.trim();
    const match = nowText.match(/\)\s*(.*?)\s+(.*?)\s+$/);
    if (match) {
      return { artist: match[1].trim(), song: match[2].trim() };
    }
    return null;
  } catch (error) {
    console.warn("Now playing metadata failed:", error);
    return null;
  }
}

function stopNowPlayingRefresh() {
  window.clearInterval(nowPlayingTimer);
  nowPlayingTimer = null;
}

async function refreshNowPlaying() {
  if (!currentStation) {
    setNowPlaying("", "", "No track data available while tuning.");
    return;
  }
  const info = await fetchNowPlaying(currentStation);
  if (info) {
    setNowPlaying(info.artist, info.song);
  } else {
    setNowPlaying("", "", `Now playing: ${currentStation.name} live on SomaFM`);
  }
}

function startNowPlayingRefresh() {
  stopNowPlayingRefresh();
  refreshNowPlaying();
  nowPlayingTimer = window.setInterval(refreshNowPlaying, 20000);
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
  const light = densityValue < 24 ? 0 : densityValue < 42 ? 1 : 2;

  switch (station.id) {
    case "drone":
      addThemePieces("radio-ring", 2 + light, { xMin: 32, xMax: 68, yMin: 30, yMax: 62, wMin: 90, wMax: 260, hMin: 90, hMax: 260, zMin: -190, zMax: 120, durMin: 9, durMax: 16 });
      addThemePieces("antenna-rib", 3, { xMin: 10, xMax: 90, yMin: 18, yMax: 78, wMin: 4, wMax: 9, hMin: 100, hMax: 310, zMin: -230, zMax: 60, rMin: -8, rMax: 8 });
      break;

    case "groove":
      addThemePieces("vinyl-disc", 1 + light, { xMin: 22, xMax: 76, yMin: 45, yMax: 76, wMin: 120, wMax: 300, hMin: 120, hMax: 300, zMin: -100, zMax: 180, durMin: 7, durMax: 15 });
      addThemePieces("tone-arm", 1, { xMin: 55, xMax: 82, yMin: 34, yMax: 52, wMin: 120, wMax: 220, hMin: 6, hMax: 12, zMin: 80, zMax: 220, rMin: -36, rMax: -18 });
      break;

    case "space":
      addThemePieces("hud-ring", 2 + light, { xMin: 32, xMax: 68, yMin: 32, yMax: 64, wMin: 120, wMax: 310, hMin: 120, hMax: 310, zMin: -160, zMax: 220, durMin: 8, durMax: 15 });
      addThemePieces("orbit-node", 6, { xMin: 18, xMax: 82, yMin: 18, yMax: 78, wMin: 10, wMax: 24, hMin: 10, hMax: 24, zMin: -210, zMax: 260 });
      break;

    case "station":
      addThemePieces("cabin-window", 2 + light, { xMin: 14, xMax: 86, yMin: 24, yMax: 54, wMin: 100, wMax: 220, hMin: 56, hMax: 140, zMin: -220, zMax: 120, rMin: -8, rMax: 8 });
      addThemePieces("star-strip", 4, { xMin: 12, xMax: 88, yMin: 60, yMax: 82, wMin: 80, wMax: 230, hMin: 3, hMax: 8, zMin: -180, zMax: 160 });
      break;

    case "vapor":
      addThemePiece("vapor-sun", { xMin: 43, xMax: 57, yMin: 27, yMax: 39, wMin: 170, wMax: 260, hMin: 170, hMax: 260, zMin: -230, zMax: -60, durMin: 10, durMax: 18 });
      addThemePieces("chrome-sphere", 1 + light, { xMin: 18, xMax: 84, yMin: 40, yMax: 76, wMin: 52, wMax: 110, hMin: 52, hMax: 110, zMin: -80, zMax: 240 });
      addThemePieces("glass-slab", 3 + light, { xMin: 12, xMax: 90, yMin: 22, yMax: 70, wMin: 70, wMax: 190, hMin: 88, hMax: 220, zMin: -220, zMax: 140, rMin: -32, rMax: 32 });
      break;

    case "beat":
      addThemePieces("eq-tower", 4 + light, { xMin: 10, xMax: 90, yMin: 44, yMax: 76, wMin: 16, wMax: 38, hMin: 80, hMax: 260, zMin: -150, zMax: 220, rMin: -2, rMax: 2, durMin: 2.5, durMax: 5.8 });
      addThemePieces("pulse-pad", 3, { xMin: 16, xMax: 86, yMin: 66, yMax: 84, wMin: 80, wMax: 170, hMin: 24, hMax: 62, zMin: 20, zMax: 260 });
      break;

    case "agent":
      addThemePiece("radar-sweep", { xMin: 42, xMax: 58, yMin: 36, yMax: 54, wMin: 210, wMax: 300, hMin: 210, hMax: 300, zMin: -140, zMax: 80, durMin: 7, durMax: 12 });
      addThemePieces("blind-slat", 4, { xMin: 12, xMax: 88, yMin: 24, yMax: 68, wMin: 130, wMax: 300, hMin: 6, hMax: 14, zMin: -230, zMax: 120, rMin: -12, rMax: 12 });
      addThemePieces("dossier-card", 1 + light, { xMin: 22, xMax: 78, yMin: 38, yMax: 72, wMin: 70, wMax: 135, hMin: 90, hMax: 170, zMin: -60, zMax: 180, rMin: -10, rMax: 10 });
      break;

    case "synphaera":
      addThemePieces("crystal-spire", 4 + light, { xMin: 14, xMax: 86, yMin: 42, yMax: 78, wMin: 28, wMax: 70, hMin: 120, hMax: 280, zMin: -190, zMax: 200, rMin: -24, rMax: 24, durMin: 6, durMax: 12 });
      addThemePieces("prism-arc", 2, { xMin: 30, xMax: 70, yMin: 26, yMax: 60, wMin: 120, wMax: 260, hMin: 60, hMax: 140, zMin: -160, zMax: 180 });
      break;

    case "defcon":
      addThemePieces("terminal-code", 4 + light, { xMin: 8, xMax: 92, yMin: 22, yMax: 72, wMin: 46, wMax: 120, hMin: 80, hMax: 220, zMin: -230, zMax: 130, rMin: -3, rMax: 3, durMin: 3, durMax: 7 });
      addThemePieces("scan-line", 2, { xMin: 10, xMax: 90, yMin: 18, yMax: 84, wMin: 180, wMax: 420, hMin: 2, hMax: 5, zMin: -200, zMax: 200 });
      break;

    case "mission":
      addThemePieces("telemetry-line", 4 + light, { xMin: 12, xMax: 88, yMin: 26, yMax: 70, wMin: 120, wMax: 360, hMin: 3, hMax: 8, zMin: -240, zMax: 120, rMin: -5, rMax: 5 });
      addThemePieces("countdown-ring", 2, { xMin: 30, xMax: 70, yMin: 28, yMax: 62, wMin: 120, wMax: 280, hMin: 120, hMax: 280, zMin: -170, zMax: 160, durMin: 9, durMax: 14 });
      break;
  }
}

function createWaveBars(station = currentStation) {
  waveField.innerHTML = "";
  const visualizer = station ? station.visualizer : "static-drift";
  const barCount = station && station.id === "beat" ? 32 : station && station.id === "vapor" ? 28 : 24;
  waveField.dataset.visualizer = visualizer;
  waveBars = [];

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < barCount; i += 1) {
    const bar = document.createElement("span");
    bar.className = `wave-bar visualizer-${visualizer}`;
    bar.style.setProperty("--bar-h", String(randomBetween(18, 130)));
    bar.style.setProperty("--bar-i", String(i));
    fragment.appendChild(bar);
    waveBars.push(bar);
  }
  waveField.appendChild(fragment);
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

  const count = Math.min(50, Math.round(Number(density.value) * station.densityBias));
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

    piece.addEventListener('mouseenter', () => piece.style.setProperty('--hover-scale', '1.05'));
    piece.addEventListener('mouseleave', () => piece.style.setProperty('--hover-scale', '1'));

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
  setNowPlaying("", "", "No track data available while tuning.");
  roomText.textContent = "Between stations, the room becomes a hallway of half-built static.";
  storyText.textContent = "Keep tuning. The next station may build a completely different space.";
  stopNowPlayingRefresh();
  installP5Sketch(null);
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
  startNowPlayingRefresh();
  installP5Sketch(station);

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
  if (document.hidden) {
    animationFrame = requestAnimationFrame(visualizerLoop);
    return;
  }

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

  waveBars.forEach((bar, i) => {
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
