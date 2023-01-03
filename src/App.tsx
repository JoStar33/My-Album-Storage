import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<MainPage/>}></Route>
        <Route path="login" element={<LoginPage/>} />
        <Route path="join" element={<JoinPage/>} />
      </Routes>
    </div>
  );
}

export default App;
