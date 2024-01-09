import React, { useContext, useEffect, useRef, useState } from "react";
import "./messanger.css"
import Topbar from "../../components/topbar/topbar";
import Conversation from "../../components/conversations/conversation";
import Message from "../../components/message/message";
import ChatOnline from "../../components/chatOnline/chatOnline";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios"
import io from "socket.io-client";

 

export default function Messanger(){
    const [conversation,setConversation]=useState([])
    const [currentChat,setCurrentChat]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    
    const socket = useRef(io("ws://localhost:8900"))
    const {user}=useContext(AuthContext)
    
 
    useEffect(()=>{
        socket.current.emit("addUser",user._id)
    },[user])

    
    
    useEffect(()=>{
        const getConversations = async()=>{
           try {
            const res= await axios.get("/converstaion/"+user._id)
            setConversation(res.data)
            
            
           } catch (err) {
            console.log(err)
           }
        }
        getConversations()
    }, [user._id])
    
    useEffect(()=>{
        const getMessages = async ()=>{
            try {
                const res =  await axios.get("/message/"+currentChat?._id)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
        console.log(messages)
    },[currentChat])

    const handlersubmit = async (e)=>{
        e.preventDefault()
        const Message ={
            sender:user._id,
            text:newMessage,
            conversationId:currentChat._id
        }
        try {
            const res= await axios.post("/message",Message)
             setMessages([...messages,res.data])

             setNewMessage("")
        } catch (error) {
            
        }

    }
    

    return(
        <>
        <Topbar />
        <div className="messanger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input type="text" placeholder="search for freinds " className="chatMenuInput" />
                  {conversation.map(e=>(
                   <div onClick={()=>setCurrentChat(e)}>
                     <Conversation conversation={e} currentUser={user} />
                   </div>
                 ) )}
                  
                </div>
            </div>
            <div className="chatBox">
             <div className="chatBoxWrapper"> 
             {
                currentChat ? (
             <>
             <div className="chatBoxTop">
                {
                    messages.map(m=>(
                        <Message message={m} own={m.sender === user._id}/>
                    ))
                }
             </div>
             
             <div className="chatBoxBottom">
                <textarea 
                className="chatMessageInput" 
                placeholder="write something ..."
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage} >

                </textarea>
                <button className="chatSubmitButton" onClick={handlersubmit}> send </button>
             </div>
             </> ):(<span className="noConversation">open a convertsaion to start a chat </span>) }
             </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
        </>
    )
}