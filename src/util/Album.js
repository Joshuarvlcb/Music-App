import React, { useState, useContext } from "react";

const AlbumContext = React.createContext();

export const AlbumProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const gettingAlbumData = (...data) => {
    return setData(data);
  };

  return (
    <AlbumContext.Provider value={{ data, gettingAlbumData }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  return useContext(AlbumContext);
};
