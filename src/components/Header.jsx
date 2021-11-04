import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import Navbar from "./NavBar";

const clientID = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
console.log(
  new Buffer.from(clientID, "binary").toString("base64"),
  "\n",
  clientSecret
);

const Header = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const gettingToken = async () => {
      const res = await axios("https://accounts.spotify.com/api/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer.from(
              "cb2ed77176254eebbdd48f2c8b025d1b",
              "binary"
            ).toString("base64") +
            ":" +
            new Buffer.from(
              "64504eeb639f4e16b51a7fe6e8d349e1",
              "binary"
            ).toString("base64"),
        },
        data: "grant_type=client_credentials",
        method: "POST",
      });
      console.log(res);
    };
    gettingToken();
  }, []);
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
