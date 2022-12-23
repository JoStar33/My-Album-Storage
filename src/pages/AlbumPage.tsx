import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { setTokenByPost } from '../apis/tokenApi';
import { RootState, AppDispatch } from '../store';
import { asyncGetAlbumFetch, userAlbumType } from '../store/album';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import UserAlbumBox from '../components/albums/UserAlbumBox';
import UserAlbumSkeleton from '../components/loadingForm/UserAlbumSkeleton';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';
import ModifyDialog from '../components/modifyDialogs/ModifyDialog';

const AlbumPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //아래와 같이 []이렇게 기술하지않으면 api를 무한 호출하는 버그가 있었음. 해당문제를 해결한 코드임.
  useEffect(() => {
    dispatch(asyncGetAlbumFetch(30));
    setTokenByPost();
  }, []);
  const { userAlbums, getAlbumLoading } = useSelector((state: RootState) => state.albumStore);
  const [albumDialog, setAlbumDialog] = useState(false);
  const [modifyDialog, setModifyDialog] = useState({
    modifyAlbum: {} as userAlbumType,
    isOpened: false
  });
  const openDialog = () => {
    setAlbumDialog(true);
  }
  const moveTopsterPage = () => {
    navigate('/topster');
  };
  return (
    <AlbumPageContainer>
      <ButtonContainer>
        <OpenDialogButton onClick={ openDialog }>다이얼로그 오픈</OpenDialogButton>
        <MakeTopsterButton onClick={ moveTopsterPage }>탑스터 만들러가기</MakeTopsterButton>
      </ButtonContainer>
      <UserAlbumViewer>
        {
          //앨범로딩이 종료시에 앨범들 정상적으로 보여주기.
          !getAlbumLoading && userAlbums.map(album => 
            <UserAlbumBox 
              key={album.id} 
              album={album}
              modifyDialog={modifyDialog}
              setModifyDialog={setModifyDialog}
            ></UserAlbumBox>)
        }
        {
          //앨범로딩시에는 스켈레톤 앨범들이 보이도록.
          getAlbumLoading && new Array(9).fill(1).map((_, index) => {
            return <UserAlbumSkeleton key={index}></UserAlbumSkeleton>
          })
        }
      </UserAlbumViewer>
      {
        albumDialog && <AlbumDialog setAlbumDialog={setAlbumDialog}></AlbumDialog>
      }
      {
        modifyDialog.isOpened && <ModifyDialog 
          modifyDialog={modifyDialog}
          setModifyDialog={setModifyDialog}
        ></ModifyDialog>
      }
    </AlbumPageContainer>
  );
};

const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const UserAlbumViewer = styled.div`
display: flex;
flex-wrap: wrap;
overflow-y: scroll;
width: 90vw;
height: 70vh;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
::-webkit-scrollbar {
    display: none;
}
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
margin-left: 20px;
`;

const MakeTopsterButton = styled(DefaultButton)`
background-color: orange;
margin-left: 20px;
`;


const AlbumPageContainer = styled(Centering)`
flex-direction: column;
`;

export default AlbumPage;