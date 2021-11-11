import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlbumContext } from "../util/Album";
const Album = () => {
  const { searchResults, songsData, publicData, spotify } = useAlbumContext();
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    if (searchResults instanceof Promise)
      searchResults?.then((d) => setAlbums(d));
  }, [albums]);
  const nav = useNavigate();
  return (
    <div>
      <button onClick={() => nav(-1)}>back</button>
      {albums?.map((obj) => {
        //include in
        return (
          <Link
            to="/search/songs"
            onClick={() => {
              spotify.getAlbumTracks(obj.id).then((data) => {
                console.log(data);
                //set songs
                //set public data
                publicData({ image: obj?.images[0].url, name: obj?.name });
                songsData("album", data.body.items);
              });
            }}
          >
            <div>
              <img height="100px" src={obj?.images[0].url} alt={obj?.name} />
              <div className="album-name">{obj?.name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Album;
