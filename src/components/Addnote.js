import React,{useContext, useState} from 'react';
import noteContext from '../context/NoteContext';


export const Addnote = (props) => {
  const {showAlert}=props;
    const context = useContext(noteContext);
    const {addnote } = context;

    const [note,setNote]=useState({title:"",description:"",tags:""})
    const addnotebtn=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tags);
        setNote({title:"",description:"",tags:""})
        props.showAlert("Added Successfully","success")
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})  //Whatever is changing,its name shld be equalto its value.

    }
  return (
    <div className="container my-3">
      <form style={{border:"3px solid blue",padding:"20px",borderRadius:"10px"}} className='my-3'>
      <h1> Add a note-</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"> <strong>Title:</strong></label>
          <input type="text"  className="form-control" name='title' onChange={onchange} value={note.title} id="title" aria-describedby="emailHelp"/>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"><strong>Description:</strong> </label>
          <input type="text" className="form-control" name='description' onChange={onchange} value={note.description} id="description"/>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label"><strong>Tags:</strong></label>
          <input type="text" className="form-control" id="tags" name='tags' onChange={onchange} value={note.tags} />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={addnotebtn} className="btn btn-outline-primary">Add Note</button>
      </form>
    </div>
  )
}
