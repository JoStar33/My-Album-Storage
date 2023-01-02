import React from "react";
import styled from "styled-components";
import TopsterNameInfo from "./TopsterNameInfo";
import TopsterController from "./TopsterController";

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>;
};

//탑스터 형태변환(10x10 or 5x5), 내가 담고있는 탑스터 리스트(최대 5개)를 불러와 변경이 가능하게 해주는 기능.
const TopsterHeader: React.FC<propsType> = ({ setTopsterLayout }) => {
  return (
    <TopsterHeaderContainer>
      <TopsterNameInfo></TopsterNameInfo>
      <TopsterController
        setTopsterLayout={setTopsterLayout}
      ></TopsterController>
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

export default TopsterHeader;
