import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Dbref } from '../firebase';
import { push, set, onChildAdded } from 'firebase/database';
const ChatBox = () => {
    const Location = useLocation()
    const [Message, setMessage] = useState(null)
    const [Chats, setChats] = useState([])


    useEffect(() => {
        const CallDb = (async (data) => {
            if (data.exists()) {

                setChats(Chats => [...Chats, data.val()]);
            }
        })
        return onChildAdded(Dbref, CallDb)
    }, [])





    const SendChat = async () => {
        const NewDbRef = push(Dbref);
        await set(NewDbRef, {
            name: Location?.state?.UserName,
            chatMessage: Message
        })

        return setMessage("")
    }
    return (
        <div className='Chat_Box'>
            <h4 style={{ fontSize: "2rem", fontWeight: "bold", color: "#075E54", margin: "0.2rem auto 0.5rem", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}>
                Welcome to the Chat Box!
                <br />
                Your Room is created
            </h4>
            <p style={{ fontWeight: "bold", border: "2px solid #34B7F1", width: "fit-content", margin: "auto", padding: "0.5rem 1rem", borderRadius: "20px", background: "#34B7F1", color: "white", fontSize: "1.3rem", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}>
                {Location?.state?.UserName} is connected
            </p>

            <div className="ChatCont">
                {Chats?.map((c, i) => {
                    return <div key={i} className={Location?.state?.UserName === c.name ? 'me' : 'Notme'}>
                        <span>{c.chatMessage}</span>
                        {/* <br /> */}
                        <span style={{ fontSize: "1rem", fontWeight: "bolder", margin: "0.5rem" }}>:{c.name}</span>
                    </div>
                })}
            </div>
            <input type="text" placeholder='Enter Your Message...' onChange={(e) => {
                setMessage(e.target.value)
            }} />
            <button onClick={SendChat}>Send!!!</button>
        </div>
    )
}

export default ChatBox;
