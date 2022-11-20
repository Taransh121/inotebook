import React, { useContext } from 'react'
import noteContext from '../context/NoteContext';
import { Noteitem } from './Noteitem';
import { Addnote } from './Addnote';


export const Notes = () => {
    const context = useContext(noteContext);
    const { notes} = context;
    return (
        <>
            <Addnote />
            <div className=" row my-5 mx-2">
                <h1>Your notes-</h1>
                {notes.map((note) => {
                    return (<Noteitem key={note._id} note={note} />)
                })}
            </div>
        </>
    )
}
