import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { get, orderByKey, push, query, ref, set, startAfter, update } from "firebase/database";
import { uploadBytes,ref as sref, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import React, { useContext, useState } from "react";
import { fireDb, fireStorage } from "../../../Config/Firebase";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../LoadingSpinner/Spinner";
import TextEditor from "../../TextEditor/TextEditor";
import './AdminNews.css';

function AdminNews(){
    const [files,setFiles] = useState([]);
    const [heading,setHeading] = useState("");
    const [loading,setLoading] = useState(0);
    const {checkAdmin}  = useContext(AuthContext);
    const [buttonState,setButtonState] = useState("");
    const [photos,setPhotos] = useState([]);
    const [nextKey,setNextKey] = useState("");
    const [selectedPhotos,updateSelectedPhotos] = useState([]);
    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const [headingFlag,setHeadingFlag]=useState(false);
    const headingErr = "Heading Cannot be Empty";

    const fetch = () => {
        const recentPostsRef =nextKey!=""? query(ref(fireDb, "Photos/GlobalPhotos"),orderByKey(), startAfter(nextKey.toString()))
                                         : query(ref(fireDb, "Photos/GlobalPhotos"),orderByKey());
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

            case "Heading" :
                setHeading(event.target.value);
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
                var downloadLinks = {}
                for(let i=0;i<files.length;i++){
                    if(i==0){
                        setLoading(1);
                    }
                    try {
                        const key = push(ref(fireDb)).key;
                        await uploadBytes(sref(fireStorage,"NewsPhotos/"+`${key}`+"/"+`${files[i].name}`),files[i]);
                        const url = await getDownloadURL(sref(fireStorage,"NewsPhotos/"+`${key}`+"/"+`${files[i].name}`));
                        downloadLinks[key]=url;
                        // await set(ref(fireDb,"Photos/GlobalPhotos/"+key),{"Link":url});
                    } catch (error) {
                        alert(`Failed to upload :- ${files[i].name} due to ${error}`);
                    }
                }
                const id = push(ref(fireDb)).key;
                var today = new Date();
                var date = today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
                await set(ref(fireDb,`News/${id}/`),{"content":draftToHtml(convertToRaw(editorState.getCurrentContent())),"date":date,"heading":heading,"images":downloadLinks});
                setLoading(0);
                break;

            default :
                break;
        }
        
    }

    return (
        <div className="adminnews">
            <h3>News Section</h3>
            <div>
                {checkAdmin==true && buttonState==""?<button onClick={handleSubmit} name="Edit">Edit News</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Add">Add News</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Edit">Edit News</button>:""}

                {buttonState=="EditAdd"?
                    <div className="news-add">
                        <input type="file" id="file" multiple name="Files"  onChange={handleSubmit}/>
                        <input className="input" name="Heading" onChange={handleSubmit} 
                        value={heading} type="text" placeholder='News Heading' />
                        <h6 className='heading-error'>{headingFlag==true? headingErr:""}</h6>
                        <TextEditor editorState={editorState} setEditorState={setEditorState} />
                        <button onClick={handleSubmit} name="Upload">Upload</button>
                    </div>
                    :""
                }

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
export default AdminNews;