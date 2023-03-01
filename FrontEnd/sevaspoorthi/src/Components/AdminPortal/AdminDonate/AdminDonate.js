import './AdminDonate.css';
import { useState } from 'react';
import { fireDb } from '../../../Config/Firebase';
import { ref,push,get,update } from 'firebase/database';
import DonateCard from '../../DonateCard/DonateCard';
import TextEditor from '../../TextEditor/TextEditor';

function AdminDonate()
{
    const [donateDetails,updateDonateDetails] = useState({
        donateCardHeading:"",
        createdBy:"",
        donateCardImageSrc:"",
        donateCardImageAlt:"",
        daysLeft:0,
        raisedAmt:0,
        requiredAmt:0,
        supportersCount:0,
        about:"",
        donateDetailImageSrc:"",
        donateDetailImageAlt:"",
        metaDescription:"",
        previewDescription:"",
        previewImageSrc:""
    });
    const [donationList,updateDonationList] = useState([]);
    const [selectedDonations,updateSelectedDonations] = useState([]);

    const addDonation = (async () => {
        // await push(ref(fireDb,"Donate"),{

        // });
    });

    const convertToDonationDivList = ((donations) => {
        var donationDivList = [],index = 0;
        var index = 0;
        for(var i=0;i<donations.length;i++) {
            donationDivList.push(
                <div className="donationBox" key={donations[i].id}>
                    <div>
                        <input 
                            type="checkbox" 
                            name="checkboxBtn" 
                            data-key={donations[i].id} 
                            onClick={handleClick}
                        />
                    </div>
                    <div>
                        <DonateCard details={donations[i]} key={donations[i].id}/>
                    </div>
                </div>
            );
            index++;
        }
        return donationDivList;
    });

    const getDonations = (async () => {
        var donations = [];
        await get(ref(fireDb,"Donate"))
        .then((snapshot) => {
            if(snapshot.exists()) {
                var donateCardsKeyValuePairs = Object.entries(snapshot.val());
                for (const [key,value] of donateCardsKeyValuePairs){
                    let donateDetails = value;
                    donateDetails["id"] = key;
                    donations.push(donateDetails);
                }      
            }
        }).catch((error) => {
            console.error(error);
        });
        console.log(donations);
        return convertToDonationDivList(donations);
    });

    const deleteDonations = (async () => {
        var deleteUpdates = {};
        for (var key in selectedDonations)
        {
            deleteUpdates[selectedDonations[key]] = null;
        }
        await update(ref(fireDb,"Donate"),deleteUpdates);
    });

    const setDefaultSettings = (() => {
        document.getElementsByClassName("modifyDonateOptions")[0].style.display = "block";
        document.getElementsByClassName("addDonate")[0].style.display = "none";
        document.getElementsByClassName("deleteDonate")[0].style.display = "none";    
        document.getElementsByClassName("modifyDonateType")[0].style.display = "block";
        updateDonateDetails({});
        updateDonationList([]);
        updateSelectedDonations([]);
    });
    
    const handleClick = ((event) => {
        event.target.blur();
        switch (event.target.name) {
            case "modifyBtn":
                const dataHidden = event.target.getAttribute("data-hidden");
                const modifyType = document.getElementsByClassName("modifyDonateType")[0];
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
                document.getElementsByClassName("modifyDonateOptions")[0].style.display = "none";
                document.getElementsByClassName("deleteDonate")[0].style.display = "none";
                document.getElementsByClassName("modifyDonateType")[0].style.display = "block";
                document.getElementsByClassName("addDonate")[0].style.display = "block";
                break;
            
            case "deleteOptionBtn":
                document.getElementsByClassName("modifyDonateOptions")[0].style.display = "none";
                document.getElementsByClassName("addDonate")[0].style.display = "none";
                document.getElementsByClassName("modifyDonateType")[0].style.display = "block";
                document.getElementsByClassName("deleteDonate")[0].style.display = "block";
                getDonations().then((donations) => {
                    updateDonationList(donations);
                }).catch((error) => {
                    console.error(error);
                });
                break;

            case "addBtn":
                // if(content.length > 0) {
                //     addDonation().then(() => {
                //         console.log("donation added")
                //     }).catch((error) => {
                //         console.log(error);
                //     });
                // }
                // else {
                //     console.log("No content");
                // }
                setDefaultSettings();
                break;
            
            case "deleteBtn":
                deleteDonations().then(()=>{
                    console.log("Selected Donations Deleted");
                }).catch((error) => {
                    console.error(error);
                });
                
                // Refresh
                getDonations().then((donations) => {
                    updateDonationList(donations);
                }).catch((error) => {
                    console.error(error);
                });
                break;

            case "cancelBtn":
                setDefaultSettings();
                break;
            
            case "refreshList":
                getDonations().then((donations) => {
                    updateDonationList(donations);
                }).catch((error) => {
                    console.error(error);
                });
                break;
            
            case "checkboxBtn":
                const notificationKey = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                
                if(isChecked) {
                    // updateSelectedDonations(selectedNotifications => selectedNotifications.concat(notificationKey));
                }
                else {
                    // updateSelectedDonations(selectedNotifications => (selectedNotifications.filter(item => item !== notificationKey)));
                }
                break;

            default:
                break;
        }
    });

    const handleChange = ((event) => {
        // if(event.target.name === "content"){
        //     updateContent(event.target.value);
        // }
        // else if(event.target.name === "url"){
        //     updateUrl(event.target.value);
        // }
    });

    return (
        <div className="modifyDonate">
            <h3>Donate Section</h3>
            <button onClick={handleClick} className="modifyBtn" name="modifyBtn" data-hidden="true" style={{display:"block"}}>Edit Donate Details </button>
            <div className="modifyDonateType" style={{display:"none"}}>

                <div className="modifyDonateOptions" style={{display:"block"}}>
                    <button onClick={handleClick} name="addOptionBtn"> Add Donation </button>
                    <button onClick={handleClick} name="deleteOptionBtn"> Delete Donation </button>    
                </div>

                <div className="addDonate" style={{display:"none"}}>
                    {/* <label>
                        Brief Description <br/>
                        <textarea value={content} name="content" onChange={handleChange} placeholder="Type the brief description of the notification here"/>
                    </label>
                    <br/>
                    <label>
                        Detailed Description URL <br/>
                        <input type="text" name="url" value={url} onChange={handleChange} placeholder="Type the URL of detailed description of the notification here"/> 
                    </label> 
                    <br/> */}
                    <div className="addDonateControls">
                        <button onClick={handleClick} name="addBtn">Add Donate</button>
                        <button onClick={handleClick} name="cancelBtn">Cancel</button>    
                    </div>
                    <div className="donateInputDetails">
                        <div className="donateCardInputDetails">
                            <h3> Donate Card Details </h3>
                            <label>
                                Donation Heading <br />
                                <input type="text" value={donateDetails.donateCardHeading} onChange={handleChange} placeholder="Type the donation heading here"/>
                            </label>
                            <label>
                                Created By <br />
                                <input type="text" value={donateDetails.createdBy} onChange={handleChange} placeholder="Type the donation creator here"/>
                            </label>
                            <label>
                                Donate Card Image <br />
                                <input type="text" value={donateDetails.donateCardImageSrc} onChange={handleChange} placeholder="Type the url of DonateCard photo"/>
                            </label>
                            <label>
                                Donate Card Image Alternate <br />
                                <input type="text" value={donateDetails.donateCardImageAlt} onChange={handleChange} placeholder="Type the DonateCard photo alternate"/>
                            </label>
                            <label>
                                Days Left <br />
                                <input type="number" value={donateDetails.daysLeft} onChange={handleChange} />
                            </label>
                            <label>
                                Raised Amount <br />
                                <input type="number" value={donateDetails.raisedAmt} onChange={handleChange} />
                            </label>
                            <label>
                                Required Amount <br />
                                <input type="number" value={donateDetails.requiredAmt} onChange={handleChange} />
                            </label>
                            <label>
                                Supporters Count <br />
                                <input type="number" value={donateDetails.requiredAmt} onChange={handleChange} />
                            </label>
                            <label>
                                Required Amount <br />
                                <input type="number" value={donateDetails.requiredAmt} onChange={handleChange} />
                            </label>
                            <label>
                                Add metaDescription (Max 155 characters) <br />
                                <input type="text" value={donateDetails.metaDescription} onChange={handleChange} placeholder="Type the metaDescription for Donation"/>
                            </label>
                            <label>
                                Share Preview Description (Max 65 characters) <br />
                                <input type="text" value={donateDetails.previewDescription} onChange={handleChange} placeholder="Type the share previewImage for Donation"/>
                            </label>
                            
                            <label>
                                Share Preview Image (Less than 300KB and dimension of 300 X 300) <br />
                                <input type="text" value={donateDetails.previewImageSrc} onChange={handleChange} placeholder="Type the share previewImage for Donation"/>
                            </label>
                        </div>
        
                    </div>
                    <div className="donateDetailsInput">
                        <label>
                            Donate Details Image <br />
                            <input type="text" value={donateDetails.donateDetailImageSrc} onChange={handleChange} placeholder="Type the url of DonateDetails photo"/>
                        </label>
                        <label>
                            Donate Details Image Alternate <br />
                            <input type="text" value={donateDetails.donateDetailImageAlt} onChange={handleChange} placeholder="Type the DonateDetails photo alternate"/>
                        </label>
                        <label>
                            About
                            <TextEditor/>
                        </label>
                    </div>

                </div>

                <div className="deleteDonate" style={{display:"none"}}>
                    <div className="deleteDonateControls">
                        <button onClick={handleClick} name="refreshList"> Refresh List </button>
                        <button onClick={handleClick} name="deleteBtn">Delete</button>
                        <button onClick={handleClick} name="cancelBtn">Cancel</button>    
                    </div>
                    <div className="donationList">
                        {donationList}
                    </div>
                </div>
            </div>
            <div className="line"/>
        </div>
    );
}

export default AdminDonate;