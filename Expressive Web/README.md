# The Living Radio — Signal Rooms

An interactive web installation where live internet radio stations generate a room-like visual space. The visitor tunes across a radio band, locks onto stations, listens to the stream, and watches the room rebuild itself from the station's color, energy, rhythm, and mood.

## Concept

This project responds to the prompt: **make an interactive website that feels like a house, a room, or a space.**

Instead of making a realistic bedroom or physical house, this project imagines a room made from radio signals. Each station becomes a different atmosphere with its own visual language: a blue radio receiver chamber, a warm vinyl lounge, a futuristic orbital player, a vaporwave sunset corridor, a terminal bunker, a noir radar lounge, and more. The visitor can linger by scanning stations, changing the density of the generated space, dimming the room, planting signal markers, and rebuilding the architecture.

## Core experience

1. The visitor enters an idle static room.
2. They tune the radio with the station cards, tuner slider, or keyboard.
3. When a station locks, the live audio stream starts.
4. The room changes color and generates architectural pieces.
5. The generative visualizer continues to move while the station plays.
6. The visitor can click inside the room to plant temporary signal markers.
7. The visitor can rebuild or scan the room to keep exploring.

## Controls

| Control | Action |
|---|---|
| Station cards | Tune directly to a station |
| Continuous tuner | Search the band manually |
| Play / Pause | Start or stop the selected station |
| Scan | Automatically move through the radio band |
| Rebuild Space | Regenerate the current station's room architecture |
| Dim / Brighten | Change the lighting mood |
| Volume slider | Control stream volume |
| Space density slider | Add or reduce generated architecture |
| Click inside the room | Plant a temporary signal marker |
| Left / Right arrow keys | Tune by 0.1 FM |
| Shift + Left / Right | Tune faster |
| Spacebar | Play / pause |
| S | Scan / stop scan |
| R | Rebuild the room |
| D | Dim / brighten |

## Stations

The station list is stored in `script.js` as an array of objects. Each station has:

- `frequency`
- `name`
- `stream`
- `color`
- `energy`
- `speed`
- `densityBias`
- `layout`
- `forms`
- `story`

The visual identity of each station is data-driven. For example, a quiet ambient station uses slower movement, softer shapes, and lower energy, while a higher-energy station creates denser motion and brighter architectural pulses.

## Included station rooms

| Frequency | Station | Visual room idea |
|---:|---|---|
| 88.4 | Drone Zone | Blue radio receiver chamber with slow broadcast rings and antenna ribs |
| 90.6 | Groove Salad | Warm vinyl lounge with record-groove rings and tonearm forms |
| 92.8 | Deep Space One | Futuristic orbital player with HUD rings and orbit nodes |
| 94.4 | Space Station Soma | Violet star cabin with windows and cabin light strips |
| 96.3 | Vaporwaves | Vaporwave corridor with neon grid, sunset disk, chrome spheres, and glass slabs |
| 98.1 | Beat Blender | Green equalizer workshop with mixer towers and pulse pads |
| 100.5 | Secret Agent | Noir radar lounge with blinds, dossier cards, and scanner sweep |
| 102.7 | Synphaera Radio | Crystalline ambient temple with prisms and suspended arcs |
| 105.1 | DEF CON Radio | Terminal bunker with code columns and scanlines |
| 107.9 | Mission Control | Telemetry command room with countdown rings and launch lines |


## Station visual theme system

The newest version adds a dedicated `themeLayer` inside the room shell. This layer generates station-specific motifs on top of the base architecture. The base architecture still uses `forms`, `layout`, `energy`, `speed`, and `densityBias`, but each station also now defines:

- `motif` — a readable label for the station card
- `visualizer` — the station's visualizer personality
- `color3` — a third accent color for richer styling
- `interaction` — the text shown when the visitor plants a signal marker

This lets the room feel like a set of different signal spaces rather than one room with different colors.

## Technical notes

This project uses plain HTML, CSS, and JavaScript.

The audio plays through a standard browser `<audio>` element. The visuals do **not** analyze the live audio waveform directly. This is intentional: many internet radio streams cause CORS issues when connected to a Web Audio `AnalyserNode`. Instead, the visualizer is generative and responds to station metadata, playback state, station energy, volume, scan state, and user interaction.

This makes the project more stable in Live Server and browser demos.

## File structure

```text
living-radio-space-app/
├── index.html      # Page structure and controls
├── style.css       # 3D room, station themes, animation, responsive layout
├── script.js       # Station data, tuning logic, room generation, playback
└── README.md       # Project explanation
```

## How to run

1. Open the folder in VS Code.
2. Use the Live Server extension.
3. Open `index.html`.
4. Click a station card or press Play.

Most browsers require audio to begin after a user interaction, so the first stream usually needs a click.

## Design goals

- Feel like a room, not a dashboard.
- Encourage lingering and exploration.
- Make each station visually distinct through custom motifs, visualizer behavior, and generated architecture.
- Use live audio without reintroducing CORS errors.
- Keep the interface clean enough for a final class critique.

## Credits

- Live internet streams: SomaFM stream URLs.
- Built with HTML, CSS, and JavaScript.
