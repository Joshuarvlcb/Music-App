import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlbumContext } from "./util/Album";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const { code, gettingAccessToken } = useAlbumContext();
  console.log(code);
  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        console.log(res);
        gettingAccessToken(res.data.accessToken);

        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        console.error(err);
        // window.location = "/";
      });
  }, []);

  // useEffect(() => {
  //   if (!expiresIn || !refreshToken) return;
  //   const timeout = setInterval(() => {
  //     axios
  //       .post("http://localhost:3001/refresh", {
  //         refreshToken,
  //       })
  //       .then((res) => {
  //         setAccessToken(res.data.accessToken);
  //         setExpiresIn(res.data.expiresIn);
  //       })
  //       .catch(() => {
  //         clearTimeout(expiresIn);
  //         window.location = "/";
  //       });
  //   }, (expiresIn - 60) * 1000);

  //   return () => clearInterval(timeout);
  // }, [refreshToken, expiresIn]);
  console.log(accessToken);
  return accessToken;
};

export default useAuth;
