import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext); // use context as a hook

  const { addNote } = context; // destructuring
  const [note, setNote] = useState({ title: " ", description: " ", tag: "" })
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote ({ title: " ", description: " ", tag: "" })
     props.showAlert("Note Added Successfully", "success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="email"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={note.title}
            />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}

            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required
              value={note.tag}

            />
          </div>

          <button disabled={note.title.length<5|| note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
            Add Note
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddNote;

