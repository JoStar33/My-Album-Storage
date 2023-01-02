import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NavBarContainer>
      <BackToMakeTopsterPage onClick={() => navigate("/topster")}>
        돌아가기
      </BackToMakeTopsterPage>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  width: 100vw;
  height: 5vh;
  display: flex;
  justify-content: flex-end;
`;

const BackToMakeTopsterPage = styled.div`
  width: 10vw;
  height: 100%;
  border-radius: 20px;
  background-color: white;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NavBar;
