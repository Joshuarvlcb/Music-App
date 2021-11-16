import React from "react";
import { useAlbumContext } from "../util/Album";

const Library = ({ obj, i }) => {
  const { songsData, publicData, gettingNamePLaylist } = useAlbumContext();
  return (
    <div className="playlist-con">
      <div
        className="playlist__block"
        onClick={() => {
          gettingNamePLaylist(obj.name || "playlist" + " " + (i + 1));
          songsData("custom-playlist", obj.songs);
          publicData({
            image:
              obj.image ||
              "https://i.pinimg.com/564x/a2/9b/ab/a29babcb44d1902fdcc45aa56c38a644.jpg",
            name: obj.name || "playlist" + " " + (i + 1),
            description: obj.description,
          });
        }}
      >
        {obj?.songs?.length > 4
          ? new Array(4).fill(0).map((_, k) => {
              return (
                <img className="playlist__image" src={obj.songs[k].image} />
              );
            })
          : obj?.songs?.map((_, k) => {
              return (
                <img className="playlist__image" src={obj.songs[k].image} />
              );
            })}
      </div>
      <div className="playlist__name">
        {obj.name || "playlist" + " " + (i + 1)}
      </div>
    </div>
  );
};

export default Library;
