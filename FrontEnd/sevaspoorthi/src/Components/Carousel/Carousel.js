import { useState,useEffect } from 'react';
import './Carousel.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft,faChevronRight} from '@fortawesome/free-solid-svg-icons';

function Carousel(props)
{
    const carouselClass = props.className.toString();
    const propsSlides = props.slides;
    const noOfSlides = propsSlides.length;
    const [activeSlide,changeActiveSlide] = useState(0);
    const slidesDivs = propsSlides.map((slide,index) => {
        if (index !== activeSlide)
        {
            return (
                <div className = {carouselClass + "-slide-item"} key = {index}>
                    <img src={slide.src} alt={slide.alt} />
                </div>
            );
        }
        else
        {
            return (
                <div className = {carouselClass + "-slide-item active"} key = {index}>
                    <img src={slide.src} alt={slide.alt} />
                </div>
            );
        }
    });
    const carouselDots = Array(noOfSlides).fill(null).map((elem,index) => <button className="carousel-dot" key={index} onClick = {() => changeActiveSlide(index)}></button>);
    carouselDots[activeSlide] = (<button className="carousel-dot active" key={activeSlide}></button>)
    const outerCarouselStyleSettings = props.styleSettings;
    return (
        <div className="carousel" style={outerCarouselStyleSettings}>
            <div className="leftslide" onClick={() => changeActiveSlide((activeSlide-1+noOfSlides)%noOfSlides)}>
                <span>
                    <FontAwesomeIcon icon={faChevronLeft} className="carousel-controls" />
                </span>
            </div>
            <div className="rightslide" onClick={() => changeActiveSlide((activeSlide+1)%noOfSlides)}>
                <span>
                    <FontAwesomeIcon icon={faChevronRight} className="carousel-controls" />
                </span>
            </div>  
            <div className="carousel-dots">
                {carouselDots}
            </div>
            <div className={carouselClass}>  
                <div className={carouselClass + "-slides"}>
                    {slidesDivs}
                </div>
            </div>
        </div>
    );    
}

export default Carousel;