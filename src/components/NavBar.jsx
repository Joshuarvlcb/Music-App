import React, { useEffect, useState } from "react";
import { FiSettings, FiSearch, FiHome, FiBookmark } from "react-icons/fi";
import { RiPlayListFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <div className="navbar">
      <li className="navbar__link">
        <FiHome className="navbar__icon" />
        Home
      </li>
      <li className="navbar__link">
        <FiSearch className="navbar__icon" />
        Search
      </li>
      <li className="navbar__link">
        <RiPlayListFill className="navbar__icon" />
        Playlist
      </li>
      <li className="navbar__link">
        <FiBookmark className="navbar__icon" />
        Favorites
      </li>
    </div>
  );
};

export default NavBar;
