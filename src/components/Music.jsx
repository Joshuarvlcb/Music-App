import React, { useEffect } from "react";
import { useAlbumContext } from "../util/Album";
import { BsFillPlayFill } from "react-icons/bs";
const Music = ({ name, num, data, songFile }) => {
  const { queue, current, getCurrentTrack, playerData, settingAudio } =
    useAlbumContext();
  useEffect(() => {
    console.log(queue);
  }, [queue]);
  if (current == name) {
    return (
      <div
        className="music-bar"
        onClick={() => {
          playerData(data);
          getCurrentTrack(name);
        }}
      >
        <div class="now playing" id="music">
          <span class="bar n1">A</span>
          <span class="bar n2">B</span>
          <span class="bar n3">c</span>
          <span class="bar n4">D</span>
          <span class="bar n5">E</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="track-con" onClick={() => settingAudio(songFile)}>
        <div
          className="ply"
          onClick={() => {
            playerData(data);
            getCurrentTrack(name);
          }}
        >
          <BsFillPlayFill />
        </div>
        <div className="track-num">{num}</div>
      </div>
    );
  }
};

export default Music;
