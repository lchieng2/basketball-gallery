import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom"

import ListView from './List';
import GalleryView from './Gallery';
import PlayerView from './Player';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <div className="top">
          <h1>balldontlie</h1>
        </div>
        <span>
          <div className="links">
            <Link to="/">List</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        </span>

        <Routes>
          <Route path="/" element={<ListView></ListView>}/>
          <Route path="/gallery" element={<GalleryView></GalleryView>} />
          <Route path="/player/:playerId" element={<PlayerView></PlayerView>} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
