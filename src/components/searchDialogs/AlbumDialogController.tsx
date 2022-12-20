import React from 'react';
import styled from 'styled-components';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { albumType } from '../../store/album';
import { asyncPostAlbumFetch } from '../../store/album';

type propsType = {
  selectedAlbums: albumType[]
}

const AlbumDialogController: React.FC<propsType> = ({selectedAlbums}) => {
  const dispatch = useDispatch<AppDispatch>();
  const apply = async () => {
    await dispatch(asyncPostAlbumFetch({selectedAlbums: selectedAlbums, userId: 30}))
  }
  return (
    <BtnContainer>
      <ApplyBtn onClick={apply}>
        추가
      </ApplyBtn>
      <CloseBtn>
        닫기
      </CloseBtn>
    </BtnContainer>
  );
};
const BtnContainer = styled.div`
display: flex;
flex-direction: row;
margin: 20px;
`;

const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const BtnForm = styled(Centering)`
width: 10vw;
height: 3vh;
border-radius: 20px;
color: white;
font-weight: 800;
margin-left: 2px;
margin-right: 2px;
user-select: none;
cursor: pointer;
`;

const ApplyBtn = styled(BtnForm)`
background-color: skyblue;
`;

const CloseBtn = styled(BtnForm)`
background-color: #f2c2c3;
`;

export default AlbumDialogController;