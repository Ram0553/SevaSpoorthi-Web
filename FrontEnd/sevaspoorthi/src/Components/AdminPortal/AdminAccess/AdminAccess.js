import { get, limitToFirst, orderByKey, push, query, ref, set, startAfter, update } from "firebase/database";
import { uploadBytes,ref as sref, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { fireDb, fireStorage } from "../../../Config/Firebase";
import { AuthContext } from "../../../Context/AuthContext";
import LoadingSpinner from "../../LoadingSpinner/Spinner";
import './AdminAccess.css';

function AdminAccess(){
    const [loading,setLoading] = useState(0);
    const {checkAdmin}  = useContext(AuthContext);
    const [buttonState,setButtonState] = useState("");
    const [admins,setAdmins] = useState([]);
    const [users,setUsers] = useState([]);
    const [selectedAdmins,updateSelectedAdmins] = useState([]);
    const [selectedUsers,updateSelectedUsers] = useState([]);

    const fetchAdmins = async () => {
        const recentPostsRef = query(ref(fireDb, "Admin"));
        get(recentPostsRef).then((snapshot)=>{
            if(snapshot.exists()){
                get(ref(fireDb,"Users")).then((userSnapshot)=>{
                    if(userSnapshot.exists()){
                        snapshot.forEach((user)=>{
                            const uid=user.key;
                            const u = userSnapshot.child(uid);
                                const name = u.child("Name").val();
                                const mail = u.child("Mail").val();
                                const obj = {"uid":uid,"name":name,"email":mail};
                                setAdmins(admin=>[...admin,obj]);
                        });
                    }
                });
            }
        });
        return;
    }

    const fetchUsers = () => {
        const recentPostsRef = query(ref(fireDb, "Users"));
        get(recentPostsRef).then((snapshot)=>{
            if(snapshot.exists()){
                get(ref(fireDb,"Admin")).then((adminSnapshot)=>{
                    if(adminSnapshot.exists()){
                        snapshot.forEach((user)=>{
                            const uid=user.key;
                            const name = user.child("Name").val();
                            const mail = user.child("Mail").val();
                            const obj = {"uid":uid,"name":name,"email":mail};
                            if(!adminSnapshot.child(obj.uid).exists()){
                                setUsers(user=>[...user,obj]);
                            }              
                        });
                    }
                });
            }
        });
    }

    

    const deleteAdmins = (async () => {
        var deleteAdmins = {};
        for (var key in selectedAdmins)
        {
            deleteAdmins[selectedAdmins[key]] = null;
        }
        await update(ref(fireDb,"Admin"),deleteAdmins);
        alert(`Removed the selected ${selectedAdmins.length==1?"Admin":"Admins"}`);
    });

    const updateAdmins = async () =>{
        var newAdmins = {};
        for (var key in selectedUsers)
        {
            newAdmins[selectedUsers[key]] = true;
        }
        await update(ref(fireDb,"Admin"),newAdmins);
        alert(`Updated the selected ${selectedAdmins.length==1?"Admin":"Admins"}`);
    }

    const handleSubmit = async (event) =>{
        switch (event.target.name) {
            case "Add" :
                setButtonState("EditAdd");
                fetchUsers();
                break;

            case "Cancel" :
                setButtonState("");
                setAdmins([]);
                setUsers([]);
                updateSelectedAdmins([]);
                updateSelectedUsers([]);
                break;
            
            case "CheckboxD" :
                const index = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                if(isChecked){
                    updateSelectedAdmins(selectedAdmins => [...selectedAdmins,admins[index].uid]);
                }
                else{
                    updateSelectedAdmins(selectedAdmins => (selectedAdmins.filter(item => item !== admins[index].uid)));
                }
                break;
            
            case "CheckboxU" :
                const idx = event.target.getAttribute("data-key");
                const isCheckd = event.target.checked;
                if(isCheckd){
                    updateSelectedUsers(selectedUsers => [...selectedUsers,users[idx].uid]);
                }
                else{
                    updateSelectedUsers(selectedUsers => (selectedUsers.filter(item => item !== users[idx].uid)));
                }
                break;
            
            case "Delete" :
                setButtonState("EditDelete");
                fetchAdmins();
                break;

            case "Edit" :
                setButtonState("Edit");
                break;

            case "Remove" :
                deleteAdmins().then(()=>{
                    setAdmins([]);
                    updateSelectedAdmins([]);
                    fetchAdmins();
                });
                break;

            case "Update" :
                updateAdmins().then(()=>{
                    setUsers([]);
                    updateSelectedUsers([]);
                    fetchUsers();
                });
                break;

            default :
                break;
        }
        
    }

    return (
        <div className="AdminAccess">
            <h3>Admin Access Section</h3>
            <div>
                {checkAdmin==true && buttonState==""?<button onClick={handleSubmit} name="Edit">Edit Admin Access</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Add">Add Admin</button>:""}
                {buttonState=="Edit"?<button onClick={handleSubmit} name="Delete">Delete Admin</button>:""}

                {/* {buttonState=="EditAdd"?<input type="file" id="file" multiple name="Files"  onChange={handleSubmit}/>:""} */}
                {buttonState=="EditAdd"?
                    <>
                        <div className="admins">
                            <h2>Users List</h2>
                            {users.map((user,key) => 
                                (<div>
                                    <input type="checkbox" name="CheckboxU" data-key={key} onClick={handleSubmit}/>
                                    <h3>{user.name}</h3>
                                    <h3>{user.email}</h3>
                                </div>
                            ))}
                        </div> 
                        <button onClick={handleSubmit} name="Update">Update Admins</button>
                    </>
                :""}


                {loading!=0?<LoadingSpinner/>:""}
            </div>
            {buttonState=="EditDelete"?
                <>
                <div className="admins">
                    <h2>Admin List</h2>
                    {admins.map((admin,key) => 
                        (<div>
                            <input type="checkbox" name="CheckboxD" data-key={key} onClick={handleSubmit}/>
                            <h3>{admin.name}</h3>
                            <h3>{admin.email}</h3>
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
export default AdminAccess;