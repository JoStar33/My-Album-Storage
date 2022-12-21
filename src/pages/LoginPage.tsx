import React, { useState } from 'react';
import styled from 'styled-components';
import TextDialog from '../components/dialogs/TextDialog';
import LoginForm from '../components/forms/LoginForm';
import { Navigate } from "react-router-dom";
import { getCookie } from '../apis/cookie';

const LoginPage: React.FC = () => {
  const isAuthorized = getCookie();
  const [dialog, setDialog] = useState(false)
  const [dialogText, setDialogText] = useState(``)
  const dialogController = (dialogStatus: boolean) => {
    return setDialog(dialogStatus)
  };
  return (
    !isAuthorized || isAuthorized === "undefined" ?
    <LoginPageDiv>
      <LoginForm setDialogText={setDialogText} dialogController={ dialogController }></LoginForm>
      {
        dialog && <TextDialog dialogController={ dialogController } text={dialogText}></TextDialog>
      }
    </LoginPageDiv> : <Navigate to="/" />
  );
}

export default LoginPage;

const LoginPageDiv = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`