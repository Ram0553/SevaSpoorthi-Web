import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import NavBar from "../NavBar/NavBar";

function NewsDetails(){
    const location = useLocation();
    console.log(location.state.news["images"]);
    useEffect(() => {
      document.getElementsByClassName("news")[0].innerHTML=location.state.news["content"];
    }, [])
    
    return (
        <div>
            <NavBar/>
            <Carousel className="homepage-carousel" slides={location.state.news["images"]}/>
            <div className="news">
            </div>
        </div>
    )
}

export default NewsDetails;