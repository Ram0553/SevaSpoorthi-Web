import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fireAuth} from '../../Config/Firebase';
import React, { useEffect, useState } from 'react';
import './Auth.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';


function Auth() { 
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [name,setName]=useState("");
    const [emailFlag,setEmailFlag]=useState(false);
    const [passFlag,setPassFlag]=useState(false);
    const [nameFlag,setNameFlag]=useState(false);
    const nameErr = "Length of Name cannot be less than 3 characters";
    const emailErr = "Invalid Email";
    const passErr = "Length of Password cannot be less than 6 characters";

    const validName = new RegExp('[a-zA-Z]{3,}');
    const validEmail = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const validPass = new RegExp('.{6,}');
    const [authType,setAuthType]=useState("login");


    const crossed =()=>{
        setEmail("");
        setPass("");
        setName("");
        document.getElementsByClassName("auth")[0].removeAttribute('style');
        handleRadio("login");
    }

    const nothing = (e) => {
        e.stopPropagation();
    } 

    const handleEmail=(e) => {
        setEmail(e.target.value);
    }

    useEffect(()=>{
        if(validEmail.test(email) || email===""){
            setEmailFlag(false);
        }
        else{
            setEmailFlag(true);
        }
    },[email]);

    const handlePass=(e) => {
        setPass(e.target.value);
    }

    useEffect(()=>{
        if(validPass.test(pass) || pass===""){
            setPassFlag(false);
        }
        else{
            setPassFlag(true);
        }
    },[pass]);

    const handleName= async (e) => {
        setName(e.target.value);
    }
    useEffect(()=>{
        if(validName.test(name) || name===""){
            setNameFlag(false);
        }
        else{
            setNameFlag(true);
        }
    },[name]);


    

    const SignUp = async ()=>{
        try {
            await createUserWithEmailAndPassword(fireAuth,email,pass);
            await updateProfile(fireAuth.currentUser,{displayName:name});            
        } catch (error) {
            alert(error);
        }
        crossed(); 
    }

    const CheckSignUp = () => {
        var flag = true;
        if(!validName.test(name)){
            flag = false;
            setNameFlag(true);
        }
        if(!validEmail.test(email)){
            flag = false;
            setEmailFlag(true);
        }
        if(!validPass.test(pass)){
            flag = false;
            setPassFlag(true);
        }
        return flag;
    }

    const SignIn = async ()=>{
        try {
            await signInWithEmailAndPassword(fireAuth,email,pass);         
        } catch (error) {
            alert(error);
        }
        crossed(); 
        console.log("LoggedIn");
    }

    const CheckSignIn = () =>{
        var flag = true;
        if(!validEmail.test(email)){
            flag = false;
            setEmailFlag(true);
        }
        if(!validPass.test(pass)){
            flag = false;
            setPassFlag(true);
        }
        return flag;
    }

    const handleSubmit= async () => {
        if(authType === "register") {
            if(CheckSignUp() === false){
                return;
            }
            await SignUp();
        }
        else{
            if(CheckSignIn() === false){
                return
            }
            await SignIn();
        }
    }

    const handleRadio=(str) => {

        setAuthType(str);
        setEmail("");
        setPass("");
        setName("");
        if(str==="register"){
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
                        <h6 className='email-error'>{emailFlag==true? emailErr:""}</h6>

                        <input onChange={handlePass} className="input"
                        value={pass} type="password" placeholder='Password' />
                        <h6 className='password-error'>{passFlag==true? passErr:""}</h6>

                        <p>Forgot Password</p>
                
                        <button onClick={handleSubmit} type="submit" className='submit'>
                        Submit
                        </button>
                </div>
                <div className='register-form'>
                        <input onChange={handleName} className="input"
                        value={name} type="text" placeholder='Name' />
                        <h6 className='name-error'>{nameFlag==true?nameErr:""}</h6>

                        <input onChange={handleEmail} className="input"
                        value={email} type="email" placeholder='Email' />
                        <h6 className='email-error'>{emailFlag==true? emailErr:""}</h6>

                        <input onChange={handlePass} className="input"
                        value={pass} type="password" placeholder='Password' />
                        <h6 className='password-error'>{passFlag==true? passErr:""}</h6>

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

export default Auth;