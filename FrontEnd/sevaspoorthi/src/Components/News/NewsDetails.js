import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import NavBar from "../NavBar/NavBar";

function NewsDetails(){
    const location = useLocation();
    useEffect(() => {
      document.getElementsByClassName("news")[0].innerHTML=location.state.news["content"];
    }, []);
    
    return (
        <div>
            <NavBar/>
            {location.state.news["images"].length!=0?<Carousel className="homepage-carousel" slides={location.state.news["images"]}/>:""}
            <h1 style={{margin:"2vw",textAlign: "center",}}>{location.state.news["heading"]}</h1>
            <div className="news">
            </div>
        </div>
    )
}

export default NewsDetails;