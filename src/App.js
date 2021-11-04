import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loader from "./components/Loader";
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [loader, setLoader] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 3000);
  // });

  return !loader ? (
    <div className="app">
      <Header />
      {code ? <Home code={code} /> : <Login />}
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
}

export default App;
