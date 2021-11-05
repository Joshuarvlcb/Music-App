import React, { useState, useEffect } from "react";
import { useAlbumContext } from "../util/Album";

const Album = ({ spotify, smallestImage }) => {
  const { data } = useAlbumContext();
  const [songs, setSongs] = useState([]);
  const [num, setNum] = useState(0);
  useEffect(() => {
    console.log(data);
    if (data) {
      spotify.getPlaylistTracks(data[0]).then((data) => {
        console.log(data);
        setSongs(data.body.items);
        /*
        body.items

        track
        artist[0].name
        duration_ms
        smallestImage(album.images).url
        name
        
        */
      });
    }
    console.log(num);
  }, [data]);
  return (
    <div className="songs-page">
      <div className="songs-container">
        {songs?.map(({ track }, i) => {
          console.log(track);
          console.log(
            // track.artists["0"].name,
            // track.duration_ms,
            // track.name,
            // track.album.images
            track?.album?.images[2]?.url
          );
          return (
            <div className="song" key={i}>
              <div className="close">
                <img
                  src={track?.album?.images[0]?.url}
                  alt={track?.name}
                  className="song__image"
                />
                <div className="col">
                  <div className="song__name">{track?.name}</div>
                  <div className="song__artist">
                    {track?.artists["0"]?.name}
                  </div>
                </div>
              </div>

              <div className="time">
                {(track?.duration_ms / 1000 / 60).toFixed(2)}
              </div>
              {/* <p>
                {
                  (track.artists[0].name,
                  track.duration_ms,
                  track.name,
                  track.album.images)
                }
              </p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Album;
