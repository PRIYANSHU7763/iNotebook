// import React, { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setnotes] = useState(noteInitial);

  //Get All Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json);
    setnotes(json)
  }

  // Add A Note
  const addNote = async (title, description, tag) => {
    //To DO API Call
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });


    const note = response.json();

    setnotes(notes.concat(note))

  }

  //Delete A Node
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }

    });
    const json = response.json();
    console.log(json);

    console.log("Deleting The Note With ID" + id);
    const newNotes = notes.filter((note) => { return note._id !== id }) // agar note._id ka value id ke barabar nahi hai toh toh woh value return ho jayga nahi toh woh   note delete ho jayga and then setnotes meh  new notes ko set kar denge.
    setnotes(newNotes)

  }

  //Edit A Note

  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    //LOgic To Edit In Client.
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;


      }
      break
    }
    setnotes(notes);


  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
