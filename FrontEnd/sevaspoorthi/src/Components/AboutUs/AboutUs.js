import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import './AboutUs.css';
import { useEffect } from "react";
import { get, ref } from "firebase/database";
import { fireDb } from "../../Config/Firebase";
import Map from "../GoogleMap/Map";

function AboutUs(){

    const [aboutCollapse,setAboutCollapse] = useState(true);
    const [leadershipCollapse,setLeadershipCollapse] = useState(true);
    const [financialCollapse,setFinancialCollapse] = useState(true);
    const [sponsorCollapse,setSponsorCollapse] = useState(true);
    const [locationCollapse,setLocationCollapse] = useState(true);
    const [heading,setHeading] = useState("");
    const [story,setStory] = useState("");
    const location ={
        address:"Survey No. 324, Dundigal Village, Gowdavelli-Dundigal Rd, Telangana 500043",
        lat:17.609780283424158,
        lng:78.43750181054814
    };

    const handleClick = ((event) =>{
        switch (event.target.getAttribute("name") ) {
            case "about-us":
                setAboutCollapse(!aboutCollapse);
                break;
            case "leadership":
                setLeadershipCollapse(!leadershipCollapse);
                break;
            case "financial":
                setFinancialCollapse(!financialCollapse);
                break;
            case "sponsors":
                setSponsorCollapse(!sponsorCollapse);
                break;
            case "location":
                setLocationCollapse(!locationCollapse);
                break;
            default:
                console.log(event.target.name);
                break;
        }
    });

    useEffect(() => {
        get(ref(fireDb,"About/Story")).then((snapshot)=>{
            setHeading(snapshot.child("Heading").val());
            setStory(snapshot.child("Data").val());
            setAboutCollapse(false);
        });
    }, [])
    
    return (
        <div>
            <NavBar/>
            <div className="about-outer">
                <img src="https://i.pinimg.com/736x/a4/bf/5b/a4bf5b0f579cb3b494cd3fef6c508663--monsoon-the-indians.jpg"/>
                <div className="about">
                    <div className="about-us">
                        <h1 onClick={handleClick} name="about-us">About Us{"  "}{<FontAwesomeIcon name="about-us" icon={aboutCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                        {aboutCollapse==false?
                            <>
                                <div className="line"/>
                                {heading}
                                {story.toString().split('\\n').map(function(item,key){
                                    return (
                                        <span key={key}>
                                            {item}
                                            <br/>
                                        </span>
                                    )
                                })}
                                <div className="line"/>
                            </>:""
                        }
                    </div>
                    <div className="leadership">
                        <h1 onClick={handleClick} name="leadership">Our Leadership{"  "}{<FontAwesomeIcon name="leadership" icon={leadershipCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                    </div>
                    <div className="financial">
                        <h1 onClick={handleClick} name="financial">Our Financials{"  "}{<FontAwesomeIcon name="financial" icon={financialCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                    </div>
                    <div className="sponsors">
                        <h1 onClick={handleClick} name="sponsors">Lead Sponsors{"  "}{<FontAwesomeIcon name="sponsors" icon={sponsorCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                    </div>
                    <div className="location">
                        <h1 onClick={handleClick} name="location">Location{"  "}{<FontAwesomeIcon name="location" icon={locationCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                        {locationCollapse==false?
                            <>
                                <div className="line"/>
                                <Map/>
                                <div className="line"/>
                            </>
                            :""
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;