import React from "react";

import { FiSettings } from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";
import Navbar from "./NavBar";

const Header = () => {
  return (
    <div className="header">
      <div className="header__start">
        {/* block */}
        <div className="header__name">musicat</div>
        <div className="header__flex">
          <div className="header__icon"></div>
          <div className="user__name">Guest</div>
        </div>
      </div>
      {/* <div className="search__container">
                <input class="search__input" type="text" placeholder="Search"/>
                <FiSearch className = 'search__icon'/>
            </div> */}

      <Navbar />
      <li className="navbar__link setting">
        <FiSettings className="navbar__icon" />
        Setting
      </li>
    </div>
  );
};

export default Header;
