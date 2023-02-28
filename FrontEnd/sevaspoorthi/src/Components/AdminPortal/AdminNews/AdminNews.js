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
    const [news,setNews] = useState([]);
    const [selectedNews,updateSelectedNews] = useState([]);
    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const [headingFlag,setHeadingFlag]=useState(false);
    const headingErr = "Heading Cannot be Empty";

    const fetch = () => {
        const recentPostsRef =query(ref(fireDb, "News/"));
        get(recentPostsRef).then((snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((news)=>{
                    const nid=news.key;
                    const heading=news.child("heading").val();
                    const date=news.child("date").val();
                    const obj = {heading:heading,date:date,id:nid};
                    setNews(nnews=>[...nnews,obj]);
                });
            }
        });
    }

    const deleteNews = (async () => {
        var deleteNews = {};
        for (var key in selectedNews)
        {
            deleteNews[selectedNews[key]] = null;
        }
        await update(ref(fireDb,"News/"),deleteNews);

        for (var key in selectedNews)
        {
            const desertRef = sref(fireStorage, 'NewsPhotos/'+selectedNews[key]);
            await listAll(desertRef).then((dir)=>{
                dir.prefixes.forEach(async(folderref)=>{
                    await listAll(folderref).then((sdir)=>{
                        sdir.items.forEach((filerefs)=>{
                            deleteObject(sref(fireStorage, folderref.fullPath+"/"+filerefs.name));
                        });
                    });
                    
                });
            });
        }
        alert("Deleted the selected news");
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
                const newsKey = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                if(isChecked){
                    updateSelectedNews(selectedNews => [...selectedNews,news[newsKey].id]);
                }
                else{
                    updateSelectedNews(selectedNews => (selectedNews.filter(item => item !== news[newsKey].id)));
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
                deleteNews().then(()=>{
                    window.location.reload(true);
                });
                break;

            case "Upload" :
                var downloadLinks = {}
                const id = push(ref(fireDb)).key;
                for(let i=0;i<files.length;i++){
                    if(i==0){
                        setLoading(1);
                    }
                    try {
                        const key = push(ref(fireDb)).key;
                        await uploadBytes(sref(fireStorage,"NewsPhotos/"+`${id}`+"/"+`${key}`+"/"+`${files[i].name}`),files[i]);
                        const url = await getDownloadURL(sref(fireStorage,"NewsPhotos/"+`${id}`+"/"+`${key}`+"/"+`${files[i].name}`));
                        downloadLinks[key]=url;
                    } catch (error) {
                        alert(`Failed to upload :- ${files[i].name} due to ${error}`);
                    }
                }
                var today = new Date();
                var date = today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
                await set(ref(fireDb,`News/${id}/`),{"content":draftToHtml(convertToRaw(editorState.getCurrentContent())),"date":date,"heading":heading,"images":downloadLinks});
                setLoading(0);
                window.location.reload(true);
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
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Delete">Delete News</button>:""}

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
                <div >
                    {news.map((nnew,key) => 
                        (<div className="news" >
                            <input type="checkbox" name="Checkbox" data-key={key} onClick={handleSubmit}/>
                            <h3 key={key}>{nnew.heading}<br/>{"Uploaded on:- "+nnew.date}</h3>
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