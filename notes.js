const fs = require("fs");
const chalk = require("chalk");
const getNotes = function () {
  return "your notes";
};

const addNotes = function (title, body) {
  const notes = loadNotes();
  const duplicatedNotes = notes.filter(function (note) {
    return note.title === title;
  });

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

const saveNotes = function (notes) {
  let dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = function () {
  try {
    let dataBuffer = fs.readFileSync("notes.json");
    let dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });
  if (notes.length > notesToKeep.length ) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note deleted!"));
   
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote,
};
