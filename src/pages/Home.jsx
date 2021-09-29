import React, { useState } from 'react';
import { useMusicContext } from '../util/Context';

function Home() {
    const {data,togglePlayer} = useMusicContext();
    console.log(data);
    console.log(data);

    return (

        <div className = 'home'>
          <h2 className="home__title">Recently played</h2>
          <div className="played">
          {            data.topalbums?.album.filter((obj) => {
                const {artist:{name:artistName},name:songName,image} = obj;
                // if(songName.length <= 29 && songName != null && image[1]['#text'] != undefined) return obj;
                console.log(image[1]['text']);
            return songName.length <= 29 && songName != '(null)' && songName !== 'Die in Your Arms' && songName !== 'NRJ Hit List 2010'; 

          }).map((obj,i) => {
                const {artist:{name:artistName},name:songName,image} = obj;
                console.log(artistName,songName,image[1]['#text']);
                return <div key = {i} className = 'card' onClick = {togglePlayer}>
                    <img className="card__pic" src = {image[1]['#text']} alt = {songName}/>
                    <div className="card__info">
                        {songName}
                        <div className="artist">{artistName}</div>
                    </div>
                    <div className="time">3:40</div>
                </div>
            })} 
          </div>
         
        </div>
    );
};

export default Home;