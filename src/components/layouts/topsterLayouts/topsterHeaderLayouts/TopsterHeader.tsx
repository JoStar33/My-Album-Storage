import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import TopsterController from './TopsterController';

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>
}

//탑스터 형태변환(10x10 or 5x5), 내가 담고있는 탑스터 리스트(최대 5개)를 불러와 변경이 가능하게 해주는 기능.
const TopsterHeader: React.FC<propsType> = ({setTopsterLayout}) => {
  const navigate = useNavigate();
  const moveMainPage = () => {
    navigate('/');
  };
  const moveSteamPage = () => {
    navigate('/steam-topster');
  };
  return (
    <TopsterHeaderContainer>
      <TopsterController setTopsterLayout={setTopsterLayout}></TopsterController>
      <SteamTopsterButton onClick={moveSteamPage}>탑스터 찌기</SteamTopsterButton>
      <BackMainPageButton onClick={moveMainPage}>돌아가기</BackMainPageButton>
    </TopsterHeaderContainer>
  );
};

const TopsterHeaderContainer = styled.div`
width: 98vw;
height: 9vh;
margin-left: 1vw;
margin-right: 1vw;
margin-bottom: 1vh;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
display: flex;
align-items: center;
flex-direction: row;
`;

const DefaultButton = styled.div`
margin-right: 20px;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
width: 6vw;
height: 6vh;
font-weight: 800;
display: flex;
align-items: center;
justify-content: center;
user-select: none;
cursor: pointer;
`;

const SteamTopsterButton = styled(DefaultButton)`
`;

const BackMainPageButton = styled(DefaultButton)`
`;

export default TopsterHeader;