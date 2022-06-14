import React from 'react';
import ItemsNote from './ItemsNote';

export default function ListNote(props) {
  const { notes, onDeleteNote, onArchiveNote, searchTerm } = props;
  let renderedNotes = '';

  if (notes.length > 0) {
    if (searchTerm !== '') {
      let filteredNote = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      renderedNotes = filteredNote.map((note) => (
        <ItemsNote
          key={note.id}
          {...note}
          onDeleteNote={onDeleteNote}
          onArchiveNote={onArchiveNote}
        />
      ));
    } else {
      renderedNotes = notes.map((note) => {
        return (
          <ItemsNote
            key={note.id}
            {...note}
            onDeleteNote={onDeleteNote}
            onArchiveNote={onArchiveNote}
          />
        );
      });
    }
  } else {
    return <h5 className='empty-notes-archive'>Empty Notes In Archive</h5>;
  }

  return <ul className='note-list'>{renderedNotes}</ul>;
}
