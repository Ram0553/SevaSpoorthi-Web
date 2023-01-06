import React, { useEffect, useState } from "react";
import "./Gallery.css";
import ViewImage from "./ViewImage";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function call(setPhotos){
    
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20788/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20756/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20785/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20784/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20783/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20789/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20780/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20781/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=3500"])
    setPhotos(arr=>[...arr,"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=3500"])
    return;
}

function open(index,setCurPhoto){
    setCurPhoto(index)
    document.getElementsByClassName("viewImage")[0].style.cssText='display:flex';
    document.getElementsByClassName("tileview")[0].style.cssText='display:none';
}

function Gallery(){
    const [photos,setPhotos] = useState([]);
    const [curPhoto,setCurPhoto]=useState(0);

    // console.log("Hiii")
    useEffect(() => {
        call(setPhotos)
    }, [])

    useEffect(()=>{
        if(photos.length>0){
            setCurPhoto(0);
        }
    },[])
    
    return(
        <div className="gallery">
            <h1>
                Gallery
            </h1>
            <div className="line"/>
            <div className="tileview">
                <div className="images">
                    {photos.map((imgSrc,key) => (<img src={imgSrc} key={key} alt="Imag"  onClick={()=>open(key,setCurPhoto)}/>))}
                </div>
                
                {photos.length>12?<h6>View All  <FontAwesomeIcon icon={faArrowRight}/></h6>:""}
            </div>
            <div>
                {photos.length>0?<ViewImage photos={photos} curPhoto={curPhoto} setCurPhoto={setCurPhoto}/>:""}
            </div>
            <div className="line"/>
        </div>
    );
}
export default Gallery;