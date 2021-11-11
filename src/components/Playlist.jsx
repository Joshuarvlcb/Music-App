import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useAlbumContext } from "../util/Album";
import { Link } from "react-router-dom";
import Library from "./Library";

const Playlist = () => {
  const { playlist } = useAlbumContext();
  return (
    <div className="playlist">
      <div className="row">
        <div className="playlist__header">Playlist</div>
        <div className="arrows">
          <BiLeftArrow
            className="arrow"
            onClick={() => {
              console.log(absValue, "back");

              if (absValue == 0 || absValue < 0) {
                setAbsValue(0);

                return (albumsStyle.current.style.left = 0 + "px");
              }
              setAbsValue((prev) => {
                let val = prev - 180;
                albumsStyle.current.style.left = -val + "px";
                return val;
              });
            }}
          />
          <BiRightArrow
            className="arrow"
            onClick={() => {
              // if (absValue == 1440 || absValue > 1500) {
              //   setAbsValue(0);

              //   return (albumsStyle.current.style.left = 0 + "px");
              // }
              setAbsValue((prev) => {
                let val = prev + 180;

                albumsStyle.current.style.left = -val + "px";
                return val;
              });
              console.log(absValue, "forward");
            }}
          />
        </div>
      </div>
      {
        //loop over playlist array of objects
      }
      <div className="playlists">
        {playlist.map((obj, i) => {
          return (
            <Link to="songs">
              <Library obj={obj} i={i} key={i} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
