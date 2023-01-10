import React, { useEffect, useState } from "react";
import "./HomePageGallery.css";
import ViewImage from "../ViewImageList/ViewImage";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fireDb } from "../../Config/Firebase";
import { child, get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

function fetchPhotos(setPhotos){

    get(child(ref(fireDb),"Photos/GlobalPhotos")).then((snapshot)=>{
        if(snapshot.exists()){
            snapshot.forEach((photo)=>{
                const pid=photo.key;
                const plink=photo.child("Link").val();
                const obj = {photoId:pid,photoLink:plink};
                setPhotos(photos=>[...photos,obj]);
            })
        }
    });
    return;
}

function open(index,setCurPhoto){
    setCurPhoto(index)
    document.getElementsByClassName("viewImage")[0].style.cssText='display:flex';
    document.getElementsByClassName("tileview")[0].style.cssText='display:none';
}

function HomePageGallery(){
    function ViewAll(){
        navigate('/Gallery/GlobalPhotos/'+photos[0].photoId);
    }
    const [photos,setPhotos] = useState([]);
    const [curPhoto,setCurPhoto]=useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPhotos(setPhotos)
    }, [])

    useEffect(()=>{
        if(photos.length>0){
            setCurPhoto(0);
        }
    },[photos])
    
    return(
        <div className="gallery">
            <h1>
                Gallery
            </h1>
            <div className="line"/>
            <div className="tileview">
                <div className="images">
                    {photos.map((imgSrc,key) => (key<12?<img src={imgSrc.photoLink} key={key} alt="Image"  onClick={()=>open(key,setCurPhoto)}/>:""))}
                </div>
                
                {photos.length>12?<h6 onClick={ViewAll}>View All  <FontAwesomeIcon icon={faArrowRight}/></h6>:""}
            </div>
            <div>
                {photos.length>0?<ViewImage photos={photos} curPhoto={curPhoto} setCurPhoto={setCurPhoto}/>:""}
            </div>
        </div>
    );
}
export default HomePageGallery;