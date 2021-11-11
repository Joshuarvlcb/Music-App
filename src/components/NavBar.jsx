import React, { useEffect, useState } from "react";
import { FiSettings, FiSearch, FiHome, FiBookmark } from "react-icons/fi";
import { MdLibraryMusic } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <li className="navbar__link">
        <Link to="/home">
          {" "}
          <FiHome className="navbar__icon" />
          Home
        </Link>
      </li>
      <li className="navbar__link">
        <Link to="/search">
          <FiSearch className="navbar__icon" />
          Search
        </Link>
      </li>
      <li className="navbar__link">
        <Link to="/library">
          <MdLibraryMusic className="navbar__icon" />
          Library
        </Link>
      </li>
    </div>
  );
};

export default NavBar;
