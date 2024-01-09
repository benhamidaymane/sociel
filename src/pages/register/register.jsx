import { useRef } from "react"
import "./register.css"
import axios from "axios"
import {  useNavigate } from "react-router-dom";

export default function Register() {
    const username=useRef()
    const email=useRef()
    const password=useRef()
    const passwordAgain=useRef()
    const navigate =useNavigate()

    const handleClick = async (e)=>{
        e.preventDefault()
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("password don't match !")
        } else {
            const user ={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
                
            }
            try {
                 await axios.post("/auth/register",user)
                 navigate('/login')

            } catch (error) {
                console.log(error)
            }
        }
    }
    return(
        

        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                   <h1 className="loginLogo">Lamasocial</h1>
                   <span className="loginDesc">
                    Connect with friends and the world around you on lamasocial
                   </span>
                </div>
                <div className="loginRight">
                   <form className="loginBox" onSubmit={handleClick}>
                    <input type="text" required ref={username} placeholder="UserName" className="loginInput" />
                    <input type="email" required  ref={email} placeholder="Email" className="loginInput" />
                    <input type="password"  minLength="6" required ref={password} placeholder="Password" className="loginInput" />
                    <input type="password" minLength="6" required  ref={passwordAgain} placeholder="Password Again "  className="loginInput" />
                    <button className="loginButton" type="submit">Sing Up </button>
                    
                    <button className="loginRegisterButton">
                        Log into Account
                    </button>
                   </form>
                </div>
            </div>
        </div>
    )
    
}