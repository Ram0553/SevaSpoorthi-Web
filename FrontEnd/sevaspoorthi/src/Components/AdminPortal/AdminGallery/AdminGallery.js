import { push, ref, set } from "firebase/database";
import { uploadBytes,ref as sref, getDownloadURL } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { fireDb, fireStorage } from "../../../Config/Firebase";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../LoadingSpinner/Spinner";

function AdminGallery(){
    const [files,setFiles] = useState([]);
    const [loading,setLoading] = useState(0);
    const { currentUser,checkAdmin}  = useContext(AuthContext);

    const handleUpload = (event) => {
        setFiles(event.target.files);
    }

    const handleSubmit = async () =>{
        for(let i=0;i<files.length;i++){
            setLoading(1);
            console.log("added");
            const key = push(ref(fireDb)).key;
            await uploadBytes(sref(fireStorage,"GlobalPhotos/"+`${key}`+"/"+`${files[i].name}`),files[i]);
            const url = await getDownloadURL(sref(fireStorage,"GlobalPhotos/"+`${key}`+"/"+`${files[i].name}`));
            await set(ref(fireDb,"Photos/GlobalPhotos/"+key),{"Link":url})
            if(i==files.length-1){
                setLoading(0);
            }
        }
    }  

    useEffect(() => {
      console.log(loading);
    }, [loading])
    

    return (
        <>
            <input type="file" id="file" multiple name="file"  onChange={handleUpload}/>
            {checkAdmin==true?<button onClick={handleSubmit}>Upload</button>:""}
            {loading!=0?<LoadingSpinner/>:""}
        </>
    );
}
export default AdminGallery;