import React,{useEffect,useState} from 'react';
import {FiSettings,FiMusic,FiHome,FiBookmark} from 'react-icons/fi';

const NavBar = () => {
  

    return (
        <div className = 'navbar'>
            <FiHome className = 'navbar__icon'/>
            <FiMusic className = 'navbar__icon'/>
            <FiBookmark className = 'navbar__icon'/>
            <FiSettings className = 'navbar__icon'/>
        </div>
    )
};

export default NavBar;