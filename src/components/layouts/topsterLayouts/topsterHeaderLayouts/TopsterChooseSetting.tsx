import React from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setSelectedTopster } from "../../../../store/topster";

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>;
};

const TopsterChooseSetting: React.FC<propsType> = ({setTopsterLayout}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { topsters } = useSelector(
    (state: RootState) => state.topsterStore
  );
  const handleSelectTopster = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //find의 경우 타입스크립트에서 사용하게 될시, undefined로 나올경우까지 고려하기때문에 참 쓰기 뭐시기하네...
    const findTopster = topsters.filter(
      (item) => item._id === e.target.value
    )[0];
    dispatch(setSelectedTopster(findTopster));
    setTopsterLayout(findTopster.type);
  };
  return (
    <>
      <TopsterChooseSettingContainer onChange={handleSelectTopster}>
        {topsters.map((topster) => 
            <TopsterOption key={topster._id} value={topster._id}>
            {topster.name}
          </TopsterOption>
        )}
      </TopsterChooseSettingContainer>
    </>
  );
};

const TopsterOption = styled.option`
  background: lightcoral;
  color: #fff;
  padding: 3px 0;
  font-size: 16px;
`;

const TopsterChooseSettingContainer = styled.select`
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

export default TopsterChooseSetting;