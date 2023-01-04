import React from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";

const CheckComponent: React.FC = () => {
  return (
    <CheckContainer>
      <AiOutlineCheck size="24" />
    </CheckContainer>
  );
};

const Centering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckContainer = styled(Centering)`
  background-color: rgba(201, 240, 213, 0.4);
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default CheckComponent;
