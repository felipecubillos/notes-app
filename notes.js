const fs = require("fs");
const chalk = require("chalk");
const getNotes = function () {
  return "your notes";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicatedNotes = notes.filter((note) => note.title === title);

  if (duplicatedNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("Note added!!!"));
  } else {
    console.log(chalk.red("Duplicated note title"));
  }
};

const saveNotes = (notes) => {
  let dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = () => {
  try {
    let dataBuffer = fs.readFileSync("notes.json");
    let dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note deleted!"));
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const listNotes = () =>{
  const notes = loadNotes();
  return notes.forEach(note => {
    console.log(note.title)
  });
}
const readNote = (title) =>{
  const notes = loadNotes();
  const note = notes.find((note)=> note.title === title );
if (note) {
  console.log(chalk.inverse(note.body));
} else {
  console.log(chalk.red.inverse('note not found'));
}

}

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
