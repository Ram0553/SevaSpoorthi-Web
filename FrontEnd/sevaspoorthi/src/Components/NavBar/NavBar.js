import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import logo from "./logo.png";
import Menuitem from './menuItem';
import MenuItems from './MenuItems';
import './NavBar.css';

function NavBar() {

    const navbarRef = useRef(null);
    const [menuBar,setMenuBar]=useState(true);
    const {currentUser , checkAdmin} = useContext(AuthContext);
    var navHeight = 0;

    const menu=()=>{
        if(menuBar){
            document.getElementsByClassName("side-menubar")[0].style.cssText='display:none';
            document.getElementsByClassName("nav-list")[0].style.cssText='display:flex';
        }
        else{
            document.getElementsByClassName("nav-list")[0].removeAttribute('style');
            document.getElementsByClassName("side-menubar")[0].removeAttribute('style');
        }
        setMenuBar(!menuBar);
        return
    }
    
    const myFunction=()=> {
        var navbar = document.getElementsByClassName("navbar")[0];
        if (window.pageYOffset > navHeight) {
            navbar.classList.add("sticky");
            console.log(navHeight);
        } else {
            navbar.classList.remove("sticky");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', myFunction);
        return () => window.removeEventListener('scroll', myFunction);
    }, []);

    const handleLoad = () => {
        navHeight=navbarRef.current.clientHeight;
    }
    
  return (
    <nav ref={navbarRef} className='navbar'>
        <div className='logo'>
            <img onLoad={handleLoad}  src={logo} className='logo-img' alt='SevaSpoorthi'/>
            <div className='logo-name'>
                <h3>Seva</h3>
                <h3>Spoorthi</h3>
            </div>
        </div>

        <button onClick={menu} className='side-menubar'>
            <FontAwesomeIcon icon={faBars} className='menu-button'/>
        </button>

        <div className='nav-list'>
            <button onClick={menu} className='side-menubar-cross'>
            <FontAwesomeIcon icon={faXmark} className='menu-button' />
            </button>
            <div className='nav-div'>
                {Menuitem({currentUser,checkAdmin}).map((menu, index) => {
                    return <MenuItems items={menu} key={index} />;
                })}
            </div>
        </div>
        
    </nav>
  )
}

export default NavBar