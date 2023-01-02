import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  asyncPutTopsterFetch,
  asyncPatchTopsterFetch,
  setSelectedTopster,
  setSelectedTopsterType,
  topsterType,
} from "../../../../store/topster";
import { useNavigate } from "react-router-dom";

type layout = {
  name: string;
  value: string;
};

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>;
};

const TopsterController: React.FC<propsType> = ({ setTopsterLayout }) => {
  const { topsters, selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const layoutType: layout[] = [
    {
      name: "3x3",
      value: "3x3",
    },
    {
      name: "5x5",
      value: "5x5",
    },
    {
      name: "6x6",
      value: "6x6",
    },
    {
      name: "10x10",
      value: "10x10",
    },
    {
      name: "10 & 12 & 20 구도",
      value: "10_12_20",
    },
  ];
  const handleSelectTopster = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //find의 경우 타입스크립트에서 사용하게 될시, undefined로 나올경우까지 고려하기때문에 참 쓰기 뭐시기하네...
    const findTopster = topsters.filter(
      (item) => item._id === e.target.value
    )[0];
    dispatch(setSelectedTopster(findTopster));
    setTopsterLayout(findTopster.type);
  };
  const handleSelectLayout = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    topster: topsterType
  ) => {
    setTopsterLayout(e.target.value);
    dispatch(setSelectedTopsterType(e.target.value));
    await dispatch(
      asyncPatchTopsterFetch({
        userId: "63a921dfa7cdfa7871cdb166",
        topster: {
          ...topster,
          type: e.target.value,
        },
      })
    );
  };
  const moveMainPage = () => {
    navigate("/");
  };
  const moveSteamPage = () => {
    navigate("/steam-topster");
  };
  const saveTopster = async (topsters: topsterType[]) => {
    await dispatch(
      asyncPutTopsterFetch({ userId: "63a921dfa7cdfa7871cdb166", topsters })
    );
  };
  return (
    <TopsterControllerContainer>
      <TopsterChooseSetting onChange={handleSelectTopster}>
        {topsters.map((topster) => 
            <TopsterOption key={topster._id} value={topster._id}>
            {topster.name}
          </TopsterOption>
        )}
      </TopsterChooseSetting>
      <TopsterLayoutSetting
        value={selectedTopster.type}
        onChange={(e) => {
          handleSelectLayout(e, selectedTopster);
        }}
        name="layout"
      >
        {layoutType.map((item) => 
            <TopsterOption key={item.value} value={item.value}>
            {item.name}
          </TopsterOption>
        )}
      </TopsterLayoutSetting>
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

const SelectDefault = styled.select`
  width: 200px;
  height: inherit;
  background: transparent;
  border: 2px solid lightcoral;
  border-radius: 4px;
  outline: 0 none;
  padding: 0 5px;
  z-index: 3;
  margin-right: 20px;
`;

const TopsterLayoutSetting = styled(SelectDefault)``;

const TopsterChooseSetting = styled(SelectDefault)``;

const TopsterOption = styled.option`
  background: lightcoral;
  color: #fff;
  padding: 3px 0;
  font-size: 16px;
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
