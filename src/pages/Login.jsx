import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=cb2ed77176254eebbdd48f2c8b025d1b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
// import { useAlbumContext } from "../util/Album";
const Login = () => {
  return (
    <div className="login-con">
      <div className="login">
        <div className="input-field">
          <div class="form__group">
            <input
              type="email"
              class="form__input"
              id="name"
              placeholder="Email"
              required=""
            />
            <label for="name" class="form__label">
              Email
            </label>
          </div>
          <div class="form__group">
            <input
              type="password"
              class="form__input"
              id="name"
              placeholder="Password"
              required=""
            />
            <label for="name" class="form__label">
              Password
            </label>
          </div>
          <button className="button">
            <a href={AUTH_URL}>Login</a>
          </button>
        </div>
        <div className="image"></div>
      </div>
    </div>
  );
};
export default Login;
