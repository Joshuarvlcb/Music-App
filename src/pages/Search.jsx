import React, { useState, useEffect } from "react";
import { useAlbumContext } from "../util/Album";
import { Link } from "react-router-dom";
const dataFormater = (data) => {};

const Search = () => {
  const [search, setSearch] = useState("reik");
  const { spotify, dispatch, songsData } = useAlbumContext();

  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    if (spotify && search !== "") {
      spotify
        .searchTracks(search, {
          limit: 7,
        })
        .then((d) => {
          console.log("track");
          console.log(d);
          setTracks(d.body.tracks.items);
        });
      spotify
        .searchAlbums(search, {
          limit: 7,
        })
        .then((d) => {
          console.log("album");
          setAlbums(d.body.albums.items);

          console.log(d);
        });
      spotify
        .searchPlaylists(search, {
          limit: 7,
        })
        .then((d) => {
          console.log("playlist");

          console.log(d);
          setPlayList(d.body.playlists.items);
        });
      spotify
        .searchArtists(search, {
          limit: 7,
        })
        .then((d) => {
          console.log("artist");

          console.log(d);
          setArtists(d.body.artists.items);
        });
    }
  }, [search]);

  return (
    <div className="search">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="search-results">
        <h1>songs</h1>
        <button
          onClick={() => {
            dispatch({ type: "songs", payload: search });
            songsData("songs", null);
          }}
        >
          <Link to="/search/searchSongs">see more</Link>
        </button>
        <div className="flex">
          {tracks?.map((obj) => {
            return (
              <div>
                <img height="100px" src={obj.album?.images[0]?.url} />
                <div className="name-album">{obj?.name}</div>
              </div>
            );
          })}
        </div>
        <h1>artists</h1>
        <button onClick={() => dispatch({ type: "artists", payload: search })}>
          <Link to="/search/artists">see more</Link>
        </button>

        <div className="flex">
          {" "}
          {artists?.map((obj) => {
            return (
              <div>
                <img height="100px" src={obj.images[0]?.url} />
                <div className="name-album">{obj?.name}</div>
              </div>
            );
          })}
        </div>

        <h1>albums</h1>
        <button onClick={() => dispatch({ type: "albums", payload: search })}>
          <Link to="/search/albums">see more</Link>
        </button>

        <div className="flex">
          {" "}
          {albums?.map((obj) => {
            console.log(obj);
            return (
              <div>
                <img height="100px" src={obj.images[0]?.url} />
                <div className="name-album">{obj?.name}</div>
              </div>
            );
          })}
        </div>

        <h1>playlists</h1>
        <button
          onClick={() => dispatch({ type: "playlists", payload: search })}
        >
          <Link to="/search/playlists">see more</Link>
        </button>

        <div className="flex">
          {playList?.map((obj) => {
            return (
              <div>
                <img height="100px" src={obj.images[0]?.url} />
                <div className="name-album">{obj?.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
