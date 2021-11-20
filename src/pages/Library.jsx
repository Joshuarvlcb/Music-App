import React, { useState } from "react";
import { Link } from "react-router-dom";
import L from "../components/Library";
import { useAlbumContext } from "../util/Album";
import LikedSongs from "../components/LikedSongs";
const Library = () => {
  const {
    playlist,
    songsData,
    publicData,
    createPlaylist,
    gettingNamePLaylist,
  } = useAlbumContext();
  return (
    <div className="library">
      <h1 className="library__header">Library</h1>
      <div className="library-con">
        <div className="create-playlist">
          <Link to="/library/songs">
            <div
              style={{ cursor: "pointer" }}
              className="create"
              onClick={() => {
                // delete
                // edit
                gettingNamePLaylist(`playlist ${playlist.length + 1}`);
                publicData({
                  image:
                    "https://i.pinimg.com/564x/a2/9b/ab/a29babcb44d1902fdcc45aa56c38a644.jpg",
                  name: `playlist ${playlist.length + 1}`,
                  description: "",
                });
                createPlaylist({
                  image:
                    "https://i.pinimg.com/564x/a2/9b/ab/a29babcb44d1902fdcc45aa56c38a644.jpg",
                  name: `playlist ${playlist.length + 1}`,
                  description: "",
                  songs: [],
                });
                songsData("create-playlist", null);

                //create playlist pass in name

                //   gettingNamePLaylist(obj.name || "playlist" + " " + (i + 1));
                //   songsData("custom-playlist", obj.songs);
                //   publicData({
                //     image:
                //       obj.image ||
                //       "https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
                //     name: obj.name || "playlist" + " " + (i + 1),
                //     description: obj.description,
                //   });
              }}
            ></div>
          </Link>
          <div className="playlist-name">create playlist</div>
        </div>

        {playlist.map((obj, i) => {
          return (
            <Link to="songs">
              <L obj={obj} i={i} key={i} />
            </Link>
          );
        })}
        <LikedSongs />
      </div>
      <div className="margin-bottom"></div>
    </div>
  );
};

export default Library;
