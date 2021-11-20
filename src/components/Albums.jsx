import React, { useRef, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAlbumContext } from "../util/Album";

const Albums = ({ albums, title, width }) => {
  const {
    publicData,
    spotify,
    songsData,
    data,
    gettingNamePLaylist,
    isItDoneLoading,
  } = useAlbumContext();
  const albumsStyle = useRef();
  const [absValue, setAbsValue] = useState(0);

  return (
    <div
      className={`${
        window.innerWidth <= 900 || width
          ? "albums-container-100"
          : "album-container"
      }`}
    >
      <div className="row">
        <div className="album__header">{title}</div>

        <div className="arrows">
          <BiLeftArrow
            className="arrow"
            onClick={(e) => {
              e.preventDefault();

              if (absValue == 0 || absValue < 0) {
                setAbsValue(0);

                return (albumsStyle.current.style.left = 0 + "px");
              }
              setAbsValue((prev) => {
                let val = prev - 180;
                albumsStyle.current.style.left = -val + "px";
                return val;
              });
            }}
          />
          <BiRightArrow
            className="arrow"
            onClick={(e) => {
              e.preventDefault();

              if (absValue >= 3600) {
                setAbsValue(0);
                return (albumsStyle.current.style.left = 0 + "px");
              }
              setAbsValue((prev) => {
                let val = prev + 180;

                albumsStyle.current.style.left = -val + "px";
                return val;
              });
              console.log(absValue, "forward");
            }}
          />
        </div>
      </div>
      <div className={`${width ? "album-container-100" : "albums-container"}`}>
        <div ref={albumsStyle} className="albums">
          {albums !== "rap"
            ? albums?.map((obj, i) => {
                const { id } = obj;
                //           name
                // images[0].url
                // id
                return (
                  <Link to="songs">
                    <div
                      className="album"
                      key={i}
                      onClick={() => {
                        publicData({
                          id: id,
                          image: obj.images[0].url,
                          name: obj.name,
                          description: obj.description,
                        });
                        spotify.getPlaylistTracks(id).then((data) => {
                          console.log(data);
                          songsData("playlist", data.body.items);
                        });
                        isItDoneLoading(true);
                        gettingNamePLaylist(null);
                      }}
                    >
                      <img
                        src={obj.images[0].url}
                        alt={obj.name}
                        className="album__image"
                      />
                      <div className="player-image"></div>
                      <div className="album__name">{obj.name}</div>
                    </div>
                  </Link>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Albums;
