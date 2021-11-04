import React, { useState, useEffect } from "react";
import { useMusicContext } from "../util/Context";
import useAuth from "../useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "../components/Player";
import Albums from "../components/Albums";

const spotify = new SpotifyWebApi({
  clientId: "cb2ed77176254eebbdd48f2c8b025d1b",
});

function Home({ code }) {
  // const { data, togglePlayer } = useMusicContext();
  // console.log(data);
  // console.log(data);

  const token = useAuth(code);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState("reggaeton");

  console.log(searchResults);
  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return setSearchResults([]);
    spotify.searchAlbums(albums).then((data) => {
      setAlbums(data.body.albums.items);
    });
  }, [token]);
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return setSearchResults([]);

    const smallestImage = (arr) => {
      return arr.reduce((smallest, current) => {
        if (smallest.height > current.height) return current;
        return smallest;
      }, arr[0]);
    };
    let cancel = false;
    spotify.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            url: track.uri,
            albumUrl: smallestImage(track.album.images).url,
          };
        })
      );
    });
    return () => {
      cancel = true;
    };
  }, [search, token]);
  return (
    <div className="home">
      <Albums albums={albums} />
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <h2 className="home__title">Recently played</h2>
    </div>
  );
}

export default Home;
