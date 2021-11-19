import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "../components/Player";
import Albums from "../components/Albums";
import History from "../components/History";
import { useAlbumContext } from "../util/Album";
import Playlist from "../components/Playlist";

const spotify = new SpotifyWebApi({
  clientId: "39994493cde1422d91170d0f174a5125",
});

function Home() {
  const [clicked, setClicked] = useState(false);
  const { initSpotify, isItDoneLoading } = useAlbumContext();
  const [searchResults, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("reik");
  const [popular, setPopular] = useState([]);
  const [party, setParty] = useState([]);
  const [mood, setMood] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      spotify.setAccessToken(localStorage.getItem("token"));
      initSpotify(spotify);
    }
  }, []);

  useEffect(() => {
    // i have to request a get search the album we pass value when we click in new page
    if (localStorage.getItem("token") == null) return;
    spotify
      .getPlaylistsForCategory("pop", {
        limit: 20,
      })
      .then((d) => {
        console.log(d.body);
        setAlbums(d.body.playlists.items);
      });
    spotify
      .getPlaylistsForCategory("latin", {
        limit: 20,
      })
      .then((d) => {
        setPopular(d.body.playlists.items);
      });
    spotify
      .getPlaylistsForCategory("party", {
        limit: 20,
      })
      .then((d) => {
        setParty(d.body.playlists.items);
      });
    spotify
      .getPlaylistsForCategory("mood", {
        limit: 20,
      })
      .then((d) => {
        setMood(d.body.playlists.items);
        setTimeout(() => {
          isItDoneLoading(false);
        }, 1000);
      });
  }, []);
  useEffect(() => {
    if (mood.length !== 0) {
      setTimeout(() => {
        isItDoneLoading(false);
      }, 500);
    }
  });

  return (
    <div className="home">
      <div className="column">
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <div className="column">
            <Albums title="Featured" width={false} albums={albums} />
            <Playlist />
          </div>
          <History />
        </div>
        <Albums title="Best of Latin" width={true} albums={popular} />
        <Albums title="Best of 2020" width={true} albums={party} />
        <Albums title="Mood" width={true} albums={mood} />
      </div>

      {/* <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <h2 className="home__title">Recently played</h2> */}
    </div>
  );
}

export default Home;
