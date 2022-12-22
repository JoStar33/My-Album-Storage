import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//탑스터 형태변환(10x10 or 5x5), 내가 담고있는 탑스터 리스트(최대 5개)를 불러와 변경이 가능하게 해주는 기능.
const TopsterHeader: React.FC = () => {
  const navigate = useNavigate();
  const moveMainPage = () => {
    navigate('/');
  };
  return (
    <TopsterHeaderContainer>
      <TopsterContents></TopsterContents>
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

const TopsterContents = styled.div`
width: 90vw;
`;

const BackMainPageButton = styled.div`
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

export default TopsterHeader;