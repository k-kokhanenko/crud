import '../css/bulma.css'
import React, { useEffect, useState } from 'react';

export const Сrud = () => {

// нам нужно в state хранить текущий список и при изменении он будет перерисовываться
  const [notes, setNotes] = useState([]);
  
  const loadNotes = () => {
    fetch("http://localhost:7070/notes", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotes(data);
      })
      .catch((error) => console.log(error));
  }

  const addNote = (text) => {
    const newNote = { "id": 0, "content": text };

    fetch("http://localhost:7070/notes", { method: "POST",  body: JSON.stringify(newNote) })
      .then((data) => {
        loadNotes();
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(loadNotes, []); // componentDidMount

  const deleteNote = (id) => {
    fetch(`http://localhost:7070/notes/${id}`, { method: "DELETE" })
      .then((data) => {        
        console.log(data);
        loadNotes();
      })
      .catch((error) => console.log(error));
  }  

  const handleOnUpdate = () => {
    loadNotes();
  }

  const handleOnAddNewNote = () => {     
    const input = document.querySelector('.note');
    addNote(input.value);
  }

  const handleOnDeleteNote = (event) => {    
    const id = event.target.dataset.id;
    deleteNote(id);
  }  

  const showNotesItems = notes.map(function(note) {
    return <div className="cell box" key={note.id}>
        <div>{note.content}</div>
        <button className="button is-danger is-small" data-id={note.id} onClick={handleOnDeleteNote}>Удалить</button>
    </div>;
 });
  
  return (
    <>      
      <div className='grid'>
        {showNotesItems}
      </div>

      <div className="field box">
          <label className="label">Новая заметка</label>
          <div className="control">
              <input className="input note" type="text" name="distance" placeholder="Введите текст заметки"/>
              <button className="button is-primary is-small" onClick={handleOnAddNewNote}>Добавить</button> 
              <button className="button is-link is-small" onClick={handleOnUpdate}>Обновить</button> 
          </div>
      </div>
    </>
  )
}
