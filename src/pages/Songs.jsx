import React, { useState, useEffect, useRef } from "react";
import { loadSpotifyPlayer } from "react-spotify-web-playback/lib/utils";
import { useAlbumContext } from "../util/Album";
import Heart from "../components/Heart";
import { BiPlay } from "react-icons/bi";
import Dots from "../components/Dots";
const Album = ({ back }) => {
  const { data, playerData, heartsData, gettingAlbum, songs } =
    useAlbumContext();

  if (songs.type == "playlist") {
    return (
      <div className="songs-page">
        <div className="banner">
          <img className="banner__img" src={data.image} alt={data.name} />
        </div>
        <button className="back-btn" onClick={back}>
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
                      heartsData(obj?.track?.name, [
                        obj?.track?.album?.images[0]?.url,
                        obj?.track?.artists["0"]?.name,
                        obj?.track?.name,
                        (obj?.track?.duration_ms / 1000 / 60).toFixed(2),
                      ]);
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
        <button className="back-btn" onClick={back}>
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
                      heartsData(obj?.name, [
                        obj?.images?.[0]?.url,
                        obj?.artists["0"]?.name,
                        obj?.name,
                        (obj?.duration_ms / 1000 / 60).toFixed(2),
                      ]);
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
  }
  // )}else if(data.type === 'artist){
  //   return (
  //     <div className="songs-page">
  //       <div className="banner">
  //         <img className="banner__img" src={data.image} alt={data.name} />
  //       </div>
  //       <button className="back-btn" onClick={back}>
  //         back
  //       </button>
  //       <div className="songs-container">
  //         {songs?.map((obj, i) => {
  //           return (
  //             <div
  //               className="song"
  //               key={i}
  //               onClick={() => {
  //                 playerData({
  //                   image: obj?.track?.album?.images[0]?.url,
  //                   artist: obj?.track?.artists["0"]?.name,
  //                   name: obj?.track?.name,
  //                   duration: (obj?.track?.duration_ms / 1000 / 60).toFixed(2),
  //                 });
  //               }}
  //             >
  //               <div className="close">
  //                 <img
  //                   src={obj?.track?.album?.images[0]?.url}
  //                   alt={obj?.track?.name}
  //                   className="song__image"
  //                 />
  //                 <div className="col">
  //                   <div id={i} className="song__name">
  //                     {obj?.track?.name}
  //                   </div>
  //                   <div className="song__artist">
  //                     {obj?.track?.artists["0"]?.name}
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="close">

  //                 <div
  //                   className="h"
  //                   onClick={() => {
  //                     heartsData(obj?.track?.name, [
  //                       obj?.track?.album?.images[0]?.url,
  //                       obj?.track?.artists["0"]?.name,
  //                       obj?.track?.name,
  //                       (obj?.track?.duration_ms / 1000 / 60).toFixed(2),
  //                     ]);
  //                   }}
  //                 >
  //                   <Heart name={obj?.track?.name} track={obj.track} />
  //                 </div>

  //                 <div className="time">
  //                   {(obj?.track?.duration_ms / 1000 / 60).toFixed(2)}
  //                 </div>
  //                 <div
  //                   className="dots-con"
  //                   onClick={() => {
  //                     gettingAlbum(obj);
  //                   }}
  //                 >
  //                   <Dots />
  //                 </div>
  //               </div>

  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

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
