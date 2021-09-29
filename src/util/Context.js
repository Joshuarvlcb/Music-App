import React, { useState,useContext} from 'react';

import { useFetch } from './Fetch';

const MusicContext = React.createContext();

export const MusicProvider = ({children}) => {
    const {data} = useFetch();
        const togglePlayer = () => {
            document.addEventListener('click',(e) => {
                console.log(e.target.className)
            })
        }
     const [clicked, setClicked] = useState(false)

    return <MusicContext.Provider value = {{data,clicked,setClicked,togglePlayer}}>
        {children}        
    </MusicContext.Provider>
};

export const useMusicContext = () => {
    return useContext(MusicContext);
};