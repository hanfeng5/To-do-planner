import React, { useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false); // set the isEditing status to false as initialization
  const [newName, setNewName] = useState('');
  
  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    alert("Okie! Edited!");
    setNewName('');
    setEditing(false);
  }

  console.log(props);
  const viewingTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input 
          id={props.id} 
          type="checkbox" 
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskComplete(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button 
          type="button" 
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
  </div>
  )

  const editingTemplate = (
    <form className = "stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          What would you like to get done now?
        </label>
        <input 
          id={props.id} 
          className="todo-text" 
          type="text"
          value = {newName}
          onChange = {handleChange}
          />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={handleSubmit}>
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  )
  return <li className="todo">{isEditing? editingTemplate : viewingTemplate}</li>
}