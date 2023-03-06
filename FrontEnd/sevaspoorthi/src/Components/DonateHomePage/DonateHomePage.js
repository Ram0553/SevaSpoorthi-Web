import React, { useEffect, useState } from "react";
import "./DonateHomePage.css";
import { fireDb } from "../../Config/Firebase";
import { child, get, onValue, ref, runTransaction } from "firebase/database";
import pc from './pc.png';

function fetch(setDonateUs){
    get(child(ref(fireDb),"About/Donate")).then((snapshot)=>{
        if(snapshot.exists()){
           setDonateUs(snapshot.child("Heading").val());
        }
    });
}

function DonateHomePage(){
    const [donateUs,setDonateUs] = useState("");    
    const [counter,setCounter] = useState(0);
    function addUser(){
      const countRef = ref(fireDb, '/UserCount/');
      runTransaction(countRef,(count)=>{
          count++;
          setCounter(count);
          return count;
      });
      onValue(countRef,(snap)=>{
        setCounter(snap.val());
      });
    }
  
    useEffect(() => {
      addUser();    
    }, []);

    fetch(setDonateUs);
    return (
        // <div className="donate-count">
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
            {/* </div>
            <div className="line-v"/>
            <div className="usercount">
                <h1>Total User Visits</h1>
                <img src={pc}/>
                <h2 style={{color:"white"}}>{counter}</h2>
            </div>*/}
             </div> 
       
    )
}
export default DonateHomePage;