import React from "react";
import "./ViewImage.css";
import { faChevronRight,faChevronLeft,faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function crossed(){
    document.getElementsByClassName("viewImage")[0].removeAttribute("style");
    document.getElementsByClassName("tileview")[0].removeAttribute("style");
} 

function nextPhoto(curPhoto,setCurPhoto){
    setCurPhoto((curPhoto+1)%12)
}

function prevPhoto(curPhoto,setCurPhoto){
    setCurPhoto((curPhoto-1+12)%12)
}

function ViewImage({photos,curPhoto,setCurPhoto}){
    return (
        <div className="viewImage" onClick={crossed}>
            <FontAwesomeIcon icon={faXmark} className="fontawesome-cross" onClick={crossed}/>
            <div className="image">
                <FontAwesomeIcon icon={faChevronLeft} className="fontawesome" onClick={(e)=>{e.stopPropagation();prevPhoto(curPhoto,setCurPhoto)}}/>
                <img src={photos[curPhoto]}  alt="hello" onClick={(e)=>{e.stopPropagation()}}/>
                <FontAwesomeIcon icon={faChevronRight} className="fontawesome" onClick={(e)=>{e.stopPropagation();nextPhoto(curPhoto,setCurPhoto)}}/>
            </div>
        </div>
    )
}
export default ViewImage;