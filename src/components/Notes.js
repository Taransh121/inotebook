import React, { useContext } from 'react'
import noteContext from '../context/NoteContext';
import { Noteitem } from './Noteitem';
 
export const Notes = () => {
    const context=useContext(noteContext);
    const {notes,setNotes}=context;  
    return (
        <>
            <div className=" row my-5 mx-2">
                <h1>Your notes-</h1>
                {notes.map((note) => {
                    return (<Noteitem key={note._id} note={note}/>)
                })}
            </div>
        </>
    )
}
