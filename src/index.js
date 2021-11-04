import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
import { MusicProvider } from "./util/Context";

ReactDOM.render(
  <React.StrictMode>
    <MusicProvider>
      <Router>
        <App />
      </Router>
    </MusicProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
