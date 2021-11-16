import React, { useEffect, useRef } from "react";
import { useAlbumContext } from "../util/Album";
import { useNavigate } from "react-router";
const Loader = () => {
  const nav = useNavigate();
  const loaderRef = useRef();
  const { loader, isItDoneLoading } = useAlbumContext();
  useEffect(() => {
    console.log(loaderRef);
    const timeOut = setTimeout(() => {
      if (
        loader == true &&
        !loaderRef?.current?.className?.split(" ")?.includes("none") &&
        loader.current
      ) {
        nav(-1);
        isItDoneLoading(false);
      }
    }, 3500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [loader]);
  if (window.location.pathname == "/login") return "";

  return (
    <div ref={loaderRef} className={`containter ${loader ? "" : "none"}`}>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
    </div>
  );
};

export default Loader;
