import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { asyncPutTopsterFetch, setSelectedTopsterName } from '../../../../store/topster';
import TopsterController from './TopsterController';

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>
}

//탑스터 형태변환(10x10 or 5x5), 내가 담고있는 탑스터 리스트(최대 5개)를 불러와 변경이 가능하게 해주는 기능.
const TopsterHeader: React.FC<propsType> = ({setTopsterLayout}) => {
  const { selectedTopster, topsters } = useSelector((state: RootState) => state.topsterStore);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const moveMainPage = () => {
    navigate('/');
  };
  const saveTopster = () => {
    dispatch(asyncPutTopsterFetch({userId: '63a921dfa7cdfa7871cdb166', topsters}));
  };
  const moveSteamPage = () => {
    navigate('/steam-topster');
  };
  const handleTopsterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedTopsterName(e.target.value));
  };
  return (
    <TopsterHeaderContainer>
      <TopsterName>
        <TopsterNamePlace onChange={handleTopsterName} value={selectedTopster.name}></TopsterNamePlace>
      </TopsterName>
      <TopsterController setTopsterLayout={setTopsterLayout}></TopsterController>
      <SaveTopsterButton onClick={saveTopster}>탑스터 저장</SaveTopsterButton>
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

const TopsterName = styled.div`
width: 60%;
display: flex;
align-items: center;
justify-content: center;
`;

const TopsterNamePlace = styled.input`
margin-left: 30%;
border: none;
outline: none;
font-size: large;
font-weight: 800;
`;

const DefaultButton = styled.div`
margin-right: 20px;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
width: 8vw;
height: 6vh;
font-weight: 1000;
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

const SaveTopsterButton = styled(DefaultButton)`
`;

export default TopsterHeader;