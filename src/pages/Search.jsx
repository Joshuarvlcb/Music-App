import React, { useState, useEffect } from "react";
import { useAlbumContext } from "../util/Album";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const {
    spotify,
    dispatch,
    songsData,
    publicData,
    isItDoneLoading,
    search,
    setSearch,
    settingAudio,
    playerData,
  } = useAlbumContext();
  const nav = useNavigate();

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
  useEffect(() => {
    setTimeout(() => {
      isItDoneLoading(false);
    }, 500);
  });
  return (
    <div className="search">
      <div className="margin-top"></div>
      <div class="search-con">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          class="search-input"
          placeholder="Search Songs,Albums,Artists"
        />
        <BiSearch className="search-icon" />
      </div>

      <div className="margin-top"></div>
      <div className="search-results">
        <div className="flex-search">
          {" "}
          <h2 className="search-title">songs</h2>
          <Link
            className="see-more"
            to="/search/searchSongs"
            onClick={() => {
              dispatch({ type: "songs", payload: search });
              isItDoneLoading(true);
            }}
          >
            see more
          </Link>
        </div>
        <div className="flex">
          {tracks?.map((obj, i, arr) => {
            //get player
            return (
              <div
                className="album"
                key={i}
                onClick={() => {
                  playerData({
                    image: obj?.album?.images[0]?.url,
                    artist: obj?.artists["0"]?.name,
                    name: obj?.name,
                    duration: (obj?.duration_ms / 1000 / 60).toFixed(2),
                    preview:obj.preview_url
                  });
                  settingAudio(obj.preview_url);
                }}
              >
                <img
                  src={obj.album?.images[0]?.url}
                  alt={obj.name}
                  className="album__image"
                />
                <div className="player-image"></div>
                <div className="album__name">{obj.name}</div>
              </div>
            );
          })}
        </div>
        <div className="flex-search">
          {" "}
          <h2 className="search-title">artists</h2>
          <Link
            className="see-more"
            to="/search/artists"
            onClick={() => {
              dispatch({ type: "artists", payload: search });
              isItDoneLoading(true);
            }}
          >
            see more
          </Link>
        </div>

        <div className="flex">
          {artists?.map((obj, i, arr) => {
            i == arr.length / 2
              ? setTimeout(() => isItDoneLoading(false), 1500)
              : "";
            return (
              <div
                className="album"
                key={i}
                onClick={() => isItDoneLoading(true)}
              >
                <img
                  onClick={() => {
                    spotify.getArtistTopTracks(obj.id, "us").then((data) => {
                      console.log(data);
                      //set songs
                      //set public data
                      publicData({
                        image: obj?.images[0]?.url,
                        name: obj?.name,
                      });
                      songsData("artist", data.body.tracks);
                    });

                    nav("/search/songs");
                  }}
                  src={obj.images[0]?.url}
                  alt={obj.name}
                  className="album__image"
                />
                <div className="player-image"></div>
                <div
                  onClick={() => {
                    spotify.getArtistTopTracks(obj.id, "us").then((data) => {
                      console.log(data);
                      //set songs
                      //set public data
                      publicData({
                        image: obj?.images[0]?.url,
                        name: obj?.name,
                      });
                      songsData("artist", data.body.tracks);
                    });

                    nav("/search/songs");
                  }}
                  className="album__name"
                >
                  {obj.name}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex-search">
          {" "}
          <h2 className="search-title">albums</h2>
          <Link
            className="see-more"
            to="/search/albums"
            onClick={() => {
              dispatch({ type: "albums", payload: search });
              isItDoneLoading(true);
            }}
          >
            see more
          </Link>
        </div>

        <div className="flex">
          {albums?.map((obj, i) => {
            return (
              <div
                className="album"
                key={i}
                onClick={() => {
                  isItDoneLoading(true);
                }}
              >
                <img
                  onClick={() => {
                    spotify.getAlbumTracks(obj.id).then((data) => {
                      publicData({
                        image: obj?.images[0]?.url,
                        name: obj?.name,
                      });
                      songsData("album", data.body.items);
                    });

                    nav("/search/songs");
                  }}
                  src={obj.images[0]?.url}
                  alt={obj.name}
                  className="album__image"
                />
                <div className="player-image"></div>
                <div
                  onClick={() => {
                    spotify.getAlbumTracks(obj.id).then((data) => {
                      console.log(data);
                      //set songs
                      //set public data
                      publicData({
                        image: obj?.images[0]?.url,
                        name: obj?.name,
                      });
                      songsData("album", data.body.items);
                    });

                    nav("/search/songs");
                  }}
                  className="album__name"
                >
                  {obj.name}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-search">
          {" "}
          <h2 className="search-title">playlists</h2>
          <Link
            className="see-more"
            to="/search/playlists"
            onClick={() => {
              dispatch({ type: "playlists", payload: search });
              isItDoneLoading(true);
            }}
          >
            see more
          </Link>
        </div>

        <div className="flex-albums">
          {playList?.map((obj, i) => {
            console.log(obj);
            return (
              <div
                className="album"
                key={i}
                onClick={() => isItDoneLoading(true)}
              >
                <img
                  onClick={() => {
                    spotify.getPlaylistTracks(obj.id).then((data) => {
                      console.log(data);
                      //set songs
                      //set public data
                      publicData({
                        image: obj?.images[0].url,
                        name: obj?.name,
                      });
                      songsData("playlist", data.body.items);
                    });
                    nav("/search/songs");
                  }}
                  src={obj.images[0].url}
                  alt={obj.name}
                  className="album__image"
                />
                <div className="player-image"></div>
                <div
                  onClick={() => {
                    spotify.getPlaylistTracks(obj.id).then((data) => {
                      console.log(data);
                      //set songs
                      //set public data
                      publicData({
                        image: obj?.images[0].url,
                        name: obj?.name,
                      });
                      songsData("playlist", data.body.items);
                    });
                    nav("/search/songs");
                  }}
                  className="album__name"
                >
                  {obj.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="margin-bottom"></div>
    </div>
  );
};

export default Search;
