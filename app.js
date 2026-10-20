// ============================================================
//  Sith Holocron — a small note taker in vanilla JavaScript
//  Knowledge goes in, knowledge is kept. Nothing leaves the
//  browser: everything lives in localStorage.
// ============================================================

// ---- Grab the bits of the page we need to talk to ----
const form = document.querySelector(".note-form");
const titleInput = document.querySelector(".note-title");
const textInput = document.querySelector(".note-text");
const submitBtn = document.querySelector(".submit-btn");
const notesGrid = document.querySelector(".notes");
const emptyState = document.querySelector(".empty-state");

// Tracks which note (if any) we're currently editing.
let editingId = null;

// ---- A single note ----
class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

// ---- The holocron: holds every note and knows how to render them ----
class Holocron {
  constructor() {
    // Load whatever was saved last time, or start with an empty vault.
    this.notes = JSON.parse(localStorage.getItem("holocron-notes")) || [];
    // Next id continues from the last saved note so ids stay unique.
    this.id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 0;
  }

  addNote({ title, text }) {
    const newNote = new Note(this.id, title, text);
    this.notes = [...this.notes, newNote]; // spread: add without mutating the old array
    this.id++;
    this.save();
    this.render();
  }

  editNote(id, { title, text }) {
    this.notes = this.notes.map((note) => {
      if (note.id == id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
    this.save();
    this.render();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id != id);
    this.save();
    this.render();
  }

  save() {
    localStorage.setItem("holocron-notes", JSON.stringify(this.notes));
  }

  render() {
    // Build the markup for every note and drop it into the grid in one go.
    notesGrid.innerHTML = this.notes
      .map(
        (note) => `
        <article class="note" data-id="${note.id}">
          <h2 class="note-title-display">${escapeHtml(note.title)}</h2>
          <p class="note-text-display">${escapeHtml(note.text)}</p>
          <div class="note-actions">
            <button class="edit-btn" data-id="${note.id}" title="Edit">
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="delete-btn" data-id="${note.id}" title="Destroy">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </article>`,
      )
      .join("");

    // Show the "empty vault" message only when there are no notes.
    emptyState.style.display = this.notes.length ? "none" : "block";
  }
}

// ---- Keep user input from breaking (or injecting into) the page ----
function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[ch],
  );
}

// ---- Load an existing note back into the form to edit it ----
function startEdit(id) {
  const note = holocron.notes.find((n) => n.id == id);
  if (!note) return;

  titleInput.value = note.title;
  textInput.value = note.text;
  editingId = id;
  submitBtn.textContent = "Rewrite";
  titleInput.focus();
}

// ---- Wire everything up ----
const holocron = new Holocron();

// Submit = either create a new note or save an edit in progress.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const text = textInput.value.trim();
  if (!title && !text) return; // nothing worth keeping

  if (editingId !== null) {
    holocron.editNote(editingId, { title, text });
    editingId = null;
    submitBtn.textContent = "Inscribe";
  } else {
    holocron.addNote({ title, text });
  }

  form.reset();
  titleInput.focus();
});

// One listener on the grid handles every note's edit/delete button
// (event delegation — the buttons don't exist until render runs).
notesGrid.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".edit-btn");

  if (deleteBtn) holocron.deleteNote(deleteBtn.dataset.id);
  if (editBtn) startEdit(editBtn.dataset.id);
});

// First paint.
holocron.render();
