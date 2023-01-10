import './HomepageCarousel.css'
import Carousel from '../Carousel/Carousel';
import homepage from './HomepageSlides'
import { useEffect, useState } from 'react';
import { child, get, ref } from 'firebase/database';
import { fireDb } from '../../Config/Firebase';

function HomepageCarousel(props)
{
    const [slides, setSlides] = useState([]);

    const fetchSlides = () => {
        get(child(ref(fireDb),"Photos/HomepageCarousel")).then((snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((photo)=>{
                    const plink=photo.child("Link").val();
                    setSlides(photos=>[...photos,plink]);
                })
            }
        });
        return;
    }

    useEffect(() => {
      fetchSlides();
    }, [])
    
    return (
        <Carousel className="homepage-carousel" slides={slides}/>
    );
}

export default HomepageCarousel;