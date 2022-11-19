import noteContext from "./NoteContext";

const NoteState=(props)=>{
    const state={
        "name":"Taransh",
        "age":18
    }
    return (
        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )

};
export default NoteState;