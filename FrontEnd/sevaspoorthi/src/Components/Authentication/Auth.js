import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Auth.css';


function Auth() {    
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [name,setName]=useState("");


    const crossed =()=>{
        document.getElementsByClassName("auth")[0].removeAttribute('style');
    }

    const nothing = (e) => {
        e.stopPropagation();
    } 

    const handleEmail=(e) => {
        setEmail(e.target.email);
    }

    const handlePass=(e) => {
        setPass(e.target.pass);
    }

    const handleName=(e) => {
        setPass(e.target.name);
    }

    const handleSubmit=(e) => {}

    const handleRadio=(str) => {
        if(str=="register"){
            document.getElementsByClassName("login-form")[0].style.cssText='display:none;';
            document.getElementsByClassName("register-form")[0].style.cssText='display:flex;';
            document.getElementsByClassName("login-radio-button")[0].style.cssText='background-color:rgb(213, 213, 213);border-top:none;color:black;';
            document.getElementsByClassName("register-radio-button")[0].style.cssText='background-color:rgb(255, 255, 255);border-top:3px solid #025F56;border-right:1px solid rgb(213, 213, 213);color:#025F56;';
        }else{
            document.getElementsByClassName("login-radio-button")[0].removeAttribute('style');
            document.getElementsByClassName("register-radio-button")[0].removeAttribute('style');
            document.getElementsByClassName("login-form")[0].removeAttribute('style');
            document.getElementsByClassName("register-form")[0].removeAttribute('style');
        }
    }



    return (
        <div className='auth' onClick={crossed}>
            <div className='auth-box' onClick={nothing}>
                <div className='cross'>
                    Please Login To Continue
                    <FontAwesomeIcon icon={faXmark} onClick={crossed} className='font-awesome-cross'/>
                </div>
                <div className='radio-button'>
                    <a className='login-radio-button' onClick={()=>{handleRadio("login")}}>SignIn</a>
                    <a className='register-radio-button' onClick={()=>{handleRadio("register")}}>SignUp</a>
                </div>
                <div className='login-form'>
                        <input onChange={handleEmail} className="input"
                        value={email} type="email" placeholder='Email' />

                        <input onChange={handlePass} className="input"
                        value={pass} type="password" placeholder='Password' />
                        <p>Forgot Password</p>
                
                        <button onClick={handleSubmit} type="submit" className='submit'>
                        Submit
                        </button>
                </div>
                <div className='register-form'>
                        <input onChange={handleName} className="input"
                        value={name} type="name" placeholder='Name' />

                        <input onChange={handleEmail} className="input"
                        value={email} type="email" placeholder='Email' />
                        <input onChange={handlePass} className="input"
                        value={pass} type="password" placeholder='Password' />
                        <button onClick={handleSubmit} type="submit" className='submit'>
                            Submit
                        </button>
                </div>
                <div className='separation'>
                    <span>or</span>
                </div>
                <div className='other-login'>
                    <button onClick={handleSubmit} className="google-login">
                    <FontAwesomeIcon icon={faGoogle} onClick={crossed} className='font-awesome-google'/>
                    <a>Google</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth