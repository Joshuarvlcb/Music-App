import React, { useEffect } from "react";
import { useAlbumContext } from "../util/Album";
import ReactAudioPlayer from "react-audio-player";
import { FaForward, FaBackward, FaPlay } from "react-icons/fa";
const Player = () => {
  // if (!token) return null;

  const { player, audio } = useAlbumContext();
  useEffect(() => {
    console.log("song changed");
  }, [audio]);
  return (
    <div className="player-component">
      <ReactAudioPlayer src={audio} autoPlay />
      <div className="info">
        <img height="50px" src={player[0].image} alt="" />
        <div className="colum">
          <div className="player__name">{player[0].name}</div>
          <div className="player__artist">{player[0].artist}</div>
        </div>
      </div>
    </div>
  );
};

export default Player;
