import React from 'react';
import './App.css';
import AlbumPage from './pages/AlbumPage';
import MakeTopsterPage from './pages/MakeTopsterPage';
import SteamTopsterPage from './pages/SteamTopsterPage';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AlbumPage/>}></Route>
        <Route path="/topster" element={<MakeTopsterPage/>}></Route>
        <Route path="/steam-topster" element={<SteamTopsterPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
