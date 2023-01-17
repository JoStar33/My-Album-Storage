import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AlbumDialog from "../components/dialogs/searchDialogs/AlbumDialog";
import ModifyDialog from "../components/dialogs/modifyDialogs/ModifyDialog";
import RecommendAlbumForm from "../components/forms/recommendAlbumForms/RecommendAlbumForm";
import { setTokenByPost } from "../apis/tokenApi";
import { asyncGetAlbumFetch } from "../store/album";
import { userAlbumType } from "../types/album";
import { asyncGetTopsterFetch } from "../store/topster";
import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersAlbumViewerForm from "../components/forms/commonForms/UsersAlbumViewerForm";

const AlbumPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: RootState) => state.userStore
  );
  //아래와 같이 []이렇게 기술하지않으면 api를 무한 호출하는 버그가 있었음. 해당문제를 해결한 코드임.
  useEffect(() => {
    if(user.id) {
      dispatch(asyncGetAlbumFetch(user.id));
      dispatch(asyncGetTopsterFetch(user.id));
    }
    setTokenByPost();
  }, [dispatch, user.id]);
  const { userAlbums, getAlbumLoading } = useSelector(
    (state: RootState) => state.albumStore
  );
  const [albumDialog, setAlbumDialog] = useState(false);
  const [modifyDialog, setModifyDialog] = useState({
    modifyAlbum: {} as userAlbumType,
    isOpened: false,
  });
  const openDialog = () => {
    setAlbumDialog(true);
  };
  const moveTopsterPage = () => {
    navigate("/topster");
  };
  return (
    <AlbumPageContainer>
      <RecommendAlbumForm></RecommendAlbumForm>
      <ButtonContainer>
        <OpenDialogButton onClick={openDialog}>
          다이얼로그 오픈
        </OpenDialogButton>
        <MakeTopsterButton onClick={moveTopsterPage}>
          탑스터 만들러가기
        </MakeTopsterButton>
      </ButtonContainer>
      <UsersAlbumViewerForm
        getAlbumLoading={getAlbumLoading}
        userAlbums={userAlbums}
        modifyDialog={modifyDialog}
        setModifyDialog={setModifyDialog}
      ></UsersAlbumViewerForm>
      {albumDialog && (
        <AlbumDialog setAlbumDialog={setAlbumDialog}></AlbumDialog>
      )}
      {modifyDialog.isOpened && (
        <ModifyDialog
          modifyDialog={modifyDialog}
          setModifyDialog={setModifyDialog}
        ></ModifyDialog>
      )}
    </AlbumPageContainer>
  );
};

const Centering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 90vw;
  border-radius: 20px;
  box-shadow: 0 6px 6px 0 gray;
  font-weight: 800;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const DefaultButton = styled(Centering)`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  font-weight: 800;
  box-shadow: 0 6px 6px 0 gray;
  user-select: none;
  cursor: pointer;
`;

const OpenDialogButton = styled(DefaultButton)`
  background-color: skyblue;
`;

const MakeTopsterButton = styled(DefaultButton)`
  background-color: orange;
  margin-left: 20px;
  margin-right: 20px;
`;

const AlbumPageContainer = styled(Centering)`
  flex-direction: column;
`;

export default AlbumPage;
