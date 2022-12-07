import React from 'react'

export const Alert = (props) => {
    return (
        <div style={{height:"50px"}}>
    {props.alert && <div>   {/* iska mtlb hai ki agar props.alert null nahi hai toh ye kro  */}
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{props.alert.type} {props.alert.message}</strong>
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>
    </div>}
    </div>
    )
}


