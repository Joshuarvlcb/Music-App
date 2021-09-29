import Header from './components/Header';
import Sidebar from './components/NavBar';
import Home from './pages/Home';
import Player from './components/Player';
function App() {
  return (
    <div className = 'app-con' >
        <Header/>
        <div className = 'main-con'>
          <Sidebar/>
          <Home/>
        </div>
        {/* <Player/> */}
      
    </div>
  );
}

export default App;
