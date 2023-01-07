import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import logo from "./logo.png";
import Menuitem from './menuItem';
import MenuItems from './MenuItems';
import './NavBar.css';

function NavBar() {

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
        console.log(menuBar);
        return
    }
    
    const [menuBar,setMenuBar]=useState(true);

    const myFunction=()=> {
        var navbar = document.getElementsByClassName("navbar")[0];
        if (window.pageYOffset > 0) {
          navbar.classList.add("sticky")
        } else {
          navbar.classList.remove("sticky");
        }
      }

    useEffect(() => {
        window.addEventListener('scroll', myFunction);
    
        return () => window.removeEventListener('scroll', myFunction);
    
    }, [myFunction]);
    
    const {currentUser , checkAdmin} = useContext(AuthContext);
    


    
  return (
    <div>
        <nav className='navbar'>
            <div className='logo'>
                <img src={logo} className='logo-img' alt='SevaSpoorthi'/>
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
    </div>
  )
}

export default NavBar