import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Login = () => {
    const [creds, setCreds] = useState({email:"" , password:""})

    let history=useHistory();  //Using this for redirecting.

    const loginbtn = async (e) => {
        e.preventDefault();
        // fetch("http://localhost:5000/api/auth/login");
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NGJiNzNkOGUyZDEwMjZhMzkyZDAwIn0sImlhdCI6MTY2ODcxNjQwMX0.eUDfY1j6yopOnscTsHEkaIDSU-BeXWFrMX9O_ftHTx4" 
            },
            body: JSON.stringify({ email:creds.email ,password:creds.password})

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token Redirect
            localStorage.setItem("token",json.authtoken);
            history.push("/");
        }
        else{
            alert("Invalid credentials.")
        }
    }
    const onchange=(e)=>{
        setCreds({...creds,[e.target.name]:e.target.value})  //Whatever is changing,its name shld be equalto its value.
    }
    return (
        <>
            <form onSubmit={loginbtn} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} value={creds.email} name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} value={creds.password} name='password' id="password" />
                </div> <br />
                <button type="submit" className="btn btn-outline-primary" >Login</button>
            </form>
        </>
    )
}
