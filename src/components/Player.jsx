import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
const Player = ({ token, trackUri }) => {
  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
