import React from 'react';

export default function SearchNotes({ onSearchNote }) {
  const onSearchHandler = (event) => {
    const { value } = event.target;
    onSearchNote(value);
  };
  return (
    <input
      type='text'
      placeholder='Search Title'
      autoComplete='false'
      name='title'
      className='input-search'
      onChange={onSearchHandler}
    />
  );
}
