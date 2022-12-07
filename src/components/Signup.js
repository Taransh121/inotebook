import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Signup = () => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" })

    let history = useHistory();  //Using this for redirecting.

    const signupbtn = async (e) => {
        e.preventDefault();
        console.log("Clicking signupbtn");
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NGJiNzNkOGUyZDEwMjZhMzkyZDAwIn0sImlhdCI6MTY2ODcxNjQwMX0.eUDfY1j6yopOnscTsHEkaIDSU-BeXWFrMX9O_ftHTx4" 
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token Redirect
            localStorage.setItem("token",json.authtoken);
            history.push("/");
        }
        else{
            alert("User Already exists")
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })  //Whatever is changing,its name shld be equalto its value.
    }
    return (
        <>
            <form onSubmit={signupbtn} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" onChange={onchange} value={creds.name} required minLength={3} name='name' id="name" aria-describedby="nameHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} value={creds.email} required name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} minLength={5} required value={creds.password} name='password' id="password" />
                </div>  <br />
                <button type="submit" className="btn btn-outline-primary" >Signup</button>
            </form>
        </>
    )
}
