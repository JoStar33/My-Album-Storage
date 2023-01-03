import React, { useState } from "react";
import styled from "styled-components";
import TextDialog from "../components/dialogs/commonDialogs/TextDialog";
import LoginForm from "../components/forms/commonForms/LoginForm";
import { Navigate } from "react-router-dom";
import { getToken } from "../apis/tokens/token";

const LoginPage: React.FC = () => {
  const isAuthorized = getToken();
  const [dialog, setDialog] = useState(false);
  const [dialogText, setDialogText] = useState(``);
  const dialogController = (dialogStatus: boolean) => {
    return setDialog(dialogStatus);
  };
  return !isAuthorized || isAuthorized === null ? (
    <LoginPageDiv>
      <LoginForm
        setDialogText={setDialogText}
        dialogController={dialogController}
      ></LoginForm>
      {dialog && (
        <TextDialog
          dialogController={dialogController}
          text={dialogText}
        ></TextDialog>
      )}
    </LoginPageDiv>
  ) : (
    <Navigate to="/" />
  );
};

export default LoginPage;

const LoginPageDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
