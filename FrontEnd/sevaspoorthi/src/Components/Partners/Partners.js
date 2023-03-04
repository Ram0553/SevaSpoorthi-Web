import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import React from "react";
import { get, ref } from "firebase/database";
import { fireDb } from "../../Config/Firebase";
import './Partners.css';
import Card from "../Card/Card";

function Partners(){
    const [partners,setPartners] = useState([]);

    function fetchPartners(){
        get(ref(fireDb,"Partners")).then((snapshot)=>{
            var part = [];
            snapshot.forEach(partner => {
                var obj = {
                    caption:partner.child("name").val(),
                    image:partner.child("logo").val(),
                    description:partner.child("details").val(),
                };
                part.push(obj);  
            });
            setPartners(part);
            console.log(part);
        });
    }

    const cardItems = partners.map((card,index) => {
        return <Card cardItem={card} key={index} />
    });

    useEffect(() => {
      fetchPartners();
    }, [])
    
    return(
        <div >
            <NavBar/>
            <h2>Our Partners</h2>
            <div className="partners">
                    <div className="partners-deck">
                        {cardItems}
                    </div>
            </div>
        </div>
    );
}
export default Partners;