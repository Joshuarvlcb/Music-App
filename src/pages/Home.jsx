import React, { useState, useEffect } from "react";
import useAuth from "../useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "../components/Player";
import Albums from "../components/Albums";
import History from "../components/History";
import { useAlbumContext } from "../util/Album";
import Playlist from "../components/Playlist";

const spotify = new SpotifyWebApi({
  clientId: "cb2ed77176254eebbdd48f2c8b025d1b",
});

function Home() {
  // const { data, togglePlayer } = useMusicContext();
  // console.log(data);
  // console.log(data);
  useAuth();

  const [clicked, setClicked] = useState(false);
  const { initSpotify, token } = useAlbumContext();
  const [searchResults, setSearchResults] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("reik");
  const [popular, setPopular] = useState([]);
  const [party, setParty] = useState([]);

  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);
      initSpotify(spotify);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return setSearchResults([]);
    // i have to request a get search the album we pass value when we click in new page

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
    /*
      playlists.items

      name
      images[0].url
      id
    */

    const gettingId = async () => {
      const id = await spotify
        .getAlbum("7toBpmlShDRTX8lS0xaJrW")
        .then((data) => {
          return data.body.tracks.items.map((t) => {
            return t.id;
          });
        });
      const tracks = await spotify.getTracks(id);
      console.log(tracks);
      // return axios.get(
      //   "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V",
      //   {
      //     header: {
      //       Authorization: token,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    };

    gettingId();

    // .then((data) => {
    //   console.log(data);
    // });

    // spotify.searchAlbums(albums).then((data) => {
    //   setAlbums(data.body.albums.items);
    // });
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
      console.log(res);
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
  const clickedOnAlbum = () => {
    setClicked(!clicked);
  };
  return (
    <div className="home">
      <div className="flex">
        <div className="colum">
          <Albums title="Featured" width={false} albums={albums} />
          <Playlist />
          <Albums title="Best of Latin" width={true} albums={popular} />
          <Albums title="Best of 2020" width={true} albums={party} />
          <Albums title="Best of 2020" width={true} albums={party} />
          <Albums title="Best of 2020" width={true} albums={party} />
          <Albums title="Best of 2020" width={true} albums={party} />
        </div>
        <History />
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
