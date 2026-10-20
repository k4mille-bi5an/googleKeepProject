# Sith Holocron — Note Taker

A small, framework-free note-taking app, themed as a Sith holocron: the crystalline vaults the Sith used to store forbidden knowledge. Record a teaching, rewrite it, or destroy it — everything persists in your browser between visits.

Built as a portfolio piece to show where my JavaScript is at so far. No frameworks, no build step — just HTML, CSS and plain JS.

## What it does

- Add a note (title + body)
- Edit a note in place — clicking **edit** loads it back into the form
- Delete a note
- Notes are saved to `localStorage`, so they survive a refresh

## What it demonstrates

- **ES6 classes** (`Note`, `Holocron`) to model the data and its behaviour
- **Array methods** — `map`, `filter`, `find` — and the **spread operator** for non-mutating updates
- **Template literals** to build the note grid from data
- **DOM work** — `querySelector`, `addEventListener`, and **event delegation** for the note buttons
- **Persistence** with `localStorage` (`JSON.stringify` / `JSON.parse`)
- Basic **HTML escaping** of user input before it's rendered

## Running it

No dependencies. Clone the repo and open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Built with

HTML, CSS and vanilla JavaScript. Icons from Google Material Symbols; fonts from Google Fonts (Cinzel, Rajdhani).

## A note on the theme

A personal learning / fan project. _Sith_, _holocron_ and related names belong to Lucasfilm; this is unofficial, non-commercial and just for fun.
