import './CardDeck.css';
import Card from '../Card/Card'
import { child, get, ref } from 'firebase/database';
import { fireDb } from '../../Config/Firebase';
import { useEffect } from 'react';
import { useState } from 'react';

function CardDeck(){

    const fetchDeck = () =>{
        get(child(ref(fireDb),"Photos/OurPrograms")).then((snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((program)=>{
                    const image=program.child("Link").val();
                    const caption=program.child("Caption").val();
                    const description=program.child("Description").val();
                    const obj = {image:image,caption:caption,description:description};
                    setCarddeck(programs=>[...programs,obj]);
                })
            }
        });
        return;
    }

    const [carddeck,setCarddeck] = useState([]);

    useEffect(() => {
        fetchDeck()
    }, []);

    const cardItems = carddeck.map((card,index) => {
        return <Card cardItem={card} key={index} />
    });

    return (
        <div className='programs'>
            <h1>
                Our Programs
            </h1>
            <div className="line"/>
            <div className="card-deck">
                {cardItems}
            </div>
        </div>
    );
}

export default CardDeck;