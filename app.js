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
  addNote({ title, text }) {
    const id = Date.now();
    const newNote = new Note(id, title, text);
    this.notes = [...this.notes, newNote];
  }
}
