import './ModifyScrollNotification.css';
import { useState } from 'react';
import { fireDb } from '../../../Config/Firebase';
import { ref,push,get,update } from 'firebase/database';

function ModifyScrollNotification()
{
    const [content,updateContent] = useState("");
    const [url,updateUrl] = useState("");
    const [notificationList,updateNotificationList] = useState([]);
    const [selectedNotifications,updateSelectedNotifications] = useState([]);

    const addNotification = (async () => {
        await push(ref(fireDb,"ScrollNotification"),{
            content:content,
            url:url
        });
    });

    const convertToNotificationDivList = ((notifications) => {
        var notificationDivList = [],index = 0;
        for(var key in notifications) {
            notificationDivList.push(
                <div className="notificationBox" key={index}>
                    <div>
                        <input 
                            type="checkbox" 
                            name="checkboxBtn" 
                            data-key={key} 
                            onClick={handleClick}
                        />
                    </div>
                    <div>
                        <h3> Notification {index+1} </h3> 
                        <p> {notifications[key].content} </p>
                        <p> Detailed Notification Link : <a href={notifications[key].url}> {notifications[key].url}</a> </p> 
                    </div>
                </div>
            );
            index++;
        }
        return notificationDivList;
    });

    const getNotifications = (async () => {
        var notifications = {};
        await get(ref(fireDb,"ScrollNotification"))
        .then((snapshot) => {
            if(snapshot.exists()) {
                notifications =  snapshot.val();  
            }
        }).catch((error) => {
            console.error(error);
        });
        return convertToNotificationDivList(notifications);
    });

    const deleteNotifications = (async () => {
        var deleteUpdates = {};
        for (var key in selectedNotifications)
        {
            deleteUpdates[selectedNotifications[key]] = null;
        }
        await update(ref(fireDb,"ScrollNotification"),deleteUpdates);
    });

    const setDefaultSettings = (() => {
        document.getElementsByClassName("modifyOptions")[0].style.display = "block";
        document.getElementsByClassName("addNotification")[0].style.display = "none";
        document.getElementsByClassName("deleteNotification")[0].style.display = "none";    
        document.getElementsByClassName("modifyType")[0].style.display = "block";
        updateContent("");
        updateUrl("");
        updateNotificationList([]);
        updateSelectedNotifications([]);
    });
    
    const handleClick = ((event) => {
        event.target.blur();
        switch (event.target.name) {
            case "modifyBtn":
                const dataHidden = event.target.getAttribute("data-hidden");
                const modifyType = document.getElementsByClassName("modifyType")[0];
                if(dataHidden === "true") {
                    modifyType.style.display = "block";
                    event.target.setAttribute("data-hidden","false");
                }
                else {
                    modifyType.style.display = "none";
                    event.target.setAttribute("data-hidden","true");
                }
                break;
            
            case "addOptionBtn":
                document.getElementsByClassName("modifyOptions")[0].style.display = "none";
                document.getElementsByClassName("deleteNotification")[0].style.display = "none";
                document.getElementsByClassName("modifyType")[0].style.display = "block";
                document.getElementsByClassName("addNotification")[0].style.display = "block";
                break;
            
            case "deleteOptionBtn":
                document.getElementsByClassName("modifyOptions")[0].style.display = "none";
                document.getElementsByClassName("addNotification")[0].style.display = "none";
                document.getElementsByClassName("modifyType")[0].style.display = "block";
                document.getElementsByClassName("deleteNotification")[0].style.display = "block";
                getNotifications().then((notifications) => {
                    updateNotificationList(notifications);
                }).catch((error) => {
                    console.error(error);
                });
                break;

            case "addBtn":
                if(content.length > 0) {
                    addNotification().then(() => {
                        console.log("notification added")
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                else {
                    console.log("No content");
                }
                setDefaultSettings();
                break;
            
            case "deleteBtn":
                deleteNotifications().then(()=>{
                    console.log("Selected Notifications Deleted");
                }).catch((error) => {
                    console.error(error);
                });
                
                // Refresh
                getNotifications().then((notifications) => {
                    updateNotificationList(notifications);
                }).catch((error) => {
                    console.error(error);
                });
                break;

            case "cancelBtn":
                setDefaultSettings();
                break;
            
            case "refreshList":
                getNotifications().then((notifications) => {
                    updateNotificationList(notifications);
                }).catch((error) => {
                    console.error(error);
                });
                break;
            
            case "checkboxBtn":
                const notificationKey = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                
                if(isChecked) {
                    updateSelectedNotifications(selectedNotifications => selectedNotifications.concat(notificationKey));
                }
                else {
                    updateSelectedNotifications(selectedNotifications => (selectedNotifications.filter(item => item !== notificationKey)));
                }
                break;

            default:
                break;
        }
    });

    const handleChange = ((event) => {
        if(event.target.name === "content"){
            updateContent(event.target.value);
        }
        else if(event.target.name === "url"){
            updateUrl(event.target.value);
        }
    });

    return (
        <div className="modifyScrollNotification">
            <button onClick={handleClick} className="modifyBtn" name="modifyBtn" data-hidden="true" style={{display:"block"}}> Scroll Notification </button>
            <div className="modifyType" style={{display:"none"}}>

                <div className="modifyOptions" style={{display:"block"}}>
                    <button onClick={handleClick} name="addOptionBtn"> Add Notification </button>
                    <button onClick={handleClick} name="deleteOptionBtn"> Delete Notification </button>    
                </div>

                <div className="addNotification" style={{display:"none"}}>
                    <label>
                        Brief Description <br/>
                        <textarea value={content} name="content" onChange={handleChange} placeholder="Type the brief description of the notification here"/>
                    </label>
                    <br/>
                    <label>
                        Detailed Description URL <br/>
                        <input type="text" name="url" value={url} onChange={handleChange} placeholder="Type the URL of detailed description of the notification here"/> 
                    </label> 
                    <br/>
                    <button onClick={handleClick} name="addBtn">Add Notification</button>
                    <button onClick={handleClick} name="cancelBtn">Cancel</button>
                </div>

                <div className="deleteNotification" style={{display:"none"}}>
                    <button onClick={handleClick} name="refreshList"> Refresh List </button>
                    {notificationList}
                    <button onClick={handleClick} name="deleteBtn">Delete</button>
                    <button onClick={handleClick} name="cancelBtn">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModifyScrollNotification;