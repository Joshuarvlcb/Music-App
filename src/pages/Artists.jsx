import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlbumContext } from "../util/Album";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Artists = () => {
  const { searchResults, songsData, publicData, spotify, isItDoneLoading } =
    useAlbumContext();
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    if (searchResults instanceof Promise)
      searchResults?.then((d) => setArtists(d));
  }, [artists]);
  const nav = useNavigate();
  return (
    <div className="page">
      <h2 className="title">artists</h2>
      <IoArrowBackCircleSharp
        className="back"
        onClick={() => {
          nav(-1);
          songsData("songs", null);
        }}
      />
      <div className="page-wrapper">
        {artists?.map((obj, i, arr) => {
          i == arr.length / 2
            ? setTimeout(() => isItDoneLoading(false), 500)
            : "";
          console.log(obj);
          return (
            <Link to="/search/songs">
              <div
                className="album"
                key={i}
                onClick={() => {
                  spotify.getArtistTopTracks(obj.id, "us").then((data) => {
                    console.log(data);
                    publicData({ image: obj?.images[0].url, name: obj?.name });
                    songsData("artist", data.body.tracks);
                  });
                  isItDoneLoading(true);
                }}
              >
                <img
                  src={obj?.images[0]?.url}
                  alt={obj.name}
                  className="album__image"
                />
                <div className="player-image"></div>
                <div className="album__name">{obj.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="margin-bottom"></div>
    </div>
  );
};
export default Artists;
