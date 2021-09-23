import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css';
import {MusicProvider} from './util/Context'

ReactDOM.render(
  <React.StrictMode>
    <MusicProvider>
      <App />
    </MusicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);