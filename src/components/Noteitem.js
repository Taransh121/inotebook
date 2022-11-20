import React,{useContext} from 'react'
import noteContext from '../context/NoteContext';

export const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deletenote}=context;
    const { note } = props;
    return (
        <div className='col-md-3' >
            <div className="card " style={{color:"white",backgroundColor:"black",border:"3px solid blue",margin:"10px",borderRadius:"10px"}}  key={""}>
                    <div className="card-body">
                        <h5 className="card-title">{note.title.toUpperCase()}</h5>
                        <hr/>
                        <p className="card-text">Description : {note.description}</p>
                        <p className='card-text'>Tags : {note.tag}</p>
                        <hr/>
                        <i className="far fa-trash-alt mx-2" id="dltnote" onClick={()=>{deletenote(note._id)}}></i>
                        <i className="far fa-edit mx-3"></i> 
                    </div>
            </div>
        </div>
    )
}
