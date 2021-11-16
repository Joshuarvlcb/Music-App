import React, { useState, useRef, useEffect } from "react";
import { useAlbumContext } from "../util/Album";
import { useNavigate } from "react-router-dom";
const Dots = ({ name, data }) => {
  const [toggle, setToggle] = useState(false);
  const {
    spotify,
    album,
    publicData,
    songsData,
    songs,
    hearts,
    heartsData,
    playlist,
    addingSongToPlaylist,
    namePlaylist,
    removePlaylist,
    isItDoneLoading,
  } = useAlbumContext();
  const dotsRef = useRef();
  // useEffect(() => {
  //   if (namePlaylist) {
  //     songsData(
  //       "custom-playlist",
  //       playlist.find(({ name }) => name === curr.name).songs
  //     );
  //   }
  // }, [playlist]);
  const nav = useNavigate();
  useEffect(() => {
    const body = (e) => {
      if (
        e.target.className == "dropdown__list" ||
        e.target.className == "dropdown__item" ||
        e.target.className == "dropdown" ||
        e.target.className == "dot" ||
        e.target.className == "dots"
      )
        return;
      setToggle(false);
    };
    window.addEventListener("click", body);
    () => {
      removeEventListener("click", body);
    };
  }, []);

  return (
    <div
      className="dots"
      onClick={(e) => {
        // e.nativeEvent.stopImmediatePropagation(); //  <------
        console.log(e.target);
        //Here is the magic
        /*
            
        */
        // console.log(dotsRef.current);

        setToggle(!toggle);
      }}
    >
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div ref={dotsRef} className={`dropdown ${toggle ? "show" : ""}`}>
        <ul className="dropdown__list">
          <li
            className="dropdown__item"
            onClick={() => {
              isItDoneLoading(true);

              if (songs.type === "playlist") {
                spotify
                  .getArtistTopTracks(album.track.artists[0].id, "US")
                  .then((data) => {
                    console.log(data);
                    spotify.getArtist(album.track.artists[0].id).then((d) => {
                      publicData({
                        image: d.body.images[0].url,
                        name: d.body.name,
                      });
                      songsData("artist", data.body.tracks);
                    });
                  });
              } else if (songs.type === "album") {
                console.log("album getting executed");
                console.log(album);
                spotify
                  .getArtistTopTracks(album.artists[0].id, "US")
                  .then((data) => {
                    spotify.getArtist(album.artists[0].id).then((d) => {
                      publicData({
                        image: d.body.images[0].url,
                        name: d.body.name,
                      });
                      songsData("artist", data.body.tracks);
                    });
                  });
              } else if (songs.type === "custom-playlist") {
                console.log(album);
                spotify
                  .getArtistTopTracks(album.artistId, "US")
                  .then((data) => {
                    spotify.getArtist(album.artistId).then((d) => {
                      publicData({
                        image: d.body.images[0].url,
                        name: d.body.name,
                      });
                      songsData("artist", data.body.tracks);
                    });
                  });
              } else if (songs.type === "liked-songs") {
                console.log(album);
                // console.log(album);
                spotify
                  .getArtistTopTracks(album.artistId, "US")
                  .then((data) => {
                    spotify.getArtist(album.artistId).then((d) => {
                      publicData({
                        image: d.body.images[0].url,
                        name: d.body.name,
                      });
                      songsData("artist", data.body.tracks);
                    });
                  });
              }
            }}
          >
            go to artist
          </li>
          <li
            className="dropdown__item"
            onClick={() => {
              isItDoneLoading(true);

              if (songs.type === "playlist") {
                console.log(album);

                spotify.getAlbum(album.track.album.id).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                  console.log(data);
                });
              } else if (songs.type === "artist") {
                console.log(album);
                spotify.getAlbum(album.album.id).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                  console.log(data);
                });
              } else if (songs.type === "custom-playlist") {
                spotify.getAlbum(album.albumId).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                });
              } else if (songs.type === "liked-songs") {
                spotify.getAlbum(album.albumId).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                  console.log(data);
                });
              } else if (songs.type == "songs") {
                spotify.getAlbum(album.album.id).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                  console.log(data);
                });
                console.log(window.location.search);
                nav("/search/songs");
              }
            }}
          >
            go to album
          </li>
          <li
            className="dropdown__item"
            onClick={() => {
              heartsData(name, data);
            }}
          >
            {`${
              hearts.some((arr) => {
                return arr[2] == name;
              })
                ? "remove"
                : "add"
            } to liked songs`}
          </li>
          {namePlaylist ? (
            <li
              onClick={() => {
                removePlaylist(namePlaylist, album.name);
              }}
            >
              remove from playlist
            </li>
          ) : (
            ""
          )}
          <li className="dropdown__item playlists-dropdown">
            <ul className="playlists-ul">
              {playlist.map((curr, i) => {
                //pass playlist name append track with albumId and artist Id
                return (
                  <li
                    onClick={() => {
                      // gettingNamePLaylist(curr.name);
                      if (songs.type === "album") {
                        console.log(album);
                        spotify.getTrack(album.id).then((d) => {
                          addingSongToPlaylist(curr.name, {
                            name: d.body.name,
                            artist: d.body.artists[0].name,
                            artistId: d.body.artists[0].id,
                            image: d.body.album.images[0].url,
                            albumId: d.body.album.id,
                            duration: (d.body.duration_ms / 1000 / 60).toFixed(
                              2
                            ),
                          });
                        });
                      }
                      if (
                        songs.type === "artist" ||
                        songs.type === "searchedSongs"
                      ) {
                        console.log(album);
                        addingSongToPlaylist(curr.name, {
                          name: album.name,
                          artist: album.artists[0].name,
                          artistId: album.artists[0].id,
                          image: album.album.images[0].url,
                          albumId: album.album.id,
                          duration: (album.duration_ms / 1000 / 60).toFixed(2),
                        });
                        // addingSongToPlaylist(curr.name)
                      }

                      if (songs.type === "custom-playlist") {
                        //name
                        //image
                        //duration
                        //artist
                        //artistId
                        //albumId
                        addingSongToPlaylist(curr.name, album);
                        //redirect to playlists
                      }
                      if (songs.type === "playlist") {
                        console.log(album);
                        addingSongToPlaylist(curr.name, {
                          name: album.track.name,
                          artist: album.track.artists[0].name,
                          artistId: album.track.artists[0].id,
                          image: album.track.album.images[0].url,
                          albumId: album.track.album.id,
                          duration: (
                            album.track.duration_ms /
                            1000 /
                            60
                          ).toFixed(2),
                        });
                      }
                      //'track:Alright artist:Kendrick Lamar'

                      //get song data
                      //addingSongToPlaylist
                    }}
                  >
                    {curr.name}
                  </li>
                );
              })}
            </ul>
            add to playlists
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dots;
