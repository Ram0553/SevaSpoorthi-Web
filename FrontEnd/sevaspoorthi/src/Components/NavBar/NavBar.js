import React, { useState } from 'react'
import './NavBar.css'
import logo from "./logo.png"
import sideMenuBar from "./sideMenuBar.svg"
import cross from "./cross.svg"

function NavBar() {
    const handle=(events)=>{
        console.log(events.target.value)
        return
    }
    const menu=()=>{
        if(menuBar){
            document.getElementsByClassName("side-menubar")[0].style.cssText='display:none';
            document.getElementsByClassName("nav-list")[0].style.cssText='display:flex';
        }
        else{
            document.getElementsByClassName("nav-list")[0].style.cssText='display:none';
            document.getElementsByClassName("side-menubar")[0].style.cssText='display:flex';
        }
        setMenuBar(!menuBar);
        console.log(menuBar);
        return
    }
    const [menuBar,setMenuBar]=useState(true);
  return (
    <div>
        <div className='top-navbar'>
            Select Language
        </div>
        <nav className='navbar'>
            <div>
                <img src={logo} className='logo' alt='SevaSpoorthi'/>
            </div>

            <button id='side-menubar' onClick={menu} className='side-menubar'>
                <img src={sideMenuBar}/>
            </button>

            <div className='nav-list'>
                <button id='side-menubar-cross' onClick={menu} className='side-menubar-cross'>
                    <img src={cross}/>
                </button>
                <div className='nav-div'>
                    <div className='nav-item'>
                        <a href='#'>Home</a>
                    </div>
                    <div className='nav-item'>
                        <a href='#'>About</a>
                    </div>
                    <div className='nav-item'>
                        <a href='#'>Villages</a>
                    </div>
                    <div className='nav-item'>
                        <a href='#'>Donate</a>
                    </div>
                    <div className='nav-item'>
                        <a href='#' >Register</a>
                    </div>
                </div>
            </div>
            
        </nav>
    </div>
  )
}

export default NavBar