import React from "react";
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

  
function FooterSocialMediaLinks(props)
{
    return (
        <div className = 'footer-socialmedialinks'>
            <div className = 'social-links'>
                <a href="https://www.youtube.com/"
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
                <h1>About Us</h1>
                <img src="./logo192.png" alt="Logo" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi blanditiis voluptas enim animi, deleniti consequuntur fuga doloribus cum ipsam quidem iure vel eius tempora labore corporis dolores deserunt nostrum possimus.</p>
            </div>
            <div className="our-work">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque praesentium doloremque, sunt voluptate a temporibus aliquam facilis similique error officia itaque molestiae illo consequatur autem? Iste omnis reprehenderit a iusto.</p>
            </div>
            <div className="contact-us">
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum blanditiis natus veniam, consectetur commodi in placeat sed debitis provident laboriosam voluptate repellendus fuga, sint expedita hic repellat ea non itaque. </p>
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