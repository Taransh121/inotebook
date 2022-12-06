//We are writing the code to edit the node here.
import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/NoteContext';
import { Noteitem } from './Noteitem';
import { Addnote } from './Addnote';


export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getnotes,editnote } = context;
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

    useEffect(() => {
        getnotes();
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleClick=(e)=>{
        console.log("Updating the note" , note);
        editnote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})  //Whatever is changing,its name shld be equalto its value.

    }

    return (
        <>
            <Addnote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div  className="modal-dialog">
                    {/* <div style={{backgroundColor:"black",border:"2px solid blue",borderRadius:"1-px"}}  className="modal-content"> */}
                    <div style={{color:"black",border:"3px solid blue"}} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">EDIT NOTE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form  className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label"> <strong>Title:</strong></label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength={5} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label"> <strong>Description:</strong> </label>
                                    <input type="text" className="form-control" minLength={5} id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label"> <strong>Tags:</strong> </label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5 mx-2">
                <h1>Your notes-</h1>
                <div className="container mx-2">
                {notes.length==0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return (<Noteitem key={note._id} updateNote={updateNote} note={note} />)
                })}
            </div>
        </>
    )
}
