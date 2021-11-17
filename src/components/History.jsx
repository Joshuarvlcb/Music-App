import React from "react";
import Heart from "./Heart";
import { useAlbumContext } from "../util/Album";
const History = () => {
  const { queue, playerData, settingAudio, heartsData, hearts } =
    useAlbumContext();
  return (
    <div className="history-con">
      <h2 className="history__title">Queue</h2>

      <div className="history">
        {queue?.map((obj, i) => {
          console.log(obj);
          return (
            <div
              className="q"
              onClick={() => {
                settingAudio(obj[0].preview);
                playerData({
                  image: obj[0].image,
                  artist: obj[0]?.artist,
                  name: obj[0]?.name,
                  duration: obj[0].duration,
                });
              }}
            >
              <img
                height="50px"
                src={obj[0].image}
                alt=""
                className="q__image"
              />
              <div className="colum">
                <div className="q__name">{obj[0].name}</div>
                <div className="q__artist">{obj[0].artist}</div>
              </div>

              <div className="row">
                <div className="q__artist">{obj[0]?.duration}</div>
                <div
                  className="h"
                  onClick={() => {
                    heartsData(obj[0]?.name, {
                      image: obj?.[0].image,
                      artist: obj?.[0].artist,
                      name: obj[0]?.name,
                      duration: obj[0]?.duration,
                      aritstId: obj[0].artistId,
                      albumId: obj[0].albumId,
                    });
                    console.log(hearts);
                  }}
                >
                  <Heart key={i} name={obj[0]?.name} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
