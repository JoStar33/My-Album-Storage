import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextDialog from "../components/dialogs/commonDialogs/TextDialog";
import LoginForm from "../components/forms/commonForms/LoginForm";
import Cookies from 'universal-cookie';
import { AppDispatch } from "../store/index";
import { useDispatch } from "react-redux";
import { resetUserState } from "../store/user";
import { resetTopsterState } from "../store/topster";
import { resetAlbumState } from "../store/album";
import { Navigate } from "react-router-dom";
import { getToken } from "../apis/tokens/token";

const LoginPage: React.FC = () => {
  const cookies = new Cookies();
  const isAuthorized = getToken();
  const dispatch = useDispatch<AppDispatch>();
  const [dialog, setDialog] = useState(false);
  const [dialogText, setDialogText] = useState(``);
  useEffect(() => {
    cookies.remove('connect.sid');
    dispatch(resetUserState());
    dispatch(resetTopsterState());
    dispatch(resetAlbumState());
  })
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
