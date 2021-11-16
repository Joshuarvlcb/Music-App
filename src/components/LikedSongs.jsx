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
            "https://i.pinimg.com/originals/f9/c0/f1/f9c0f13fad00a245d9c5af3740215b6e.png",
          name: "liked songs",
        });
      }}
    >
      <div className=" heart"></div>
      <div className="playlist-name">liked songs</div>
    </Link>
  );
};

export default LikedSongs;
