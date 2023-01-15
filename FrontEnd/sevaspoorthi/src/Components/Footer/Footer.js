import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import logo from './logo.png';
import mapImage from './map.png';
import Map from '../GoogleMap/Map';

function FooterSocialMediaLinks()
{
    return (
        <div className = 'footer-socialmedialinks'>
            <div className = 'social-links'>
                <a href="https://youtube.com/@sevaspoorthifoundation3191"
                    className="youtube-social">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="https://www.facebook.com/"
                    className="facebook-social">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.twitter.com/" 
                    className="twitter-social">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.instagram.com/"
                    className="instagram-social">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </div>
        </div>
    );
}

function FooterBody()
{
    return (
        <div className="footer-body">
            <div className="about-us">
                <h3>About Us</h3>
                <img src={logo} alt="Logo" style={{ maxWidth:"50%",aspectRatio:"1/1",float:"left" }}/>
                <p> Seva Spoorthi Foundation is a NGO working for the cause of welfare of the farming community, with Specific advisory on organic farming, related  farm technologies  to  encourage  farmers  for organized Production to make available healthy products to consumers, improve income of the farmers and Sustainable agriculture in the states of Telangana and AP. We have been creating awareness on organic, IPM and good farming practices since 2020. </p>
            </div>
            <div className='footer-body-inner'>
                <div className="quick-links">
                    <h3> Quick Links </h3>
                    <div className='quick-links-inner'>
                        <a href="/"> <p> Home </p> </a>
                        <a href="/AboutUs"> <p> About </p> </a>
                        <a href=""> <p> Donate </p> </a>
                        <a href=""> <p> Villages </p> </a>
                    </div>
                </div>
                <div className="connect">
                    <h3> Connect </h3>
                    <div className='connect-inner'>
                        <a href=""> <p> News </p> </a>
                        <a href=""> <p> Programs </p> </a>
                        <a href=""> <p> Gallery </p> </a>
                        <a href=""> <p> Notifications </p> </a>
                    </div>
                </div>
                <div className="offices-map">
                    <div>
                        <h3> Contact Us </h3>
                        <div className='contact'>
                            <a href="tel:+919994241399">Call Us!</a>
                            <a href="mailto:sevaspoorthi.web@gmail.com">Send Email</a>
                        </div>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24456.418063578833!2d78.52842894260648!3d17.347236081597234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98812f186801%3A0x20635e36d1b259d9!2sAnjireddynagar%20Colony%2C%20Sai%20Ram%20Nagar%20Colony%2C%20Champapet%2C%20Telangana%20500079!5e0!3m2!1sen!2sin!4v1673719071094!5m2!1sen!2sin" zoom="16" className='iframe-map'  allowFullScreen={true} loading="lazy"></iframe>               
                </div>
            </div>
        </div>
    );
}

function FooterCopyright(props)
{
    return (
        <div className="footer-copyright">
            &copy;Created by SevaSpoorthi Tech Team
        </div>
    );
}

function Footer()
{
    return (
        <div className="footer">
            <FooterSocialMediaLinks/>
            <FooterBody/>
            <FooterCopyright/>
        </div>
    );
}

export default Footer;