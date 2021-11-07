import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import { Route } from "react-router";
import Player from "./components/Player";
import { useAlbumContext } from "./util/Album";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [loader, setLoader] = useState(false);
  const { player, queue, hearts } = useAlbumContext();
  useEffect(() => {
    // setTimeout(() => {
    //   setLoader(false);
    // }, 3000);
    // console.log(code);
    console.log(hearts, "hearts");
  }, [code, hearts]);

  return !loader ? (
    <div className="app">
      <Header />
      <Route exact path="/login" component={Login}></Route>
      {code ? <Home code={code} /> : ""}
      {player.length !== 0 ? <Player /> : ""}
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
}

export default App;
