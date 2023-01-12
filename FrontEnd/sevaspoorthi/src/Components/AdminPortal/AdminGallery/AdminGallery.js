import { get, limitToFirst, orderByKey, push, query, ref, set, startAfter, update } from "firebase/database";
import { uploadBytes,ref as sref, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { fireDb, fireStorage } from "../../../Config/Firebase";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../LoadingSpinner/Spinner";
import './AdminGallery.css';

function AdminGallery(){
    const [files,setFiles] = useState([]);
    const [loading,setLoading] = useState(0);
    const {checkAdmin}  = useContext(AuthContext);
    const [buttonState,setButtonState] = useState("");
    const [photos,setPhotos] = useState([]);
    const [nextKey,setNextKey] = useState("");
    const [selectedPhotos,updateSelectedPhotos] = useState([]);

    const fetch = () => {
        const recentPostsRef =nextKey!=""? query(ref(fireDb, "Photos/GlobalPhotos"),orderByKey(), startAfter(nextKey.toString()),limitToFirst(20))
                                         : query(ref(fireDb, "Photos/GlobalPhotos"),orderByKey(), limitToFirst(20));
        get(recentPostsRef).then((snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((photo)=>{
                    const pid=photo.key;
                    const plink=photo.child("Link").val();
                    const obj = {photoId:pid,photoLink:plink};
                    setNextKey(pid);
                    setPhotos(photos=>[...photos,obj]);
                });
            }
        });
    }

    const deleteImages = (async () => {
        var deleteImages = {};
        for (var key in selectedPhotos)
        {
            deleteImages[selectedPhotos[key]] = null;
        }
        await update(ref(fireDb,"Photos/GlobalPhotos"),deleteImages);

        for (var key in selectedPhotos)
        {
            const desertRef = sref(fireStorage, 'GlobalPhotos/'+selectedPhotos[key]);
            await listAll(desertRef).then((dir)=>{
                dir.items.forEach((fileref)=>{
                    deleteObject(sref(fireStorage, desertRef.fullPath+"/"+fileref.name));
                })
            });
        }
        alert("Deleted the selected images");
    });

    const handleSubmit = async (event) =>{
        switch (event.target.name) {
            case "Add" :
                setButtonState("EditAdd");
                break;

            case "Cancel" :
                setButtonState("");
                break;
            
            case "Checkbox" :
                const photoKey = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                if(isChecked){
                    updateSelectedPhotos(selectedPhotos => [...selectedPhotos,photos[photoKey].photoId]);
                }
                else{
                    updateSelectedPhotos(selectedPhotos => (selectedPhotos.filter(item => item !== photos[photoKey].photoId)));
                }
                break;
            
            case "Delete" :
                setButtonState("EditDelete");
                fetch();
                break;

            case "Edit" :
                setButtonState("Edit");
                break;
    
            case "Files" :
                setFiles(event.target.files);
                break;

            case "Remove" :
                deleteImages().then(()=>{
                    console.log("Selected Images Deleted");
                    setNextKey("");
                    setPhotos([]);
                    updateSelectedPhotos([]);
                });
                break;

            case "Upload" :
                for(let i=0;i<files.length;i++){
                    if(i==0){
                        setLoading(1);
                    }
                    try {
                        const key = push(ref(fireDb)).key;
                        await uploadBytes(sref(fireStorage,"GlobalPhotos/"+`${key}`+"/"+`${files[i].name}`),files[i]);
                        const url = await getDownloadURL(sref(fireStorage,"GlobalPhotos/"+`${key}`+"/"+`${files[i].name}`));
                        await set(ref(fireDb,"Photos/GlobalPhotos/"+key),{"Link":url});
                    } catch (error) {
                        alert(`Failed to upload :- ${files[i].name} due to ${error}`);
                    }
                    if(i==files.length-1){
                        setLoading(0);
                        setButtonState("");
                        alert(`Successfully uploaded ${files.length} ${i+1==1?"image":"images"}.`);
                    }
                }
                break;

            default :
                break;
        }
        
    }

    return (
        <div className="admingallery">
            <h3>Gallery Photo Section</h3>
            <div>
                {checkAdmin==true && buttonState==""?<button onClick={handleSubmit} name="Edit">Edit Photos</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Add">Add Photos</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Delete">Delete Photos</button>:""}

                {buttonState=="EditAdd"?<input type="file" id="file" multiple name="Files"  onChange={handleSubmit}/>:""}
                {buttonState=="EditAdd"?<button onClick={handleSubmit} name="Upload">Upload</button>:""}


                {loading!=0?<LoadingSpinner/>:""}
            </div>
            {buttonState=="EditDelete"?
                <>
                <div className="images">
                    {photos.map((imgSrc,key) => 
                        (<div>
                            <input type="checkbox" name="Checkbox" data-key={key} onClick={handleSubmit}/>
                            <img src={imgSrc.photoLink} key={key}/>
                        </div>
                    ))}
                </div> 
                <button onClick={handleSubmit} name="Remove">Delete</button>
                </>

                :""
            }
            {buttonState!=""?<button onClick={handleSubmit} name="Cancel">Cancel</button>:""}
            <div className="line"/>
        </div>
    );
}
export default AdminGallery;