import './ScrollNotification.css';
import { useState,useEffect } from 'react';
import { fireDb } from '../../Config/Firebase';
import { ref,onValue } from 'firebase/database';

function isEqual(stateNotificationsKeyList,newNotificationsKeyList)
{
    if(stateNotificationsKeyList.length === 0){return false;}
    if(stateNotificationsKeyList.length !== newNotificationsKeyList.length){return false;}
    stateNotificationsKeyList.sort();
    newNotificationsKeyList.sort();
    for(var key=0;key<stateNotificationsKeyList.length;key++)
    {
        if(stateNotificationsKeyList[key] !== newNotificationsKeyList[key]){return false;}
    }
    return true;
}

function convertToScrollNotificationDiv(notifications) {
    var newNotificationsDiv = [];
    for (var notif_key in notifications)
    {
        var value = notifications[notif_key];
        newNotificationsDiv.push(
            <div className="notification" key={notif_key}>
                <a href={value.url}>  <strong>🆕📢{value.content}</strong></a>
            </div>
        );
    }
    return newNotificationsDiv;
}

function setScrollNotifications(updateNotificationsDiv)
{
    if (typeof(setScrollNotifications.notificationKeys) === 'undefined')
    {
        setScrollNotifications.notificationKeys = [];
    }   
    onValue(ref(fireDb,"ScrollNotification"),(snapshot) => {
        if(snapshot.exists()) {
            const notifications = snapshot.val();
            let newNotificationKeys = Object.keys(notifications);
            if(!isEqual(setScrollNotifications.notificationKeys,newNotificationKeys))
            {
                setScrollNotifications.notificationKeys = newNotificationKeys;
                const notificationsDiv = convertToScrollNotificationDiv(notifications);
                updateNotificationsDiv(notificationsDiv);
            }
        }
        else if(setScrollNotifications.notificationKeys.length > 0){
            setScrollNotifications.notificationKeys = [];
            updateNotificationsDiv([]);
        }
    });
}

function ScrollNotification()
{
    const [notificationsDiv,updateNotificationsDiv] = useState([]);
    
    useEffect(() => {
        setScrollNotifications(updateNotificationsDiv);
        if(notificationsDiv.length !== 0)
        {
            const divLength = document.getElementsByClassName("scrollElement")[0].scrollWidth;
            const paddedDivLength = divLength+100;
            document.getElementsByClassName("scrollNotification")[0].style.cssText = "--paddedDivLength: " + paddedDivLength.toString()+"px";
        }
    });

    if(notificationsDiv.length !== 0)
    {
        return (
            <div className="scrollNotification">
                <div className="scrollElement primary">
                    {notificationsDiv}
                </div>
                <div className="scrollElement secondary">
                    {notificationsDiv}
                </div>
            </div>
        );    
    }
    else
    {
        return (<></>);
    }
}

export default ScrollNotification;