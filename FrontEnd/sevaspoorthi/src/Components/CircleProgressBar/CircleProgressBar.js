import './CircleProgressBar.css';
import { useEffect } from "react";

function CircleProgressBar(props)
{
    const Id = "circle-"+props.details.id.toString();
    const raisedAmt = props.details.raisedAmt;
    const requiredAmt = props.details.requiredAmt;
    const progressPercent = (raisedAmt / requiredAmt) * 360;
    const displayPercent = Number.parseFloat(((raisedAmt / requiredAmt) * 100).toFixed(1));

    useEffect(() => {
        const circleProgressPercent = document.getElementById(Id);
        circleProgressPercent.style.background= "conic-gradient(#01b801 0deg,#01b801 " + progressPercent.toString()+"deg,#d6f0d6 "+progressPercent.toString()+ "deg";
    });
    
    return (
        <div className="circleProgressBar" id={Id} key={Id}>
            <div className="circle">
                <strong> {displayPercent}% </strong>
            </div>
        </div>
    );
}

export default CircleProgressBar;