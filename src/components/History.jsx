import React from "react";
import { useAlbumContext } from "../util/Album";
const History = () => {
  const { queue } = useAlbumContext();
  return (
    <div className="history-con">
      <h2 className="history__title">Queue</h2>

      <div className="history">
        {queue?.map((obj) => {
          return (
            <div className="q">
              <img
                height="50px"
                src={obj[0].image}
                alt=""
                className="q__image"
              />
              <div className="q__name">{obj[0].name}</div>
              <div className="q__artist">{obj[0].artist}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
