import React from "react";
import { Link } from "react-router-dom";
import { useAlbumContext } from "../util/Album";
const LikedSongs = () => {
  const { songsData, publicData, hearts } = useAlbumContext();
  return (
    <Link
      style={{ cursor: "pointer" }}
      to="/library/songs"
      onClick={() => {
        songsData("liked-songs", hearts);
        publicData({
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png",
          name: "liked songs",
        });
      }}
    >
      <div className="playlist__block"></div>
    </Link>
  );
};

export default LikedSongs;
