import React, { useState } from "react";
import { useMusicContext } from "../util/Context";

function Home() {
  const { data } = useMusicContext();
  const [dataArray, setDataArray] = useState([]);
  console.log(data);
  const creatingArray = () => {
    // for(let key in data){
    //     console.log(key);
    // };
    console.log(data.topalbums.album);
  };
  return (
    <div>
      {data.topalbums?.album.map((obj) => {
        // const {artist:{name:artistName},name:songName,image} = obj;
        // console.log(artistName,songName,image)
        console.log(obj);
      })}
      {/* {    creatingArray()} */}
    </div>
  );
}

export default Home;
