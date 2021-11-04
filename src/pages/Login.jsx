import React from "react";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=cb2ed77176254eebbdd48f2c8b025d1b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <button>
      <a href={AUTH_URL}>login</a>
    </button>
  );
};
export default Login;
