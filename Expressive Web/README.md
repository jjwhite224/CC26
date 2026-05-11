# The Living Radio — Signal Rooms

An interactive web installation where live internet radio stations generate a room-like visual space. The visitor tunes across a radio band, locks onto stations, listens to the stream, and watches the room rebuild itself from the station's color, energy, rhythm, and mood.


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


## Technical notes

This project uses plain HTML, CSS, and JavaScript.

## Credits

- Live internet streams: SomaFM stream URLs.
- Built with HTML, CSS, and JavaScript.
