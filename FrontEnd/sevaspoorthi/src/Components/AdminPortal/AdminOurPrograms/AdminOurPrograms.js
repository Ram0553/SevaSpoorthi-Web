import { get, limitToFirst, orderByKey, push, query, ref, set, startAfter, update } from "firebase/database";
import { uploadBytes,ref as sref, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { fireDb, fireStorage } from "../../../Config/Firebase";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../LoadingSpinner/Spinner";
import './AdminOurPrograms.css';

function AdminOurPrograms(){
    const [file,setFile] = useState([]);
    const [caption,setCaption] = useState("");
    const [description,setDescription] = useState("");
    const [loading,setLoading] = useState(0);
    const {checkAdmin}  = useContext(AuthContext);
    const [buttonState,setButtonState] = useState("");
    const [programs,setPrograms] = useState([]);
    const [nextKey,setNextKey] = useState("");
    const [selectedPrograms,updateSelectedPrograms] = useState([]);

    const fetch = () => {
        const recentPostsRef =nextKey!=""? query(ref(fireDb, "Photos/OurPrograms"),orderByKey(), startAfter(nextKey.toString()))
                                         : query(ref(fireDb, "Photos/OurPrograms"),orderByKey());
        get(recentPostsRef).then((snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((prog)=>{
                    const pid=prog.key;
                    const plink=prog.child("Link").val();
                    const caption=prog.child("Caption").val();
                    const description=prog.child("Description").val();
                    const program = {programId:pid,photoLink:plink,caption:caption,description:description};
                    setNextKey(pid);
                    setPrograms(programs=>[...programs,program]);
                });
            }
        });
    }

    const deletePrograms = async () => {
        if(selectedPrograms.length==0){
            console.log("---------");
            return;
        }
        var deletePrograms = {};
        for (var key in selectedPrograms)
        {
            deletePrograms[selectedPrograms[key]] = null;
        }
        await update(ref(fireDb,"Photos/OurPrograms"),deletePrograms);

        for (var key in selectedPrograms)
        {
            const desertRef = sref(fireStorage, 'OurPrograms/'+selectedPrograms[key]);
            await listAll(desertRef).then((dir)=>{
                dir.items.forEach((fileref)=>{
                    deleteObject(sref(fireStorage, desertRef.fullPath+"/"+fileref.name));
                })
            });
        }
        alert(`Deleted the selected ${selectedPrograms.length==1?"program":"programs"}`);
    };

    const handleSubmit = async (event) =>{
        switch (event.target.name) {
            case "Add" :
                setButtonState("EditAdd");
                break;

            case "Cancel" :
                setButtonState("");
                break;
            
            case "Caption" :
                setCaption(event.target.value);
                break;
            
            case "Checkbox" :
                const programKey = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                if(isChecked){
                    updateSelectedPrograms(selectedPrograms => [...selectedPrograms,programs[programKey].programId]);
                }
                else{
                    updateSelectedPrograms(selectedPrograms => (selectedPrograms.filter(item => item !== programs[programKey].programId)));
                }
                break;
            
            case "Delete" :
                setButtonState("EditDelete");
                fetch();
                break;
            
            case "Description" :
                setDescription(event.target.value);
                break;

            case "Edit" :
                setButtonState("Edit");
                break;
    
            case "File" :
                setFile(event.target.files);
                break;

            case "Remove" :
                await deletePrograms().then(()=>{
                    console.log("Selected programs Deleted");
                    setNextKey("");
                    setPrograms([]);
                    updateSelectedPrograms([]);
                });
                break;

            case "Upload" :

                setLoading(1);
                try {
                    const key = push(ref(fireDb)).key;
                    await uploadBytes(sref(fireStorage,"OurPrograms/"+`${key}`+"/"+`${file[0].name}`),file[0]);
                    const url = await getDownloadURL(sref(fireStorage,"OurPrograms/"+`${key}`+"/"+`${file[0].name}`));
                    await set(ref(fireDb,"Photos/OurPrograms/"+key),{"Link":url,"Caption":caption,"Description":description});
                } catch (error) {
                    alert(`Failed to upload :- ${file[0].name} due to ${error}`);
                }
                setLoading(0);
                setButtonState("");
                setCaption("");
                setDescription("");
                alert("Successfully uploaded program");
                break;

            default :
                break;
        }
        
    }

    useEffect(() => {
      if(programs.length==0){
        fetch();
      }
    }, [programs]);

    return (
        <div className="adminprograms">
            <h3>Our Programs Section</h3>
            <div>
                {checkAdmin==true && buttonState==""?<button onClick={handleSubmit} name="Edit">Edit Programs</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Add">Add Programs</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Delete">Delete Programs</button>:""}

                {buttonState=="EditAdd"?
                    <div className="editadd">
                        <input type="file" id="file" name="File"  onChange={handleSubmit}/>
                        <label>
                            Caption
                            <br/>
                            <textarea value={caption} className="caption" name="Caption" onChange={handleSubmit} placeholder="Type the caption here"/>
                        </label>
                        <label>
                            Description
                            <br/>
                            <textarea value={description} className="description" name="Description" onChange={handleSubmit} placeholder="Type the detailed description of the program here"/>
                        </label>
                        <button onClick={handleSubmit} name="Upload">Upload</button>
                    </div>
                :""}


                {loading!=0?<LoadingSpinner/>:""}
            </div>
            {buttonState=="EditDelete"?
                <>
                <div className="images">
                    {programs.map((imgSrc,key) => 
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
export default AdminOurPrograms;