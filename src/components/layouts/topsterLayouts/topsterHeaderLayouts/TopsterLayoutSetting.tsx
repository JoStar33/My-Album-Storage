import React from 'react';
import styled from "styled-components";
import { topsterType } from "../../../../types/topster";
import {
  asyncPatchTopsterFetch,
  setSelectedTopsterType,
} from "../../../../store/topster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

type layout = {
  name: string;
  value: string;
};

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>;
};

const TopsterLayoutSetting: React.FC<propsType> = ({setTopsterLayout}) => {
  const {selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  const { user } = useSelector(
    (state: RootState) => state.userStore
  );
  const dispatch = useDispatch<AppDispatch>();
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
  const handleSelectLayout = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    topster: topsterType
  ) => {
    setTopsterLayout(e.target.value);
    dispatch(setSelectedTopsterType(e.target.value));
    await dispatch(
      asyncPatchTopsterFetch({
        userId: user.id,
        topster: {
          ...topster,
          type: e.target.value,
        },
      })
    );
  };
  return (
    <>
      <TopsterLayoutSettingContainer
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
      </TopsterLayoutSettingContainer>
    </>
  );
};

const TopsterOption = styled.option`
  background: lightcoral;
  color: #fff;
  padding: 3px 0;
  font-size: 16px;
`;

const TopsterLayoutSettingContainer = styled.select`
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

export default TopsterLayoutSetting;