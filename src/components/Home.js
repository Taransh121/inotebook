import React from 'react'

export const Home = () => {
  return (
    <>
    <div className="container my-3">
      <form style={{border:"3px solid blue",padding:"20px",borderRadius:"10px"}} className='my-3'>
      <h1> Add a note-</h1>
        <div className="mb-3">
          <label htmlFor="exampleTitle" className="form-label"> <strong>Title:</strong></label>
          <input type="text" className="form-control" id="exampleTitle" aria-describedby="emailHelp"/>
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleDescription" className="form-label"><strong>Description:</strong> </label>
          <input type="text" className="form-control" id="exampleDescription"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleTags" className="form-label"><strong>Tags:</strong></label>
          <input type="text" className="form-control" id="exampleTags"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <div className="container my-5">
      <h1>Your notes-</h1>
    </div>
    </>
  )
}
