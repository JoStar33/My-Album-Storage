import React from "react";
import styled from "styled-components";
import AlbumPage from './AlbumPage';
import MakeTopsterPage from './MakeTopsterPage';
import SteamTopsterPage from './SteamTopsterPage';
import NavBar from "../components/layouts/defaultLayouts/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../apis/tokens/token";

const MainPage: React.FC = () => {
  let isAuthorized = getToken();
  return (
    isAuthorized ?
    <MainDiv>
      <NavBar></NavBar>
      <Routes>
        <Route path="topster" element={<MakeTopsterPage/>}></Route>
        <Route path="steam-topster" element={<SteamTopsterPage/>}></Route>
        <Route path="/" element={<AlbumPage/>}></Route>
      </Routes>
    </MainDiv>
    : <Navigate to="/login"></Navigate>
  )
};

export default MainPage;

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;
