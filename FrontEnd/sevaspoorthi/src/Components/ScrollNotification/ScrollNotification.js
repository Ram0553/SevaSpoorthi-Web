import './ScrollNotification.css';
import { useEffect,useRef } from 'react';

function ScrollNotification(props)
{
    const notifications = props.notifications;
    const notificationsDiv = notifications.map((notification,index) => {
        return (
            <div className="notification" key={index}>
                <a href={notification.url}>  <strong>🆕📢{notification.content}</strong></a>
            </div>
        );
    }); 
    const divLength = useRef(0); 
    
    useEffect(() => {
        divLength.current = document.getElementsByClassName("scrollElement")[0].scrollWidth;
        const paddedDivLength = divLength.current+100;
        console.log(paddedDivLength);
        document.getElementsByClassName("scrollNotification")[0].style.cssText = "--paddedDivLength: " + paddedDivLength.toString()+"px";
    });

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

export default ScrollNotification;