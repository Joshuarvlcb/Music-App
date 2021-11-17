import React, { useEffect, useState } from "react";
import Dots from "../components/Dots";
import Heart from "../components/Heart";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useAlbumContext } from "../util/Album";

const searchedSongs = () => {
  const {
    searchResults,
    playerData,
    heartsData,
    gettingAlbum,
    isItDoneLoading,
    settingAudio,
    songsData,
  } = useAlbumContext();
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    if (searchResults instanceof Promise)
      searchResults?.then((d) => setSongs(d));
  }, [songs]);
  const nav = useNavigate();
  return (
    <div>
      <IoArrowBackCircleSharp
        className="back"
        onClick={() => {
          nav(-1);
        }}
      />{" "}
      <div className="searchedSongs-container ">
        <h2 className="songs-title">All songs</h2>
        {songs?.map((obj, i, arr) => {
          i == Math.floor(arr.length / 2)
            ? setTimeout(() => isItDoneLoading(false), 500)
            : "";
          return (
            <div
              className="song"
              key={i}
              onClick={() => {
                songsData("searchedSongs", null);
                playerData({
                  image: obj.album?.images[0].url,
                  artist: obj?.artist,
                  name: obj?.name,
                  duration: (obj?.duration_ms / 1000 / 60).toFixed(2),
                  preview: obj?.preview_url,
                });
                settingAudio(obj?.preview_url);
              }}
            >
              <div className="close">
                <img
                  height="50px"
                  src={obj?.album?.images[0]?.url}
                  alt={obj?.name}
                  className="song__image"
                />
                <div className="col">
                  <div id={i} className="song__name">
                    {obj?.name}
                  </div>
                  <div className="song__artist">{obj?.artists[0].name}</div>
                </div>
              </div>
              <div className="close">
                <div
                  className="h"
                  onClick={() => {
                    heartsData(obj?.name, {
                      image: obj.album?.images[0].url,
                      artist: obj?.artist,
                      name: obj?.name,
                      duration: (obj?.duration_ms / 1000 / 60).toFixed(2),
                    });
                  }}
                >
                  <Heart key={i} name={obj?.name} track={obj} />
                </div>

                <div className="time">
                  {(obj?.duration_ms / 1000 / 60).toFixed(2)}
                </div>
                <div
                  className="dots-con"
                  onClick={() => {
                    gettingAlbum(obj);
                    console.log(obj);
                  }}
                >
                  <Dots
                    key={i}
                    name={obj?.name}
                    data={[obj?.name, obj?.name, obj.name]}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="margin-bottom"></div>
    </div>
  );
};
export default searchedSongs;
