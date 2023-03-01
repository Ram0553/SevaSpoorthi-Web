import './AdminDonate.css';
import { useState } from 'react';
import { fireDb } from '../../../Config/Firebase';
import { ref,push,get,update,child,set } from 'firebase/database';
import DonateCard from '../../DonateCard/DonateCard';
import TextEditor from '../../TextEditor/TextEditor';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

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
    const [editorState,setEditorState] = useState(EditorState.createEmpty());

    const addDonation = (async () => {
        const donateData = {
            createdBy:donateDetails.createdBy,
            daysLeft:donateDetails.daysLeft,
            donateCardHeading:donateDetails.donateCardHeading,
            imageAlt:donateDetails.donateCardImageAlt,
            imageSrc:donateDetails.donateCardImageSrc,
            raisedAmt:donateDetails.raisedAmt,
            requiredAmt:donateDetails.requiredAmt,
            supportersCount:donateDetails.supportersCount
        };
        const donateDetailsData = {
            about: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            contentAlt:donateDetails.donateDetailImageAlt,
            contentImage:donateDetails.donateDetailImageSrc,
            heading:donateDetails.donateCardHeading,
            metaDescription:donateDetails.metaDescription,
            previewDescription:donateDetails.previewDescription,
            previewImage:donateDetails.previewImageSrc
        };
        const donateChildRef = await push(ref(fireDb,"Donate"),donateData);
        const key = donateChildRef.key;
        await set(child(ref(fireDb,"DonateDetails"),key.toString()),donateDetailsData);
    });

    const convertToDonationDivList = ((donations) => {
        var donationDivList = [];
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
        // console.log(donations);
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
        updateDonateDetails(donateDetails => ({...donateDetails,
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
        }));
        updateDonationList([]);
        updateSelectedDonations([]);
        setEditorState(EditorState.createEmpty());
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
                addDonation().then(() => {
                    console.log("donation added")
                }).catch((error) => {
                    console.log(error);
                });
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
                const donationKey = event.target.getAttribute("data-key");
                const isChecked = event.target.checked;
                
                if(isChecked) {
                    updateSelectedDonations(selectedDonations => selectedDonations.concat(donationKey));
                }
                else {
                    updateSelectedDonations(selectedDonations => (selectedDonations.filter(item => item !== donationKey)));
                }
                break;

            default:
                break;
        }
    });

    const handleChange = ((event) => {
        const targetName = event.target.name;
        updateDonateDetails(donateDetails => ({...donateDetails,[targetName]:event.target.value}));
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
                    <div className="addDonateControls">
                        <button onClick={handleClick} name="addBtn">Add Donate</button>
                        <button onClick={handleClick} name="cancelBtn">Cancel</button>    
                    </div>
                    <div className="donateInputDetails">
                        <div className="donateCardInputDetails">
                            <h3> Donate Card Details </h3>
                            <label>
                                Donation Heading <br />
                                <input type="text" name="donateCardHeading" value={donateDetails.donateCardHeading} onChange={handleChange} placeholder="Type the donation heading here"/>
                            </label>
                            <label>
                                Created By <br />
                                <input type="text" name="createdBy" value={donateDetails.createdBy} onChange={handleChange} placeholder="Type the donation creator here"/>
                            </label>
                            <label>
                                Donate Card Image <br />
                                <input type="text" name="donateCardImageSrc" value={donateDetails.donateCardImageSrc} onChange={handleChange} placeholder="Type the url of DonateCard photo"/>
                            </label>
                            <label>
                                Donate Card Image Alternate <br />
                                <input type="text" name="donateCardImageAlt" value={donateDetails.donateCardImageAlt} onChange={handleChange} placeholder="Type the DonateCard photo alternate"/>
                            </label>
                            <label>
                                Days Left <br />
                                <input type="number" name="daysLeft" value={donateDetails.daysLeft} onChange={handleChange} />
                            </label>
                            <label>
                                Raised Amount <br />
                                <input type="number" name="raisedAmt" value={donateDetails.raisedAmt} onChange={handleChange} />
                            </label>
                            <label>
                                Required Amount <br />
                                <input type="number" name="requiredAmt" value={donateDetails.requiredAmt} onChange={handleChange} />
                            </label>
                            <label>
                                Supporters Count <br />
                                <input type="number" name="supportersCount" value={donateDetails.supportersCount} onChange={handleChange} />
                            </label>
                            <label>
                                Add metaDescription (Max 155 characters) <br />
                                <input type="text" name="metaDescription" value={donateDetails.metaDescription} onChange={handleChange} placeholder="Type the metaDescription for Donation"/>
                            </label>
                            <label>
                                Share Preview Description (Max 65 characters) <br />
                                <input type="text" name="previewDescription" value={donateDetails.previewDescription} onChange={handleChange} placeholder="Type the share previewImage for Donation"/>
                            </label>
                            
                            <label>
                                Share Preview Image (Less than 300KB and dimension of 300 X 300) <br />
                                <input type="text" name="previewImageSrc" value={donateDetails.previewImageSrc} onChange={handleChange} placeholder="Type the share previewImage for Donation"/>
                            </label>
                        </div>
        
                    </div>
                    <div className="donateDetailsInput">
                        <label>
                            Donate Details Image <br />
                            <input type="text" name="donateDetailImageSrc" value={donateDetails.donateDetailImageSrc} onChange={handleChange} placeholder="Type the url of DonateDetails photo"/>
                        </label>
                        <label>
                            Donate Details Image Alternate <br />
                            <input type="text" name="donateDetailImageAlt" value={donateDetails.donateDetailImageAlt} onChange={handleChange} placeholder="Type the DonateDetails photo alternate"/>
                        </label>
                        <label>
                            About
                            <TextEditor editorState={editorState} setEditorState={setEditorState}/>
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