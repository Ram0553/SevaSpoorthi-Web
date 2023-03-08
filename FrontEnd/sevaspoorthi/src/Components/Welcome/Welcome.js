import React, { useState } from "react";
import "./Welcome.css"
import { fireDb } from "../../Config/Firebase";
import { child, get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

function fetch(setAboutUs){
    get(child(ref(fireDb),"About/Story")).then((snapshot)=>{
        if(snapshot.exists()){
           setAboutUs(snapshot.child("Heading").val());
        }
    });
}
function Welcome(){
    const [aboutUs,setAboutUs] = useState("");
    const navigate = useNavigate();
    fetch(setAboutUs);
    return (
        <div className="welcome">
            <h1>
                Welcome To SevaSpoorthi
            </h1>
            <div className="story">
                {aboutUs}
            </div>
            <button onClick={()=>navigate("/AboutUs")}>
                Our Story
            </button>
        </div>
    )
}
export default Welcome