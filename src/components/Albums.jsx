import React, { useRef, useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Playlist from "./Playlist";
import { useAlbumContext } from "../util/Album";

const Albums = ({ albums, clicked }) => {
  const { gettingAlbumData } = useAlbumContext();
  console.log(gettingAlbumData);
  const albumsStyle = useRef();
  const [absValue, setAbsValue] = useState(0);
  /*
  title
  {
      image
      album name
      artist name

      obj.images[1].url
      obj.name
    obj.artists[0]
    }
  
  */
  /*
making btn slider

on click event
ref hook on albums
we change the position absolute to - | +
we want to keep a tracker of clicks

if px is passed the limit then we set left = 0

*/
  return (
    <div className="column">
      <div className="album-container">
        <div className="row">
          <div className="album__header">Featured</div>

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
                if (absValue == 1440 || absValue > 1500) {
                  setAbsValue(0);

                  return (albumsStyle.current.style.left = 0 + "px");
                }
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
        <div className="albums-container">
          <div ref={albumsStyle} className="albums">
            {albums !== "rap"
              ? albums?.map((obj, i) => {
                  const { id } = obj;
                  //           name
                  // images[0].url
                  // id
                  console.log(obj);
                  return (
                    <div className="album" key={i}>
                      <img
                        onClick={() => {
                          gettingAlbumData(
                            id,
                            obj.images[0].url,
                            obj.name,
                            obj.tracks
                          );
                          clicked();
                        }}
                        src={obj.images[0].url}
                        alt={obj.name}
                        className="album__image"
                      />
                      <div
                        onClick={() => {
                          gettingAlbumData(
                            id,
                            obj.images[0].url,
                            obj.name,
                            obj.tracks
                          );
                          clicked();
                        }}
                        className="album__name"
                      >
                        {obj.name}
                      </div>
                      {/* <div className="album__artist">{obj.artists[0].name}</div> */}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <Playlist />
    </div>
  );
};

export default Albums;
