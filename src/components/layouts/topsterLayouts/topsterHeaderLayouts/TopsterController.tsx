import React from "react";
import styled from "styled-components";
import TopsterLayoutSetting from "./TopsterLayoutSetting";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  asyncPutTopsterFetch,
} from "../../../../store/topster";
import { topsterType } from "../../../../types/topster";
import { useNavigate } from "react-router-dom";
import TopsterChooseSetting from "./TopsterChooseSetting";


type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>;
};

const TopsterController: React.FC<propsType> = ({ setTopsterLayout }) => {
  const { topsters } = useSelector(
    (state: RootState) => state.topsterStore
  );
  const { user } = useSelector(
    (state: RootState) => state.userStore
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const moveMainPage = () => {
    navigate("/");
  };
  const moveSteamPage = () => {
    navigate("/steam-topster");
  };
  const saveTopster = async (topsters: topsterType[]) => {
    await dispatch(
      asyncPutTopsterFetch({ userId: user.id, topsters })
    );
  };
  return (
    <TopsterControllerContainer>
      <TopsterChooseSetting setTopsterLayout={setTopsterLayout}></TopsterChooseSetting>
      <TopsterLayoutSetting setTopsterLayout={setTopsterLayout}></TopsterLayoutSetting>
      <SaveTopsterButton onClick={() => saveTopster(topsters)}>
        탑스터 저장
      </SaveTopsterButton>
      <SteamTopsterButton onClick={moveSteamPage}>
        탑스터 찌기
      </SteamTopsterButton>
      <BackMainPageButton onClick={moveMainPage}>돌아가기</BackMainPageButton>
    </TopsterControllerContainer>
  );
};

const TopsterControllerContainer = styled.div`
  height: 35px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const SteamTopsterButton = styled(DefaultButton)``;

const BackMainPageButton = styled(DefaultButton)``;

const SaveTopsterButton = styled(DefaultButton)``;

export default TopsterController;
