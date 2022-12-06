import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial=[];
  const [notes,setNotes]=useState(notesInitial);
  
  //GET ALL NOTES-
  const getnotes=async ()=>{
    //API CALL-
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NGJiNzNkOGUyZDEwMjZhMzkyZDAwIn0sImlhdCI6MTY2ODcxNjQwMX0.eUDfY1j6yopOnscTsHEkaIDSU-BeXWFrMX9O_ftHTx4"
      },
    });
    const json= await response.json();
    // console.log(json);
    setNotes(json)
  }
  
  //ADD A NOTE-
  const addnote = async (title, description, tag) => {
  //API CALL-
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NGJiNzNkOGUyZDEwMjZhMzkyZDAwIn0sImlhdCI6MTY2ODcxNjQwMX0.eUDfY1j6yopOnscTsHEkaIDSU-BeXWFrMX9O_ftHTx4"
    },
    body: JSON.stringify({title,description,tag})
    
  });

  // const json = response.json();
  //LOGIC TO ADD A NOTE-
    const note = {
      "_id": "63792d5b71dae2f89d3b6e04",
      "user": "6374bb73d8e2d1026a392d01",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-11-19T19:24:11.678Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  //DELETE A NOTE-
  const deletenote = async (id) => {
    //API CALL-
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NGJiNzNkOGUyZDEwMjZhMzkyZDAwIn0sImlhdCI6MTY2ODcxNjQwMX0.eUDfY1j6yopOnscTsHEkaIDSU-BeXWFrMX9O_ftHTx4"
      }
    })
    const json= await response.json();
    console.log(json);
    console.log("Deleting a note with id " + id);
    const newNotes = notes.filter((note) => { return note._id != id })    //notes.filter returns an array of all the notes whose id is not matching with the id which we are passing to the deletenote() function.Thus which note which we wanna delete.
    setNotes(newNotes)
  }

  //EDIT A NOTE-
  const editnote = async (id, title, description, tag) => {
    //API CALL-
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NGJiNzNkOGUyZDEwMjZhMzkyZDAwIn0sImlhdCI6MTY2ODcxNjQwMX0.eUDfY1j6yopOnscTsHEkaIDSU-BeXWFrMX9O_ftHTx4"
      },
      body: JSON.stringify({title,description,tag})
    })
    const json = await response.json();
    let newnote=JSON.parse(JSON.stringify(notes))  //We will have to create a newnote instead of editing the old one if we want it to update without reloading in the frontend.
    //LOGIC TO EDIT A NOTE-
    for (let index = 0; index < newnote.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    setNotes(newnote);
  }

  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote,getnotes }}>  {/*Now we can access notes as well as setNotes whenever we want to update the notes.*/}
      {props.children}
    </noteContext.Provider>
  )
};
export default NoteState;