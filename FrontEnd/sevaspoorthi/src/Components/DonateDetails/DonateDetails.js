// import { useState } from 'react';
import './DonateDetails.css';
// import { Editor } from "react-draft-wysiwyg";import { EditorState } from 'draft-js';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CircleProgressBar from '../CircleProgressBar/CircleProgressBar';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { fireDb } from '../../Config/Firebase';
import { ref,child,get } from 'firebase/database';
import { Helmet } from "react-helmet";

async function getDonateDetails(id,setDetails,setMetaTags) {
    const donateDetailsRef = ref(fireDb,"DonateDetails");
    const donateRef = ref(fireDb,"Donate");
    var donateDetailsSnap = await get(child(donateDetailsRef,id.toString())); 
    var donateSnap = await get(child(donateRef,id.toString()));
    var details = {
        heading:"",
        contentImage:"",
        contentAlt:"",
        about:"",
        raisedAmt:0,
        requiredAmt:0,
        daysLeft:0,
        supportersCount: 0
    };
    if(donateDetailsSnap.exists() && donateSnap.exists())
    {
        details = donateDetailsSnap.val();
        console.log(details);
        var donateSummary = donateSnap.val();
        details["raisedAmt"] = donateSummary["raisedAmt"];
        details["requiredAmt"] = donateSummary["requiredAmt"];
        details["daysLeft"] = donateSummary["daysLeft"];
        details["supportersCount"] = donateSummary["supportersCount"];
    }
    // console.log(details);
    document.getElementsByClassName("donateDetailsAbout")[0].innerHTML = details.about;
    
    // adding meta data
    document.querySelector("title").innerHTML = details.heading; 

    const metaDetails = {
        type:"website",
        site_name:"SevaSpoorthi",
        metaDescripition: details.metaDescription,
        title:details.heading,
        url:window.location.href,
        description: details.previewDescription,
        image: details.previewImage
    };
    const metaTagsGen = (metaDetails) => {
        let metaTags =  [];
        for (const [key,value] of Object.entries(metaDetails)){
            if (key !== "metaDescripition") {
                metaTags.push(
                    <meta property={"og:"+key.toString()} content={value} key={"og:"+key.toString()}/>
                );
            }
            else {
                metaTags.push(
                    <meta name={"og:description"} content={value} key="metaDescription"/>
                );   
            }
        }
        return metaTags;
    };
    const metaTags = metaTagsGen(metaDetails);
    setMetaTags(metaTags);
    setDetails(details);
}

function DonateDetails(props)
{
    const {id} = useParams();
    console.log(id);

    const [details,setDetails] = useState({
        heading:"",
        contentImage:"",
        contentAlt:"",
        about:"",
        raisedAmt:0,
        requiredAmt:0,
        daysLeft:0,
        supportersCount: 0
    });
    const [metaTags,setMetaTags] = useState([]);

    useEffect(() => {
        getDonateDetails(id,setDetails,setMetaTags);
    },[id]);

    // const [editorState,onEditorStateChange] = useState(EditorState.createEmpty());
    return (
        <div className="donateDetails">
            <Helmet>
                {metaTags}
            </Helmet>
            <div className="donateDetailsHeading">
                {details.heading}  
            </div>
            <div className="donateDetailsBody">
                <div className="donateDetailsContent">
                    <div className="contentImage">
                        <img src={details.contentImage} alt={details.contentAlt} />
                    </div>
                    <div className="donateDetailsAbout">

                    </div>
                    <div className="donateDetailsDocuments">
                        {/* documents proof */}
                    </div>
                    <div className="donateDetailsUpdates">
                        {/* details updates */}
                    </div>
                    <div className="donateDetailsComments">
                        {/* comments */}
                    </div>
                </div>
                <div className="donateQuickDetails">
                    <div>
                        <a href={window.location.href}><button className="donateSolidBtn"> Donate Now </button></a>
                    </div>
                    <div> 
                        {/* types of payment options available */}
                    </div>
                    <div>
                        {/* share btn */}
                    </div>
                    <div className="donateDetailsStats">
                        {/* donateStats */}
                        <div className="progressDetails">
                            <CircleProgressBar details={{id:id,raisedAmt:details.raisedAmt,requiredAmt:details.requiredAmt}} key={id}/>
                            <div> <strong> &#8377;{details.raisedAmt} </strong> raised out of <strong> &#8377;{details.requiredAmt} </strong> </div>
                        </div>
                        <div className="donateStats">
                            <p>
                                <div> ⏱<strong> {details.daysLeft} </strong> Days Left </div>
                                <div> 💖<strong> {details.supportersCount} </strong> Supportors </div>
                            </p>
                        </div>
                    </div>
                    <div className="contactDetails">
                        {/* contact details of campaigner */}

                    </div>
                    <div className="topDonors">
                        {/* list of top donors */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonateDetails;