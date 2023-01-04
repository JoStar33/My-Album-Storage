import React from "react";
import styled from "styled-components";

type propsType = {
  apply: () => void;
  close: () => void;
};

const ScoreDialogController: React.FC<propsType> = ({ apply, close }) => {
  return (
    <ButtonContainer>
      <ApplyButton onClick={apply}>적용</ApplyButton>
      <CloseButton onClick={close}>닫기</CloseButton>
    </ButtonContainer>
  );
};
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const Centering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonForm = styled(Centering)`
  width: 5vw;
  height: 3vh;
  border-radius: 20px;
  color: white;
  font-weight: 800;
  margin-left: 2px;
  margin-right: 2px;
  user-select: none;
  cursor: pointer;
`;

const ApplyButton = styled(ButtonForm)`
  background-color: skyblue;
`;

const CloseButton = styled(ButtonForm)`
  background-color: red;
`;

export default ScoreDialogController;
