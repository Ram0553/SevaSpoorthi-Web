import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { limitToFirst, onValue, orderByKey, query, ref, startAt } from "firebase/database";
import React, { useEffect, useState } from "react"
import { fireDb } from "../../Config/Firebase";
import NavBar from "../NavBar/NavBar";
import ViewImage from "../ViewImageList/ViewImage";
import { useNavigate, useParams } from "react-router-dom";

function fetchPhotos(setPhotos,key,path){
    const recentPostsRef = query(ref(fireDb, "Photos/"+path),orderByKey(), startAt(key.toString()),limitToFirst(5));
    onValue(recentPostsRef,(snapshot)=>{
        if(snapshot.exists()){
            snapshot.forEach((photo)=>{
                const pid=photo.key;
                const plink=photo.child("Link").val();
                const obj = {photoId:pid,photoLink:plink};
                setPhotos(photos=>[...photos,obj]);
            })
        }
    },{onlyOnce:true})
    return;
}

function open(index,setCurPhoto){
    setCurPhoto(index)
    document.getElementsByClassName("viewImage")[0].style.cssText='display:flex';
    document.getElementsByClassName("tileview")[0].style.cssText='display:none';
}

function Gallery(){
    function More(){
        navigate("/Gallery/"+path+"/"+photos[photos.length-1].photoId);
        navigate(0);
    }

    const [photos,setPhotos] = useState([]);
    const [curPhoto,setCurPhoto]=useState(0);
    const {path,key} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetchPhotos(setPhotos,key,path)
    }, [key])

    useEffect(()=>{
        if(photos.length>0){
            setCurPhoto(0);
        }
    },[photos])
    return (
        <>
            <NavBar/>
            <div className="gallery">
                <h1>
                    Gallery
                </h1>
                <div className="line"/>
                <div className="tileview">
                    <div className="images">
                        {photos.map((imgSrc,key) => (key<5?<img src={imgSrc.photoLink} key={key} alt="Image"  onClick={()=>open(key,setCurPhoto)}/>:""))}
                    </div>
                    
                    {photos.length>4?<h6 onClick={More}>More  <FontAwesomeIcon icon={faArrowRight}/></h6>:""}
                </div>
                <div>
                    {photos.length>0?<ViewImage photos={photos} curPhoto={curPhoto} setCurPhoto={setCurPhoto}/>:""}
                </div>
                <div className="line"/>
            </div>
        </>
    );
}

export default Gallery;