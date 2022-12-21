import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextDialog from '../components/dialogs/TextDialog';
import JoinForm from '../components/forms/JoinForm';
import { Navigate } from "react-router-dom";
import { getCookie } from '../apis/cookie';

const JoinPage: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  //로그인 성공시에만 MainPage로 넘어갈 수 있게하기 위해서.
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [dialogText, setDialogText] = useState(``);
  const isAuthorized = getCookie();
  const navigate = useNavigate();
  const dialogController = (dialogStatus: boolean) => {
    if (dialogStatus) {
      return setDialog(dialogStatus)
    }
    if(dialogSuccess) {
      navigate('/');
      return setDialog(dialogStatus)
    }
    return setDialog(dialogStatus)
  };
  return (
    !isAuthorized || isAuthorized === "undefined" ?
    <JoinPageDiv>
      <JoinForm dialogController={ dialogController } setDialogText={ setDialogText } setDialogSuccess={setDialogSuccess}></JoinForm>
      {
        dialog && <TextDialog dialogController={ dialogController } text={dialogText}></TextDialog>
      }
    </JoinPageDiv> : <Navigate to="/"/>
  );
}

export default JoinPage;

const JoinPageDiv = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
position: relative;
`
