import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "6377ec3e4434012c07fd45a0",
          "user": "6374bb73d8e2d1026a392d00",
          "title": "Go Gym",
          "description": "Please go to gym",
          "tag": "Bodybuilding Powerlifting Training",
          "date": "2022-11-18T20:34:06.182Z",
          "__v": 0
        },
        {
          "_id": "63792d5b71dae2f89d3b6e03",
          "user": "6374bb73d8e2d1026a392d00",
          "title": "Study",
          "description": "Maths",
          "tag": "Algebra Geometry Trignometry",
          "date": "2022-11-19T19:24:11.678Z",
          "__v": 0
        }
      ]
    const [notes,setNotes]=useState(notesInitial)

    //ADD A NOTE-
    const addnote=(title,description,tag)=>{
      const note={
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
    const deletenote=()=>{

    }

    //EDIT A NOTE-
    const editnote=()=>{

    }

    return (
        <noteContext.Provider value={{notes,addnote,deletenote,editnote}}>  {/*Now we can access notes as well as setNotes whenever we want to update the notes.*/}
            {props.children}
        </noteContext.Provider>
    )

};
export default NoteState;