import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
const code = new URLSearchParams(window.location.search).get("code");
function App() {
  return (
    <div>
      <Header />
      {code ? <Home code={code} /> : <Login />}
    </div>
  );
}

export default App;
