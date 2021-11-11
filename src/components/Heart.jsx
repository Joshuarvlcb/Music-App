import React, { useState } from "react";
import { useAlbumContext } from "../util/Album";

const Heart = ({ name }) => {
  //arr songs heart
  const [toggle, setToggle] = useState(false);
  const { hearts } = useAlbumContext();
  return (
    <div
      onClick={() => {
        setToggle((prev) => {
          setTimeout(() => {
            return !prev;
          }, 1000);
        });
      }}
      className={`heart ${
        hearts.some((arr) => {
          return arr.name == name;
        }) || toggle
          ? "right"
          : ""
      }`}
    ></div>
  );
};

export default Heart;
