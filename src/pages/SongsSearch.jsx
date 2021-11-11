import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dots from "../components/Dots";
import Heart from "../components/Heart";
import { BiPlay } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useAlbumContext } from "../util/Album";

const searchedSongs = () => {
  const { searchResults, playerData, heartsData, gettingAlbum } =
    useAlbumContext();
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    if (searchResults instanceof Promise)
      searchResults?.then((d) => setSongs(d));
  }, [songs]);
  const nav = useNavigate();
  return (
    <div>
      <button onClick={() => nav(-1)}>back</button>
      <div className="songs-container">
        {songs?.map((obj, i) => {
          return (
            <div
              className="song"
              key={i}
              onClick={() => {
                playerData({
                  image: obj.album?.images[0].url,
                  artist: obj?.artist,
                  name: obj?.name,
                  duration: (obj?.duration_ms / 1000 / 60).toFixed(2),
                });
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
                    heartsData({
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
    </div>
  );
};
export default searchedSongs;
