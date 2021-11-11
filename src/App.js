import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Loader from "./components/Loader";
import Songs from "./pages/Songs";
import SearchSongs from "./pages/SongsSearch";
import Playlist from "./pages/Playlist";
import Artists from "./pages/Artists";
import Albums from "./pages/Album";
import { Route, Routes } from "react-router-dom";
import Player from "./components/Player";
import { useAlbumContext } from "./util/Album";

function App() {
  const [loader, setLoader] = useState(false);
  const { player, code, getCode, songs } = useAlbumContext();
  useEffect(() => {
    // setTimeout(() => {
    //   setLoader(false);
    // }, 3000);
    // console.log(code);

    getCode(new URLSearchParams(window.location.search).get("code"));
    console.log(songs);
  }, [songs]);

  return !loader ? (
    <div className="app">
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/library" element={<Library />} />
        <Route exact path="/library/songs" element={<Songs />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/home/songs" element={<Songs />} />
        <Route exact path="/search/playlists" element={<Playlist />} />
        <Route exact path="/search/albums" element={<Albums />} />
        <Route exact path="/search/songs" element={<Songs />} />
        <Route exact path="/search/searchSongs" element={<SearchSongs />} />
        <Route exact path="/search/Artists" element={<Artists />} />
      </Routes>
      {player.length !== 0 ? <Player /> : ""}
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
}

export default App;
