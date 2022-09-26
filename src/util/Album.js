import React, { useState, useContext, useReducer } from "react";

const AlbumContext = React.createContext();

export const AlbumProvider = ({ children }) => {
  const [audio, setAudio] = useState("");
  const [data, setData] = useState({});
  const [search, setSearch] = useState("bruno");
  const [songs, setSongs] = useState({});
  const [player, setPlayerData] = useState([]);
  const [queue, setQueue] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [spotify, setSpotify] = useState(null);
  const [album, setAlbum] = useState({});
  const [toggle, setToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const settingAudio = (songURL) => setAudio(songURL);
  const [playlist, setPlaylist] = useState([
    {
      image: "",
      name: "playlist 1",
      description: "hello",
      songs: [
        {
          artist: "Dua Lipa",
          duration: "3.38",
          image:
            "https://i.scdn.co/image/ab67616d0000b27349caa4fc6f962057ba65576a",
          name: "Levitating (feat. DaBaby)",
          artistId: "6M2wZ9GZgrQXHCFfjv46we",
          albumId: "04m06KhJUuwe1Q487puIud",
          preview:
            "https://p.scdn.co/mp3-preview/cc617f669fd1e3ee33a4ac0c66346fefd15286e7?cid=cb2ed77176254eebbdd48f2c8b025d1b",
        },
        {
          artist: "Jason Derulo",
          duration: "2.20",
          image:
            "https://i.scdn.co/image/ab67616d0000b2738544aa5ba43894b7103ec757",
          name: "Acapulco",
          albumId: "76f2Wq7QxiHImxzsYwiXWW",
          artistId: "07YZf4WDAMNwqr4jfgOZ8y",
          preview:
            "https://p.scdn.co/mp3-preview/6291f886d5e33da6f0228a0ca664e0fa194f9558?cid=cb2ed77176254eebbdd48f2c8b025d1b",
        },
      ],
    },
  ]);
  const reducer = (_, action) => {
    switch (action.type) {
      case "albums":
        return spotify.searchAlbums(action.payload).then((d) => {
          console.log("album");
          console.log(d);
          return d.body.albums.items;
        });
      case "playlists":
        return spotify.searchPlaylists(action.payload).then((d) => {
          console.log("playlist");

          return d.body.playlists.items;
        });
      case "artists":
        return spotify.searchArtists(action.payload).then((d) => {
          console.log("artist");
          console.log(d);
          return d.body.artists.items;
        });
      case "songs":
        return spotify.searchTracks(action.payload, {}).then((d) => {
          console.log("track");
          console.log(d);
          return d.body.tracks.items;
        });
      default:
        return state;
    }
  };
  const [loader, setLoader] = useState(true);
  const isItDoneLoading = (done) => {
    setLoader(done);
  };
  const [searchResults, dispatch] = useReducer(reducer, [""]);
  const [current, setCurrent] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const getCurrentTrack = (name) => {
    if (name == current) {
      setCurrent("");
      return;
    }
    return setCurrent(name);
  };

  const gettingAccessToken = (t) => {
    console.log(t);
    if (t) {
      setToken(t);
    }
  };
  const getCode = (c) => {
    setCode(c);
  };
  const [namePlaylist, setNamePlaylist] = useState("");
  const removePlaylist = (name, songName) => {
    setPlaylist(
      playlist.map((play) => {
        if (name === play.name) {
          if (namePlaylist == name) {
            setSongs({
              type: "custom-playlist",
              data: play.songs.filter(({ name }) => {
                return name !== songName;
              }),
            });
          }
          return {
            ...play,
            songs: play.songs.filter(({ name }) => {
              return name !== songName;
            }),
          };
        }
        return play;
      })
    );
  };
  const addingSongToPlaylist = (name, song, opt) => {
    setPlaylist(
      playlist.map((play) => {
        if (name == play.name) {
          if (play.songs) {
            return { ...play, songs: [...play.songs, song] };
          } else {
            return { ...play, songs: [song] };
          }
        }
        return play;
      })
    );
  };
  const gettingNamePLaylist = (name) => {
    setNamePlaylist(name);
  };
  const updatingPlaylist = (playlist, data) => {
    //check to see if playlist name is not the same as the otherones
    let obj = data;
    let index = playlist.findIndex(({ name }) => {
      console.log(name);
      return name == namePlaylist;
    });
    console.log(index);

    let newObj = {};
    if (obj?.name !== playlist[index]?.name && obj?.name !== "") {
      newObj.name = obj?.name;
    } else {
      newObj.name = playlist[index]?.name;
    }
    if (
      obj?.description !== playlist[index]?.description &&
      obj?.description !== ""
    ) {
      newObj.description = obj?.description;
    } else {
      newObj.description = playlist[index]?.description;
    }
    if (obj?.image !== playlist[index]?.image && obj?.image !== "") {
      newObj.image = obj?.image;
    } else {
      newObj.image = playlist[index]?.image;
    }

    newObj.songs = playlist[index]?.songs;
    console.log(newObj);

    setPlaylist(
      playlist.map((obj) => {
        if (obj.name == namePlaylist) return newObj;

        return obj;
      })
    );
  };
  const edit = () => {
    setEditToggle(!editToggle);
  };
  const initSpotify = (token) => {
    setSpotify(token);
  };
  // const gettingAlbumData = (type,...data) => {
  //   return setData({type,data});
  // };

  // const gettingAlbum = (data) => {
  //   setAlbum({type,data});
  // };
  const songsData = (type, data) => {
    setSongs({ type, data });
  };
  const publicData = (data) => {
    setData({ ...data });
  };
  const gettingAlbum = (obj) => {
    setAlbum(obj);
  };
  /*
    not adding copies for queue
    loop over q array and check to see that
    data is no where to be found

  */
  const playerData = (...data) => {
    let key = true;
    for (let arr of queue) {
      if (arr[0].name == data[0].name) {
        key = false;
      }
    }
    if (key) {
      setQueue([...queue, data]);
    }

    return setPlayerData(data);
  };
  const toggleHeart = () => {
    setToggle(!toggle);
  };
  const heartsData = (name, ...data) => {
    for (let arr of hearts) {
      if (arr.name == name) {
        if (songs?.type == "liked-songs") {
          setHearts(
            hearts.filter((arr, i) => {
              return arr.name !== name;
            })
          );
          setSongs({
            type: "liked-songs",
            data: hearts.filter((arr, i) => {
              return arr.name !== name;
            }),
          });
        }
        return setHearts(
          hearts.filter((arr, i) => {
            return arr.name !== name;
          })
        );
      }
    }

    return setHearts([...hearts, ...data]);
  };
  const deletePlaylist = () => {
    setPlaylist(
      playlist.filter((obj) => {
        if (obj.name !== namePlaylist) return obj;
      })
    );
    songsData(null);

    //get name of playlist
    //filter out the playlist
  };
  //add songs to playlist in bars
  //routes
  const createPlaylist = (data) => {
    setPlaylist([...playlist, data]);
    console.log(playlist);
  };
  //styles
  //play 30s of a song

  return (
    <AlbumContext.Provider
      value={{
        data,
        player,
        playerData,
        queue,
        hearts,
        heartsData,
        spotify,
        initSpotify,
        songsData,
        songs,
        gettingAlbum,
        album,
        publicData,
        toggleHeart,
        toggle,
        edit,
        editToggle,
        playlist,
        updatingPlaylist,
        gettingNamePLaylist,
        deletePlaylist,
        addingSongToPlaylist,
        namePlaylist,
        removePlaylist,
        getCode,
        code,
        gettingAccessToken,
        token,
        searchResults,
        dispatch,
        createPlaylist,
        getCurrentTrack,
        current,
        isItDoneLoading,
        loader,
        search,
        setSearch,
        audio,
        settingAudio,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  return useContext(AlbumContext);
};
