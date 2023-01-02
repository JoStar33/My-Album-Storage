import React from "react";
import styled from "styled-components";
import TopsterMain from "../topsterLayouts/topsterMainLayouts/TopsterMain";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import TopsterDescription from "./TopsterDescription";

const MainView: React.FC = () => {
  const { selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  return (
    <MainViewContainer>
      <TopsterMain topsterLayout={selectedTopster.type}></TopsterMain>
      <TopsterDescription></TopsterDescription>
    </MainViewContainer>
  );
};

const MainViewContainer = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
`;

export default MainView;
