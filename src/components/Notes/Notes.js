import React, { useContext, useEffect, useState } from "react";
import "./Notes.css";
import { TextareaAutosize, Alert } from "@mui/material";
import { NotesContext } from "../../context/MainContext";

const Notes = () => {
  let checkTyping = null;
  const [notesSaveAlert, setNotesSaveAlert] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const { setNotesValueFromContext } = useContext(NotesContext);
  const handleNotes = (e) => {
    const val = e.target.value;
    clearTimeout(checkTyping);
    setNotesValue(val);
    setNotesValueFromContext(notesValue);
    checkTyping = setTimeout(() => {
      if (val) {
        setNotesSaveAlert(
          <Alert className="alert" severity="success">
            Notes Saved Successfully!
          </Alert>
        );
      }
    }, 500);
  };
  useEffect(() => {
    return () => {
      clearTimeout(checkTyping);
    };
  }, []);

  return (
    <>
      {notesSaveAlert}
      <TextareaAutosize
        className="notes-area"
        placeholder="Take Notes...."
        style={{ height: 578 }}
        onChange={handleNotes}
      />
    </>
  );
};

export default Notes;
