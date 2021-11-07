import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useAlbumContext } from "../util/Album";
const Player = ({ token, trackUri }) => {
  // if (!token) return null;

  const { player } = useAlbumContext();
  return (
    // <SpotifyPlayer
    //   token={token}
    //   showSaveIcon
    //   uris={trackUri ? [trackUri] : []}
    // />
    <div className="player-component">
      <img height="50px" src={player[0].image} alt="" />
      <div className="player__name">{player[0].name}</div>
      <div className="player__artist">{player[0].artist}</div>
    </div>
  );
};

export default Player;
