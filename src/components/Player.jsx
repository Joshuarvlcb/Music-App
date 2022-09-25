import React, { useEffect, useRef, useState } from "react";
import { useAlbumContext } from "../util/Album";
import { FaForward, FaBackward, FaPlay, FaPause } from "react-icons/fa";
const Player = () => {
  // if (!token) return null;
  const audioPlayer = useRef();
  const [pause, setPause] = useState(true);
  const { player, audio } = useAlbumContext();
  useEffect(() => {
    console.log("song changed");
    audioPlayer.current.load();
    setPause(true);
  }, [audio]);
  useEffect(() => {
    console.log(pause);
  }, [pause]);
  return (
    <div className="player-component">
      <audio className="music-player" ref={audioPlayer} autoPlay>
        <source type="audio/mp3" src={audio} />
      </audio>
      <div className="info">
        <img height="50px" src={player[0].image} alt="" />
        <div className="colum">
          <div className="player__name">{player[0].name}</div>
          <div className="player__artist">{player[0].artist}</div>
        </div>
        <div className="controls">
          {" "}
          <FaBackward className="control" />
          {pause ? (
            <FaPause
              className="control"
              onClick={() => {
                audioPlayer.current.pause();
                setPause(false);
              }}
            />
          ) : (
            <FaPlay
              className="control"
              onClick={() => {
                audioPlayer.current.play();
                setPause(true);
              }}
            />
          )}
          <FaForward className="control" />
        </div>
      </div>
    </div>
  );
};

export default Player;
