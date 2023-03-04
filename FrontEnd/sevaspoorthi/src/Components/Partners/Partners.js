import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import React from "react";
import { get, ref } from "firebase/database";
import { fireDb } from "../../Config/Firebase";
import './Partners.css';

function Partners(){
    const [partners,setPartners] = useState([]);

    function fetchPartners(){
        get(ref(fireDb,"Partners")).then((snapshot)=>{
            var part = [];
            snapshot.forEach(partner => {
                var obj = {
                    "name":partner.child("name").val(),
                    logo:partner.child("logo").val(),
                    "details":partner.child("details").val(),
                };
                part.push(obj);  
            });
            setPartners(part);
            console.log(part);
        });
    }
    useEffect(() => {
      fetchPartners();
    }, [])
    
    return(
        <div >
            <NavBar/>
            <div className="partners">
                {partners.map((obj, index) => {
                    return (
                        <div>
                            <img src={obj["logo"]}/>
                        </div>
                    )  
                })}
            </div>
        </div>
    );
}
export default Partners;