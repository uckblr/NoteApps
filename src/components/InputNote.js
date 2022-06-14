import React, { useState } from 'react';
export default function InputNote({ addInput }) {
  const [addNote, setAddNote] = useState({
    title: '',
    body: '',
  });
  const onChnageHandler = (event) => {
    const { name, value } = event.target;
    setAddNote({
      ...addNote,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    const message = document.querySelector('.message');
    const { title, body } = addNote;
    event.preventDefault();
    if (title === '' || body === '') {
      message.innerText = 'Please fill in all fields';
      message.classList.add('empty');

      setTimeout(() => {
        message.innerText = '';
        message.classList.remove('empty');
      }, 3000);
    } else {
      message.innerText = 'Note added';
      message.classList.add('success');
      setTimeout(() => {
        message.innerText = '';
        message.classList.remove('success');
      }, 3000);

      addInput({ title, body });
      setAddNote({
        title: '',
        body: '',
      });
    }
  };

  const limitTitleHandler = (event) => {
    const { value } = event.target;
    let title = '';
    value.length > 40 ? (title = value.substring(0, 40)) : (title = value);
    setAddNote({
      ...addNote,
      title,
    });
  };
  return (
    <section className='section input'>
      <header className='header'>
        <h2 className='title'>Create a New Note</h2>
      </header>
      <span className='message'></span>

      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='title'>
            <h3>Title</h3>
            <p className='max-title'>
              Characters Max {addNote.title.length}/40
            </p>
          </label>
          <input
            type='text'
            name='title'
            autoComplete='false'
            value={addNote.title}
            onChange={limitTitleHandler}
            placeholder='Input title'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='title'>
            <h3>Notes</h3>
          </label>
          <textarea
            type='text'
            name='body'
            autoComplete='false'
            value={addNote.body}
            onChange={onChnageHandler}
            placeholder='Input notes'
          />
        </div>

        <div className='form-group'>
          <button className='button-add' type='submit'>
            Add New Note
          </button>
        </div>
      </form>
    </section>
  );
}
