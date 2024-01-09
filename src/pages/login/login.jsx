import { useRef } from "react"
import "./login.css"
import { loginCall } from "../apiCalls"
import { useContext } from "react"
import { AuthContext } from "../../context/Authcontext"
import CircularProgress from '@mui/material/CircularProgress';


export default function Login() {
    const email=useRef()
    const password=useRef()
    const {user,isFetching,error,dispatch}=useContext(AuthContext)
    const handleClick=(e)=>{
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)
        
    }
    console.log(user)
    
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
                    <input 
                    type="email" 
                    placeholder="Email" 
                    required
                    className="loginInput"
                    ref={email} />

                    <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    minLength="6"
                    className="loginInput"
                    ref={password} />


                    <button className="loginButton">{isFetching ?<CircularProgress />:"Login"} </button>
                    <spna className="loginForgot">Forgot Password ?</spna>
                    <button className="loginRegisterButton">
                        Create a New Account
                
                    </button>
                   </form>
                </div>
            </div>
        </div>
    )
    
}