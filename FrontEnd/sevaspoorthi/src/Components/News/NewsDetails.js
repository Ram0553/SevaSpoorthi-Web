import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import NavBar from "../NavBar/NavBar";
import './NewsDetails.css';
import {saveAs} from 'file-saver'

function NewsDetails(){
    const location = useLocation();
    useEffect(() => {
      document.getElementsByClassName("news")[0].innerHTML=location.state.news["content"];
    }, []);
    
    function download(){
        var images = location.state.news["images"];
        for(var i = 0; i<images.length; i++){
            saveAs(images[i],"image"+i.toString()+".jpg");
        }
    }

    return (
        <div>
            <NavBar/>
            {location.state.news["images"].length!=0?<Carousel className="homepage-carousel" slides={location.state.news["images"]}/>:""}
            <h1 style={{margin:"2vw",textAlign: "center",}}>{location.state.news["heading"]}</h1>
            <div className="news"/>
            <div className="download">
                {location.state.news["images"].length!=0?<button onClick={download}>Download Images</button>:""}
            </div>
        </div>
    );
}

export default NewsDetails;