import React from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  const steamTopster = () => {
    //console.log(document.getElementsByClassName('topster_container')[0]);
    html2canvas(document.getElementsByClassName('topster_container')[0] as HTMLElement, { useCORS: true, })
    .then(canvas => {
      onSaveAs(canvas.toDataURL('image/jpg', 1.0),`${selectedTopster.name}.jpg`)
    })
  };
  const onSaveAs = (uri: string, filename: string) => {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    window.open(uri);
  };
  return (
    <NavBarContainer>
      <SteamTopsterButton onClick={steamTopster}>
        탑스터 쪄내기
      </SteamTopsterButton>
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

const DefaultButton = styled.div`
  width: 10vw;
  height: 100%;
  border-radius: 20px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SteamTopsterButton = styled(DefaultButton)`
  background-color: #d6e7ef;
`;

const BackToMakeTopsterPage = styled(DefaultButton)`
  background-color: white;
`;

export default NavBar;
