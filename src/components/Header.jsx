import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import Navbar from "./NavBar";

/*
dont put it in a use effect becasue it will infinite loop
dont put href = in code
we will have the user copy paste the auth url
*/
const Header = () => {
  // (() => {
  //   window.location.href = "http://localhost:3000/" + AUTH_URL;
  // })();

  return (
    <div className="header-con">
      <div className="header">
        <div className="header__start">
          {/* block */}
          <div className="header__name">
            musi<span classname="bold">cat</span>
          </div>
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
          <div>Setting</div>
        </li>
      </div>
    </div>
  );
};

export default Header;
