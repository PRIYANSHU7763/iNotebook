import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const{showAlert}=props
  const { note, updateNote } = props; // Destructring the note prop so that we can use it in our component.
  const context = useContext(noteContext); // use context as a hook
  const { deleteNote } = context; // destructuring


  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body align-items-center">
            <div className ="d-flex">
          <h5 className="card-title"> {note.title}</h5> <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); 
            showAlert("Deleted Successfull", "success")}}></i>
          <i className="fa-solid fa-pen-to-square mx-2"  onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description} </p>
         
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
