import React, { useState } from 'react';
import InputNote from '../components/InputNote';
import ListNote from '../components/ListNote';
import SearchNotes from '../components/SearchNotes';
import TitleNote from '../components/TitleNote';
import { getInitialData, showFormattedDate } from '../utils/data.js';

export default function NoteApps() {
  const [initialData, setInitialData] = useState(getInitialData());
  const [note, setNote] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const message = document.querySelector('.message.note-list');

  const inputNoteHandler = ({ title, body }) => {
    let newNote = [
      ...note,
      {
        id: +new Date(),
        title,
        body,
        createdAt: showFormattedDate(new Date()),
        archived: false,
      },
    ];
    setNote(newNote);
    setInitialData(newNote);
  };
  const deleteNoteHandler = (id) => {
    let filteredNote = note.filter((note) => note.id !== id);
    setNote(filteredNote);
    setInitialData(filteredNote);
    message.innerText = 'Note deleted';
    message.classList.add('empty');
    setTimeout(() => {
      message.innerText = '';
      message.classList.remove('empty');
    }, 3000);
  };
  const archiveNoteHandler = (id) => {
    setNote(
      note.map((note) => {
        if (note.id === id) {
          note.archived = !note.archived;
        }
        return note;
      })
    );
    setInitialData(note);
    message.innerText = 'Successfully';
    message.classList.add('success');
    setTimeout(() => {
      message.innerText = '';
      message.classList.remove('success');
    }, 3000);
  };

  const resetNoteHandler = () => {
    setNote(initialData);
  };
  const searchNoteHandler = (searchTitle) => {
    resetNoteHandler();
    setSearchTerm(searchTitle);
  };

  return (
    <>
      <header className='noteapp header'>
        <h1 className='title'>NotesApp</h1>
      </header>

      <main className='noteapp main'>
        <InputNote addInput={inputNoteHandler} />
        <section className='section-list'>
          <header className='list-header'>
            <TitleNote />
            <SearchNotes onSearchNote={searchNoteHandler} />
          </header>
          <span className='message note-list'></span>
          <ListNote
            searchTerm={searchTerm}
            notes={note.filter((note) => !note.archived)}
            onDeleteNote={deleteNoteHandler}
            onArchiveNote={archiveNoteHandler}
          />
        </section>
        <section className='section-archive'>
          <header className='archive-header'>
            <TitleNote title='Archived' />
          </header>
          <ListNote
            searchTerm={searchTerm}
            notes={note.filter((note) => note.archived)}
            onDeleteNote={deleteNoteHandler}
            onArchiveNote={archiveNoteHandler}
          />
        </section>
      </main>
    </>
  );
}
