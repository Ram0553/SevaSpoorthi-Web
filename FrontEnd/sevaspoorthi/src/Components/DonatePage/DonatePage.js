import './DonatePage.css';
import DonateCard from '../DonateCard/DonateCard';
import { fireDb } from '../../Config/Firebase';
import { ref,get } from "firebase/database";
import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Carousel from '../Carousel/Carousel';

// async function getDonateCards(setDonateCards)
// {
//     const donateRef = ref(fireDb,"Donate");
//     var donateCards = [];
//     var snapshot = await get(donateRef);
//     if(snapshot.exists()) {
//         var donateCardsKeyValuePairs = Object.entries(snapshot.val());
//         for (const [key,value] of donateCardsKeyValuePairs){
//             let donateDetails = value;
//             donateDetails["id"] = key;
//             donateCards.push(donateDetails);
//         }    
//     }
//     // console.log(donateCards);
//     setDonateCards(donateCards);
// }
function DonatePage()
{
    // const [donateCards,setDonateCards] = useState([]);
    const donationImg = [
        "https://firebasestorage.googleapis.com/v0/b/sevaspoorthi-web.appspot.com/o/GlobalPhotos%2F-NPkanOBI5ZwiFtoaBr2%2F20200910_081511.jpg?alt=media&token=b5260926-cb07-465c-9da2-9254ee7aaed1",
        "https://firebasestorage.googleapis.com/v0/b/sevaspoorthi-web.appspot.com/o/GlobalPhotos%2F-NPkaoDKK09X7lldwbQm%2F20200925_203458.jpg?alt=media&token=ad583bf9-aa45-49d1-9896-74cb4a337da8",
        "https://firebasestorage.googleapis.com/v0/b/sevaspoorthi-web.appspot.com/o/GlobalPhotos%2F-NPkb0ph1i7wxQTd5jTp%2F20211012_121932.jpg?alt=media&token=8739bbef-9b6f-4672-a316-1a1bdb9638fb",
    ]
    function getDonate() {
        const donateRef = ref(fireDb,"Donate/content");
        get(donateRef).then((snapshot)=>{
            if(snapshot.exists()) {
                document.getElementsByClassName("donate")[0].innerHTML=snapshot.val();
                console.log(snapshot.val());
            }
        });
    }

    useEffect(() => {
        // getDonateCards(setDonateCards);
        getDonate();

    },[]);
    
    return (
        <div className="donationComponent">
            <NavBar/>
            {/* <h1> Donations </h1>
            <div className="donateCarousel">
                {donateCards.map((donateDetails) => {
                    return <DonateCard details={donateDetails} key={donateDetails.id}/>
                })}
            </div> */}
            {donationImg.length!=0?<Carousel className="homepage-carousel" slides={donationImg}/>:""}
            <div className='donate'></div>
        </div>
        
    );
}

export default DonatePage;