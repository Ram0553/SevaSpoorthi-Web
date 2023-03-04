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

    const [aboutCollapse,setAboutCollapse] = useState(false);
    const [leadershipCollapse,setLeadershipCollapse] = useState(true);
    const [financialCollapse,setFinancialCollapse] = useState(true);
    const [sponsorCollapse,setSponsorCollapse] = useState(true);
    const [locationCollapse,setLocationCollapse] = useState(false);
    const [story,setStory] = useState("");
    

    const handleClick = ((event) =>{
        switch (event.target.getAttribute("name") ) {
            case "about-us":
                // setAboutCollapse(!aboutCollapse);
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
                // setLocationCollapse(!locationCollapse);
                break;
            default:
                break;
        }
    });

    useEffect(() => {
        get(ref(fireDb,"About/Story")).then((snapshot)=>{
            setStory(snapshot.child("Data").val());
            document.getElementsByClassName("about-inner")[0].innerHTML=snapshot.child("Data").val();
            // setAboutCollapse(false);
        });
    }, [])
    
    return (
        <div>
            <NavBar/>
            <div className="about-outer">
                <img src="https://firebasestorage.googleapis.com/v0/b/sevaspoorthi-web.appspot.com/o/Sevaspoorthi-FrontOffice%2Fsevaspoorthi-front--office.jpeg?alt=media&token=5d15d01c-34f7-41d8-97bb-1ee0b740ca0e"/>
                <div className="about">
                    <div className="about-us">
                        <h1 onClick={handleClick} name="about-us">About Us{"  "}{<FontAwesomeIcon name="about-us" icon={aboutCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                        
                            <>
                                <div className="about-inner"></div>
                                <div className="line"/>
                            </>
                        
                    </div>
                    {/* <div className="leadership">
                        <h1 onClick={handleClick} name="leadership">Our Leadership{"  "}{<FontAwesomeIcon name="leadership" icon={leadershipCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                    </div>
                    <div className="financial">
                        <h1 onClick={handleClick} name="financial">Our Financials{"  "}{<FontAwesomeIcon name="financial" icon={financialCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                    </div>
                    <div className="sponsors">
                        <h1 onClick={handleClick} name="sponsors">Lead Sponsors{"  "}{<FontAwesomeIcon name="sponsors" icon={sponsorCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                    </div> */}
                    <div className="location">
                        <h1 onClick={handleClick} name="location">Location{"  "}{<FontAwesomeIcon name="location" icon={locationCollapse==false?faAngleDoubleDown:faAngleDoubleRight} style={{height:"1.5vw"}}/>}</h1>
                        {
                            <>
                                <Map/>
                                <div className="line"/>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;