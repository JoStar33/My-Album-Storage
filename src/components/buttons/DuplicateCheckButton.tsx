import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheck } from "react-icons/ai";
import { LoadingBar } from "../forms/loadingForm/ButtonLoadingForm";

type propsType = {
  duplicateLoading: boolean;
  duplicateStateElement: boolean;
  handleDuplicate: () => void;
};

const DuplicateCheckButton: React.FC<propsType> = ({duplicateLoading, duplicateStateElement, handleDuplicate}) => {
  return (
    <DuplicatedCheckButton onClick={handleDuplicate}>
      {
        (!duplicateLoading && !duplicateStateElement) && <>중복확인</>
      }
      {
        (duplicateLoading && !duplicateStateElement) && <LoadingBar></LoadingBar>
      }
      {
        (!duplicateLoading && duplicateStateElement) && <AiOutlineCheck size={20}></AiOutlineCheck>
      }
    </DuplicatedCheckButton>
  );
};

const DuplicatedCheckButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  border-radius: 20px;
  margin-left: 3px;
  background-color: #baecc8;
  user-select: none;
  cursor: pointer;
`;


export default DuplicateCheckButton;