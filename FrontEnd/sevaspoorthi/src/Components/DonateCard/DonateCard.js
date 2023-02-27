import './DonateCard.css';
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';

function DonateCard(props)
{
    const progressDetails = {
        id:props.details.id,
        daysLeft: props.details.daysLeft,
        supportersCount : props.details.supportersCount,
        raisedAmt:props.details.raisedAmt,
        requiredAmt:props.details.requiredAmt
    };
    let currAddress = window.location.href;
    if(currAddress[currAddress.length - 1]!== '/'){currAddress = currAddress + "/";}
    return (
        <a href={"/Donate/" + props.details.id.toString()} style={{textDecoration:"none",color:"black"}} className="linkDonateCard">
            <div className="donateCard" id={props.details.id}>
                <div className="donateCardHeader">
                    <img src={props.details.imageSrc} alt={props.details.imageAlt} />
                </div>
                <div className="donateCardBody">
                    <div className="donateHeading"> <strong> {props.details.donateCardHeading} </strong> </div>
                    <div className="createdBy"> 
                        {/* profile image icon */}
                        <div> Created by {props.details.createdBy} </div>
                    </div>
                    <div className="donateCardDetails">
                        <div className="progressDetails">
                            <CircleProgressBar details={progressDetails} key={progressDetails.id}/>
                            <div> <strong> &#8377;{props.details.raisedAmt} </strong> raised out of <strong> &#8377;{props.details.requiredAmt} </strong> </div>
                        </div>
                        <div className="donateStats">
                            <p>
                                <div> ⏱<strong>{props.details.daysLeft} </strong> Days Left </div>
                                <div> 💖<strong>{props.details.supportersCount} </strong> Supportors </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="donateCardFooter">
                    <a href={"https://api.whatsapp.com/send?text=" + currAddress + props.details.id.toString()} data-action="share/whatsapp/share"> <button className="shareBtn"> Share </button> </a> 
                    <a href={currAddress + props.details.id.toString()}> <button className="donateBtn"> Donate </button> </a> 
                </div>
            </div>
        </a>

        
    );
}

export default DonateCard;