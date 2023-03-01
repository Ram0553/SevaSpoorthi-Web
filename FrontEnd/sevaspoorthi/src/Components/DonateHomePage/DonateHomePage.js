import React, { useState } from "react";
import "./DonateHomePage.css";
import { fireDb } from "../../Config/Firebase";
import { child, get, ref } from "firebase/database";

function fetch(setDonateUs){
    get(child(ref(fireDb),"About/Donate")).then((snapshot)=>{
        if(snapshot.exists()){
           setDonateUs(snapshot.child("Heading").val());
        }
    });
}
function DonateHomePage(){
    const [donateUs,setDonateUs] = useState("");

    fetch(setDonateUs);
    return (
        <div className="donateSection">
            <h1>
                Donate to Nobel Cause
            </h1>
            <div className="donateCause">
                {donateUs}
            </div>
            <a href="/Donate">
                <button>
                    Visit Donate Page
                </button>
            </a>
        </div>
    )
}
export default DonateHomePage;