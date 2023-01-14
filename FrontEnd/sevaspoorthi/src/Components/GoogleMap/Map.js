import React from 'react'
import './Map.css';

const Map = () => {
    return(
        <div className="map">
            <h2 className="map-h2">Come Visit Us At Our Campus</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24456.418063578833!2d78.52842894260648!3d17.347236081597234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98812f186801%3A0x20635e36d1b259d9!2sAnjireddynagar%20Colony%2C%20Sai%20Ram%20Nagar%20Colony%2C%20Champapet%2C%20Telangana%20500079!5e0!3m2!1sen!2sin!4v1673719071094!5m2!1sen!2sin" zoom="16" className='iframe-map'  allowFullScreen={true} loading="lazy"></iframe>
        </div>
    );
}

export default Map;