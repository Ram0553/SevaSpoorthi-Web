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

function FooterSocialMediaLinks(props)
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

function FooterBody(props)
{
    return (
        <div className="footer-body">
            <div className="about-us">
                <h3>About Us</h3>
                <img src={logo} alt="Logo" style={{ maxWidth:"50%",aspectRatio:"1/1",float:"left" }}/>
                <p> Seva Spoorthi Foundation is a NGO working for the cause of welfare of the farming community, with Specific advisory on organic farming, related  farm technologies  to  encourage  farmers  for organized Production to make available healthy products to consumers, improve income of the farmers and Sustainable agriculture in the states of Telangana and AP. We have been creating awareness on organic, IPM and good farming practices since 2020. </p>
            </div>
            <div className="quick-links">
                <h3> Quick Links </h3>
                <a href=""> <p> Home </p> </a>
                <a href=""> <p> About </p> </a>
                <a href=""> <p> Donate </p> </a>
                <a href=""> <p> Villages </p> </a>
            </div>
            <div className="connect">
                <h3> Connect </h3>
                <a href=""> <p> Our Mission </p> </a>
                <a href=""> <p> Notifications </p> </a>
                <a href=""> <p> News </p> </a>
                <a href=""> <p> Events </p> </a>
            </div>
            <div className="offices-map">
                <div>
                    <h3> Contact Us </h3>
                    <p> Hyd Office Location</p>
                    <p> Call Us: phonenumber </p>
                </div>
                <div className="google-map">
                    <img src={mapImage} alt="Map" style={{width:"95%",aspectRatio:"1/1"}}/>
                </div>                
            </div>
        </div>
    );
}

function FooterCopyright(props)
{
    return (
        <div className="footer-copyright">
            &copy;Created by Sevapoorthi 💖💖💖
        </div>
    );
}

function Footer(props)
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