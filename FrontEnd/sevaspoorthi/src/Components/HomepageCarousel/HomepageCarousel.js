import './HomepageCarousel.css'
import Carousel from '../Carousel/Carousel';
import homepage from './HomepageSlides'

function HomepageCarousel(props)
{
    const outerCarouselStyleSettings = {
        height:"100vh"
      };
    return (
        <Carousel className="homepage-carousel" slides={homepage.slides} styleSettings={outerCarouselStyleSettings}/>
    );
}

export default HomepageCarousel;