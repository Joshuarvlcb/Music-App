import React from 'react';

import {FiSearch} from 'react-icons/fi';
import {IoNotificationsSharp}from 'react-icons/io5';

const Header = () => {
    return (
        <div className = 'header'>
            <div className="header__icon"></div>
            
            <div className="search__container">
                <input class="search__input" type="text" placeholder="Search"/>
                <FiSearch className = 'search__icon'/>
            </div>

            <div className="header__notification">
                <IoNotificationsSharp className = 'bell'/>
                <div className="red"></div>
            </div>
        </div>
    )
}

export default Header;
