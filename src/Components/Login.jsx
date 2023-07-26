import React, { useState } from 'react'
import { auth, GAuth, UsersRef } from "../firebase";
import {  signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {  onValue } from "firebase/database"

const Login = () => {
    const [Email, setEmail] = useState(null)
    const [Pass, setPass] = useState(null)
    const Navigate = useNavigate()

    const HandleEmailAuth = () => {  //Email auth for mobile devices
        signInWithEmailAndPassword(auth, Email, Pass)
            .then(async (result) => {
                const starCountRef = UsersRef;
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    const DataArr = Object.values(data)
                    DataArr.map((User) => {
                        try {

                            if (User.Email === result?.user?.email) {
                                return Navigate("/Chat", { state: { UserName: User?.Name } })
                            }
                        }
                        catch (err) {
                            return console.log(err);
                        }
                    })
                });


            }).catch((err) => {
                console.log(err);
            })
    }

    const GoogleAuth = async () => { //Google auth for pc
        signInWithPopup(auth, GAuth)
            .then((result) => {
                Navigate("/Chat", { state: { UserName: result?.user?.displayName } })
            })
    }



    return (
        <div className='container-1'>
            <div className='container-2'>
                <h1 style={{ marginBottom: "2rem" }}>Login To Chatter </h1>
                <div className="SignForm">
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
            <p>Don't have any account ? <Link to="/">Sign Up</Link></p>
        </div>
    )
}

export default Login;
