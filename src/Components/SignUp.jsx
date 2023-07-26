import React, { useState } from 'react'
import { app, auth, GAuth, UsersRef } from "../firebase";
import { createUserWithEmailAndPassword, getRedirectResult, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { push, set } from "firebase/database"
const SignUp = () => {  
    const [Name, setName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Pass, setPass] = useState(null)
    const Navigate = useNavigate()

    const HandleEmailAuth = () => { //Email authentication
        createUserWithEmailAndPassword(auth, Email, Pass)
            .then(async () => {
                const PushUser = push(UsersRef)
                await set(PushUser, {
                    Name,
                    Email
                })
                Navigate("/Login")

            }).catch((err) => {
                console.log(err);
            })
    }

    const GoogleAuth = async () => { //Google authentication
        signInWithPopup(auth, GAuth)
            .then((result) => {
                Navigate("/Chat", { state: { UserName: result?.user?.displayName } })
            })
    }

    return (
        <div className='container-1'>
            <div className='container-2'>
                <h1 style={{ marginBottom: "2rem" }}>New To Chatter ?</h1>
                <h3 style={{ marginBottom: "1rem" }}>Sign Up Now</h3>
                <div className="SignForm">
                    <input type="text" onChange={(e) => {
                        setName(e.target.value)
                    }} placeholder='Enter your name...' />
                    <input type="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} placeholder='Enter your email...' />
                    <input type="password" onChange={(e) => {
                        setPass(e.target.value)
                    }} placeholder='Enter your password...' />

                </div>
                <i className="fa-solid fa-paper-plane PlaneClass" onClick={HandleEmailAuth} style={{ fontSize: "1.5rem", color: "#fff", background: "black", padding: "1rem", margin: "auto", borderRadius: "0.5rem" }}>
                    <span className='SendBtn'>Send it out</span>
                </i>
                <p style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>or</p>

                <button onClick={GoogleAuth}>
                    <i className="fa-brands fa-google" style={{ margin: "10px", color: "red" }}></i>Sign Up With Google
                    (only for PC Users)
                </button>
            </div>
            <p>Already Have an account ? <Link to="/Login">Login</Link></p>
        </div>
    )
}

export default SignUp
