class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

class App {
  constructor() {
    this.notes = [];
  }

  addNote(id, { title, text }) {
    const newNote = new Note(id, title, text);
    this.notes = [...this.notes, newNote];
  }

  editNote(id, { title, text }) {
    this.notes = this.notes.map((note) => {
      if (note.id == id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
  }

  displayNotes() {
    this.notes.map((note) =>
      console.log(`
        ID: ${note.id}
        Title: ${note.title}
        Text: ${note.text}
        `),
    );
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id != id);
  }
}

const note1 = {
  title: "Test note",
  text: "text",
};
const updatedNote = {
  title: "updatedTest note",
  text: "updated text",
};
const app = new App();
app.addNote(0, note1);
app.addNote(1, note1);
app.addNote(2, note1);
app.addNote(3, note1);

console.log("after adding notes", app.notes);

setTimeout(() => {
  app.editNote(2, updatedNote);
  console.log("after editing", app.notes);
}, 1000);

setTimeout(() => {
  app.deleteNote(2);
  console.log("after deleting", app.notes);
}, 1000);
