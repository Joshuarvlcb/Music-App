import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
const Albums = ({ albums }) => {
  console.log(albums);
  /*
  title
  {
      image
      album name
      artist name

      obj.images[1].url
      obj.name
    obj.artists[0]
    }
  
  */
  return (
    <div className="album-container">
      <div className="row">
        <div className="album__header">Albums</div>

        <div className="arrows">
          <BiLeftArrow className="arrow" />
          <BiRightArrow className="arrow" />
        </div>
      </div>
      <div className="albums">
        {albums !== "reggaeton"
          ? albums?.map((obj) => {
              return (
                <div className="album">
                  <img
                    src={obj.images[1].url}
                    alt={obj.name}
                    className="album__image"
                  />
                  <div className="album__name">{obj.name}</div>
                  <div className="album__artist">{obj.artists[0].name}</div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Albums;
