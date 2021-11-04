// import { useEffect } from 'react';

// const API = `http://www.last.fm/api/auth/?api_key=da50ba867d4b993ab4ed997bb9b94a57`;

//  export const  fetchMusic = () => {
//      let mData
//     const fetch = async () => {
//         const response = await fetch(API);
//         const data = await response.json();
//        mData = data
//     };

//     useEffect(() => {
//         fetch()
//     }, [])

//     return mData
// };

import { useEffect, useState } from "react";
const APIT_ENDPOINT =
  "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=justin_bieber&api_key=da50ba867d4b993ab4ed997bb9b94a57&format=json";

//searchQ will be something like &s=btaman
export const useFetch = () => {
  const [data, setData] = useState([]);
  //url is always the api end point plus the search query
  const fetchMovie = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMovie(`${APIT_ENDPOINT}`);
  }, []);
  return { data };
};
