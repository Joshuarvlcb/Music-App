import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
import { AlbumProvider } from "./util/Album";

ReactDOM.render(
  <React.StrictMode>
    <AlbumProvider>
      <Router>
        <App />
      </Router>
    </AlbumProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
