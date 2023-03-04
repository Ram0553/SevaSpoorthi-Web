import { limitToFirst, onValue, orderByKey, query, ref, startAfter, startAt } from "firebase/database";
import React, { useEffect, useState,useRef } from "react"
import { fireDb } from "../../Config/Firebase";
import NavBar from "../NavBar/NavBar";
import ViewImage from "../ViewImageList/ViewImage";
import { useParams } from "react-router-dom";

function open(index,setCurPhoto){
    setCurPhoto(index)
    document.getElementsByClassName("viewImage")[0].style.cssText='display:flex';
    document.getElementsByClassName("tileview")[0].style.cssText='display:none';
}

function Gallery(){

    const [photos,setPhotos] = useState([]);
    const [curPhoto,setCurPhoto]=useState(0);
    const [loading,setLoading] = useState(0);
    const {path} = useParams();
    const nextImg = useRef("");

    useEffect(() => {
        fetchPhotos();
        if(photos.length>0){
            setCurPhoto(0);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
      if(loading!==2 && curPhoto === photos.length-1){
        fetchMorePhotos();
      }
    }, [curPhoto]);
    

    const handleScroll = () => {
        if(loading!==2 && Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight){
            fetchMorePhotos();
        }
    };

    function fetchPhotos(){
        const recentPostsRef = query(ref(fireDb, "Photos/"+path),orderByKey(),limitToFirst(20));
        onValue(recentPostsRef,(snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((photo)=>{
                    const pid=photo.key;
                    const plink=photo.child("Link").val();
                    const obj = {photoId:pid,photoLink:plink};
                    setPhotos(photos=>[...photos,obj]);
                    nextImg.current = pid;
                })
            }
        },{onlyOnce:true})
        return;
    }

    function fetchMorePhotos(){
        if(loading!==0)return;
        setLoading(1);
        const recentPostsRef = query(ref(fireDb, "Photos/"+path),orderByKey(), startAfter(nextImg.current.toString()),limitToFirst(15));
        onValue(recentPostsRef,(snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((photo)=>{
                    const pid=photo.key;
                    const plink=photo.child("Link").val();
                    const obj = {photoId:pid,photoLink:plink};
                    setPhotos(photos=>[...photos,obj]);
                    nextImg.current = pid;
                });
            setLoading(0);
            }
            else{
               window.removeEventListener('scroll', handleScroll);
               setLoading(2);
            }
        },{onlyOnce:true})
        return;
    }
    

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
                        {photos.map((imgSrc,key) => (<img src={imgSrc.photoLink} key={key} alt="Image"  onClick={()=>open(key,setCurPhoto)}/>))}
                    </div>
                    
                </div>
                <div>
                    {photos.length>0?<ViewImage photos={photos} curPhoto={curPhoto} setCurPhoto={setCurPhoto}/>:""}
                </div>
                {loading==1?
                    <div className="loading">
                        Loading
                    </div>:""
                }
                <div className="line"/>
            </div>
        </>
    );
}

export default Gallery;