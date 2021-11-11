import React from "react";
import { Link } from "react-router-dom";
import { loadSpotifyPlayer } from "react-spotify-web-playback/lib/utils";
import { useAlbumContext } from "../util/Album";
import Heart from "../components/Heart";
import { BiPlay } from "react-icons/bi";
import Dots from "../components/Dots";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Edit from "../components/Edit";
import { useNavigate } from "react-router-dom";

const Album = () => {
  const nav = useNavigate();
  const {
    data,
    playerData,
    heartsData,
    gettingAlbum,
    songs,
    edit,
    editToggle,
    deletePlaylist,
    spotify,
    songsData,
  } = useAlbumContext();

  if (songs.type == "playlist") {
    return (
      <div className="songs-page">
        <div className="banner">
          <img className="banner__img" src={data.image} alt={data.name} />
        </div>
        <div className="name">{data.name}</div>

        <button
          onClick={() => {
            nav(-1);
            songsData("songs", null);
          }}
          className="back-btn"
        >
          back
        </button>

        <div className="songs-container">
          {songs.data?.map((obj, i) => {
            return (
              <div
                className="song"
                key={i}
                onClick={() => {
                  playerData({
                    image: obj?.track?.album?.images[0]?.url,
                    artist: obj?.track?.artists["0"]?.name,
                    name: obj?.track?.name,
                    duration: (obj?.track?.duration_ms / 1000 / 60).toFixed(2),
                  });
                }}
              >
                <div className="close">
                  <img
                    src={obj?.track?.album?.images[0]?.url}
                    alt={obj?.track?.name}
                    className="song__image"
                  />
                  <div className="col">
                    <div id={i} className="song__name">
                      {obj?.track?.name}
                    </div>
                    <div className="song__artist">
                      {obj?.track?.artists["0"]?.name}
                    </div>
                  </div>
                </div>
                <div className="close">
                  <div
                    className="h"
                    onClick={() => {
                      heartsData(obj?.track?.name, {
                        image: obj?.track?.album?.images[0]?.url,
                        artist: obj?.track?.artists["0"]?.name,
                        name: obj?.track?.name,
                        duration: (obj?.track?.duration_ms / 1000 / 60).toFixed(
                          2
                        ),
                        albumId: obj?.track?.album?.id,
                        artistId: obj?.track?.artists[0]?.id,
                      });
                    }}
                  >
                    <Heart key={i} name={obj?.track?.name} track={obj.track} />
                  </div>

                  <div className="time">
                    {(obj?.track?.duration_ms / 1000 / 60).toFixed(2)}
                  </div>
                  <div
                    className="dots-con"
                    onClick={() => {
                      gettingAlbum(obj);
                    }}
                  >
                    <Dots
                      key={i}
                      name={obj?.track?.name}
                      data={[
                        obj?.track?.name,
                        obj?.track?.name,
                        obj?.track?.name,
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (songs.type == "album" || songs.type == "artist") {
    return (
      <div className="songs-page">
        <div className="banner">
          <img className="banner__img" src={data.image} alt={data.name} />
        </div>
        <div className="name">{data.name}</div>

        <button
          onClick={() => {
            nav(-1);
            songsData("songs", null);
          }}
          className="back-btn"
        >
          back
        </button>
        <div className="songs-container">
          {songs.data?.map((obj, i) => {
            return (
              <div
                className="song"
                key={i}
                onClick={() => {
                  playerData({
                    image: data.image,
                    artist: obj?.artists["0"]?.name,
                    name: obj?.name,
                    duration: (obj?.duration_ms / 1000 / 60).toFixed(2),
                  });
                }}
              >
                <div className="close">
                  <BiPlay className="play" />
                  <div className="col">
                    <div id={i} className="song__name">
                      {obj?.name}
                    </div>
                    <div className="song__artist">
                      {obj?.artists["0"]?.name}
                    </div>
                  </div>
                </div>
                <div className="close">
                  <div
                    className="h"
                    onClick={() => {
                      spotify.getTrack(obj.id).then((data) => {
                        const { body } = data;
                        console.log(data);
                        heartsData(body?.name, {
                          image: body?.album?.images[0]?.url,
                          artist: body?.artists["0"]?.name,
                          name: body?.name,
                          duration: (body?.duration_ms / 1000 / 60).toFixed(2),
                          albumId: body?.album?.id,
                          artistId: body?.artists[0]?.id,
                        });
                      });
                    }}
                  >
                    <Heart key={i} name={obj?.name} track={obj} />
                  </div>

                  <div className="time">
                    {(obj?.duration_ms / 1000 / 60).toFixed(2)}
                  </div>
                  <div
                    className="dots-con"
                    onClick={() => {
                      gettingAlbum(obj);
                    }}
                  >
                    <Dots
                      key={i}
                      name={obj?.name}
                      data={[
                        obj?.track?.name,
                        obj?.track?.name,
                        obj?.track?.name,
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (songs.type == "custom-playlist") {
    /*
    artist: "Dua Lipa",
          duration: "3.38",
          image:
            "https://i.scdn.co/image/ab67616d0000b27349caa4fc6f962057ba65576a",
          name:
    */
    return (
      <div className="songs-page">
        {editToggle ? <Edit /> : ""}
        <div className="banner">
          <img className="banner__img" src={data.image} alt={data.name} />
        </div>
        <div className="name">{data.name}</div>
        <div className="description">{data.description}</div>
        <div
          className="edit"
          onClick={() => {
            edit();
            console.log(editToggle);
          }}
        >
          <FaPencilAlt />
        </div>
        <div className="trash" onClick={deletePlaylist}>
          <FaTrashAlt />
        </div>
        <button
          onClick={() => {
            nav(-1);
            songsData("songs", null);
          }}
          className="back-btn"
        >
          back
        </button>
        <div className="songs-container">
          {songs.data?.map((obj, i) => {
            console.log(obj);
            return (
              <div
                className="song"
                key={i}
                onClick={() => {
                  playerData({
                    image: obj?.image || data.image,
                    artist: obj?.artist,
                    name: obj?.name,
                    duration: obj?.duration,
                  });
                }}
              >
                <div className="close">
                  <BiPlay className="play" />
                  <div className="col">
                    <div id={i} className="song__name">
                      {obj?.name}
                    </div>
                    <div className="song__artist">{obj?.artist}</div>
                  </div>
                </div>
                <div className="close">
                  <div
                    className="h"
                    onClick={() => {
                      heartsData(obj?.name, {
                        image: obj?.image || data.image,
                        artist: obj?.artist,
                        name: obj?.name,
                        duration: obj?.duration,
                        artistId: obj?.artistId,
                        albumId: obj?.albumId,
                      });
                    }}
                  >
                    <Heart key={i} name={obj?.name} track={obj} />
                  </div>

                  <div className="time">{obj?.duration}</div>
                  <div
                    className="dots-con"
                    onClick={() => {
                      gettingAlbum(obj);
                      console.log(obj);
                    }}
                  >
                    <Dots
                      key={i}
                      name={obj?.name}
                      data={[obj?.name, obj?.name, obj.name]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (songs.type == "create-playlist") {
    /*
    artist: "Dua Lipa",
          duration: "3.38",
          image:
            "https://i.scdn.co/image/ab67616d0000b27349caa4fc6f962057ba65576a",
          name:
    */
    return (
      <div className="songs-page">
        {editToggle ? <Edit /> : ""}
        <div className="banner">
          <img className="banner__img" src={data.image} alt={data.name} />
        </div>
        <div className="name">{data.name}</div>
        <div className="description">{data.description}</div>
        <div
          className="edit"
          onClick={() => {
            edit();
          }}
        >
          <FaPencilAlt />
        </div>

        <button
          onClick={() => {
            nav(-1);
            songsData("songs", null);
          }}
          className="back-btn"
        >
          back
        </button>
      </div>
    );
  } else if (songs.type == "liked-songs") {
    return (
      <div className="songs-page">
        <div className="banner">
          <img className="banner__img" src={data.image} alt={data.name} />
        </div>
        <div className="name">{data.name}</div>

        <button
          onClick={() => {
            nav(-1);
            songsData("songs", null);
          }}
          className="back-btn"
        >
          back
        </button>
        <div className="songs-container">
          {songs.data?.map((obj, i) => {
            return (
              <div
                className="song"
                key={i}
                onClick={() => {
                  playerData({
                    image: obj?.image || data.image,
                    artist: obj?.artist,
                    name: obj?.name,
                    duration: obj?.duration,
                  });
                }}
              >
                <div className="close">
                  <BiPlay className="play" />
                  <div className="col">
                    <div id={i} className="song__name">
                      {obj?.name}
                    </div>
                    <div className="song__artist">{obj?.artist}</div>
                  </div>
                </div>
                <div className="close">
                  <div
                    className="h"
                    onClick={() => {
                      heartsData(obj?.name, [
                        obj?.image || data.image,
                        obj?.artist,
                        obj?.name,
                        obj?.duration,
                      ]);
                    }}
                  >
                    <Heart key={i} name={obj?.name} track={obj} />
                  </div>

                  <div className="time">{obj?.duration}</div>
                  <div
                    className="dots-con"
                    onClick={() => {
                      gettingAlbum(obj);
                      console.log(obj);
                    }}
                  >
                    <Dots
                      key={i}
                      name={obj?.name}
                      data={[obj?.name, obj?.name, obj.name]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="
  "
    >
      no songs
    </div>
  );
};

export default Album;
