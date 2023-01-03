import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ScoreForm from "../dialogs/scoreDialogs/ScoreForm";
import { userAlbumType, asyncGetAlbumFetch } from "../../store/album";
import { MdCancel } from "react-icons/md";
import { AppDispatch, RootState } from "../../store";
import { asyncDeleteAlbumFetch } from "../../store/album";
import { useDispatch, useSelector } from "react-redux";

type dialogType = {
  modifyAlbum: userAlbumType;
  isOpened: boolean;
};

type propsType = {
  album: userAlbumType;
  modifyDialog: dialogType;
  setModifyDialog: React.Dispatch<React.SetStateAction<dialogType>>;
};

const UserAlbumBox: React.FC<propsType> = ({
  album,
  modifyDialog,
  setModifyDialog,
}) => {
  const { user } = useSelector(
    (state: RootState) => state.userStore
  );
  const [isLineOver, setIsLineOver] = useState(false);
  const albumText = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const height = albumText.current.clientHeight;
    if (height > 23) {
      setIsLineOver(true);
    }
  }, [album._id]);
  const handleDeleteEvent = async () => {
    await dispatch(asyncDeleteAlbumFetch(album._id))
    .then(() => {
      dispatch(asyncGetAlbumFetch(user.id));
    });
  };
  const handleOpenModifyDialog = () => {
    setModifyDialog({
      ...modifyDialog,
      modifyAlbum: {
        ...album,
      },
      isOpened: true,
    });
  };
  return (
    <UserAlbumContainer>
      <UserAlbumName
        onClick={handleOpenModifyDialog}
        ref={albumText}
        isLineOver={isLineOver}
      >
        {album.name}
      </UserAlbumName>
      <UserAlbumImg
        onClick={handleOpenModifyDialog}
        src={album.image}
        isLineOver={isLineOver}
      />
      <ScoreForm score={album.score}></ScoreForm>
      <UserAlbumDescription>{album.description}</UserAlbumDescription>
      <DeleteButton onClick={handleDeleteEvent}>
        <MdCancel size={30}></MdCancel>
      </DeleteButton>
    </UserAlbumContainer>
  );
};

const UserAlbumContainer = styled.div`
  width: 30%;
  border-radius: 20px;
  margin: 1.5%;
  box-shadow: 0 6px 6px 0 gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

interface AlbumImgType {
  isLineOver: boolean;
}

const UserAlbumImg = styled.img<AlbumImgType>`
  margin-top: 1vw;
  width: ${(props) => (props.isLineOver ? "15vw" : "17vw")};
  height: ${(props) => (props.isLineOver ? "15vw" : "17vw")};
`;

const UserAlbumName = styled.h2<AlbumImgType>`
  width: 90%;
  font-weight: 800;
  font-size: ${(props) => (props.isLineOver ? "6px" : "14px")};
`;

const UserAlbumDescription = styled.div`
  margin-bottom: 1vw;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 1%;
  left: 91%;
  cursor: pointer;
`;

export default UserAlbumBox;
