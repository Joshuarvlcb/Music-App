import React, { useState, useContext, useEffect } from "react";

const AlbumContext = React.createContext();

export const AlbumProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [songs, setSongs] = useState({});
  const [player, setPlayerData] = useState([]);
  const [queue, setQueue] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [spotify, setSpotify] = useState(null);
  const [album, setAlbum] = useState({});
  const [toggle, setToggle] = useState(false);
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
      if (arr?.[2] == name) {
        return setHearts(
          hearts.filter((obje, i) => {
            return obje[2] !== name;
          })
        );
      }
    }

    return setHearts([...hearts, ...data]);
  };

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
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  return useContext(AlbumContext);
};
