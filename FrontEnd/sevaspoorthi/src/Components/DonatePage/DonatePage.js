import './DonatePage.css';
import DonateCard from '../DonateCard/DonateCard';
import { fireDb } from '../../Config/Firebase';
import { ref,get } from "firebase/database";
import { useEffect, useState } from 'react';

async function getDonateCards(setDonateCards)
{
    const donateRef = ref(fireDb,"Donate");
    var donateCards = [];
    var snapshot = await get(donateRef);
    if(snapshot.exists()) {
        var donateCardsKeyValuePairs = Object.entries(snapshot.val());
        for (const [key,value] of donateCardsKeyValuePairs){
            let donateDetails = value;
            donateDetails["id"] = key;
            donateCards.push(donateDetails);
        }    
    }
    // console.log(donateCards);
    setDonateCards(donateCards);
}
function DonatePage()
{
    const [donateCards,setDonateCards] = useState([]);

    useEffect(() => {
        getDonateCards(setDonateCards);
    },[]);
    
    return (
        <div className="donateCarousel">
            {donateCards.map((donateDetails) => {
                return <DonateCard details={donateDetails} key={donateDetails.id}/>
            })}
        </div>
    );
}

export default DonatePage;