import React,{useContext} from 'react';
import noteContext from '../context/NoteContext';

export const About = () => {
  const a=useContext(noteContext)
  return (
    <>
    <h1>This is About and this website is created by {a.name} and his age is {a.age}</h1>  
    {/* This shows that we can use states and objects anywhere easily using contextAPI. */}
    </>
  )
}
