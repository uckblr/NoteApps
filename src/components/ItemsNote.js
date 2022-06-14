import React from 'react';
import { showFormattedDate } from '../utils/data';
export default function ItemsNote(props) {
  const { id, title, body, createdAt, onDeleteNote, archived, onArchiveNote } =
    props;

  const deleteHandler = (id) => {
    onDeleteNote(id);
  };
  const archiveHandler = (id) => {
    onArchiveNote(id);
  };
  return (
    <li className='note-item'>
      <article>
        <header className='note-items-header'>
          <h4 className='note-items-title'>{title}</h4>
          <small>{showFormattedDate(createdAt)}</small>
        </header>
        <p>{body}</p>
      </article>
      <div className='buttons'>
        <button className='button-delete' onClick={() => deleteHandler(id)}>
          Delete
        </button>
        {archived ? (
          <button
            className='button-unarchive'
            onClick={() => archiveHandler(id)}
          >
            Un Archive
          </button>
        ) : (
          <button className='button-archive' onClick={() => archiveHandler(id)}>
            Archive
          </button>
        )}
      </div>
    </li>
  );
}
