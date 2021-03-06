import React, { useEffect, useState } from "react";
import { FiSettings, FiSearch, FiHome, FiBookmark } from "react-icons/fi";
import { MdLibraryMusic } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAlbumContext } from "../util/Album";

const NavBar = () => {
  const { isItDoneLoading } = useAlbumContext();
  return (
    <div className="navbar">
      <Link
        className="navbar__link"
        to="/home"
        onClick={() => isItDoneLoading(true)}
      >
        {" "}
        <FiHome className="navbar__icon" />
        <div className="text"> Home</div>
      </Link>
      <Link
        className="navbar__link"
        to="/search"
        onClick={() => isItDoneLoading(true)}
      >
        <FiSearch className="navbar__icon" />
        <div className="text"> Search</div>
      </Link>
      <Link className="navbar__link" to="/library">
        <MdLibraryMusic className="navbar__icon" />
        <div className="text">Library</div>
      </Link>
      <Link className="navbar__link" to="/home">
        <FiSettings className="navbar__icon" />
        <div className="text">Setting</div>
      </Link>
    </div>
  );
};

export default NavBar;
