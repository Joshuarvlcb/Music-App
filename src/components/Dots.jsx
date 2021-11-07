import React, { useState, useRef, useEffect } from "react";
import { useAlbumContext } from "../util/Album";
const Dots = ({ name, data }) => {
  const [toggle, setToggle] = useState(false);
  const { spotify, album, publicData, songsData, songs, hearts, heartsData } =
    useAlbumContext();
  const dotsRef = useRef();
  useEffect(() => {
    const body = (e) => {
      if (
        e.target.className == "dropdown__list" ||
        e.target.className == "dropdown__item" ||
        e.target.className == "dropdown" ||
        e.target.className == "dot" ||
        e.target.className == "dots"
      )
        return;
      setToggle(false);
    };
    window.addEventListener("click", body);
    () => {
      removeEventListener("click", body);
    };
  }, []);

  return (
    <div
      className="dots"
      onClick={(e) => {
        // e.nativeEvent.stopImmediatePropagation(); //  <------
        console.log(e.target);
        //Here is the magic
        /*
            
        */
        // console.log(dotsRef.current);

        setToggle(!toggle);
      }}
    >
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div ref={dotsRef} className={`dropdown ${toggle ? "show" : ""}`}>
        <ul className="dropdown__list">
          <li
            className="dropdown__item"
            onClick={() => {
              if (songs.type === "playlist") {
                console.log("play list");

                spotify
                  .getArtistTopTracks(album.track.artists[0].id, "US")
                  .then((data) => {
                    spotify.getArtist(album.track.artists[0].id).then((d) => {
                      publicData({
                        image: d.body.images[0].url,
                        name: d.body.name,
                      });
                      songsData("artist", data.body.tracks);
                    });
                  });
              } else if (songs.type === "album") {
                console.log("album getting executed");
                console.log(album);
                spotify
                  .getArtistTopTracks(album.artists[0].id, "US")
                  .then((data) => {
                    spotify.getArtist(album.artists[0].id).then((d) => {
                      publicData({
                        image: d.body.images[0].url,
                        name: d.body.name,
                      });
                      songsData("artist", data.body.tracks);
                    });
                  });
              }
            }}
          >
            go to artist
          </li>
          <li
            className="dropdown__item"
            onClick={() => {
              console.log(album);
              if (songs.type === "playlist") {
                console.log(album);

                spotify.getAlbum(album.track.album.id).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                  console.log(data);
                });
              } else if (songs.type === "artist") {
                console.log(album);
                spotify.getAlbum(album.album.id).then((data) => {
                  publicData({
                    image: data.body.images[0].url,
                    name: data.body.name,
                  });
                  songsData("album", data.body.tracks.items);
                  console.log(data);
                });
              }
            }}
          >
            go to album
          </li>
          <li
            className="dropdown__item"
            onClick={() => {
              heartsData(name, data);
            }}
          >
            {`${
              hearts.some((arr) => {
                return arr[2] == name;
              })
                ? "remove"
                : "add"
            } to liked songs`}
          </li>
          <li className="dropdown__item" onClick={() => {}}>
            go toadd to playlist
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dots;
