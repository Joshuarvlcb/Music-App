import React, { useState, useContext } from "react";

import { useFetch } from "./Fetch";

const MusicContext = React.createContext();

export const MusicProvider = ({ children }) => {
  const { data } = useFetch();
  return (
    <MusicContext.Provider value={{ data }}>{children}</MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  return useContext(MusicContext);
};
