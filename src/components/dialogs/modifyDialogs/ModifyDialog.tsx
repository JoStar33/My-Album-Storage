import React, { useState } from "react";
import { asyncPatchAlbumFetch, asyncGetAlbumFetch } from "../../../store/album";
import { userAlbumType } from "../../../types/album";
import { AppDispatch, RootState } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import ScoreDialogForm from "../../../components/forms/commonForms/ScoreDialogForm";

type dialogType = {
  modifyAlbum: userAlbumType;
  isOpened: boolean;
};

type propsType = {
  modifyDialog: dialogType;
  setModifyDialog: React.Dispatch<React.SetStateAction<dialogType>>;
};

const ModifyDialog: React.FC<propsType> = ({
  setModifyDialog,
  modifyDialog,
}) => {
  const { user } = useSelector((state: RootState) => state.userStore);
  const dispatch = useDispatch<AppDispatch>();
  const [scoreVaildateText, setScoreVaildateText] = useState(``);
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreVaildateText(``);
    if (parseInt(e.target.value) > 100 ) {
      e.target.value = '99';
      setScoreVaildateText(`점수는 0부터 100까지만 입력이 가능합니다.`);
      return;
    }
    if (parseInt(e.target.value) < 0){
      e.target.value = '1';
      setScoreVaildateText(`점수는 0부터 100까지만 입력이 가능합니다.`);
      return;
    }
    setModifyDialog({
      ...modifyDialog,
      modifyAlbum: {
        ...modifyDialog.modifyAlbum,
        score: parseInt(e.target.value),
      },
    });
  };
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setModifyDialog({
      ...modifyDialog,
      modifyAlbum: {
        ...modifyDialog.modifyAlbum,
        description: e.target.value,
      },
    });
  };
  const applyScore = async () => {
    if(isNaN(modifyDialog.modifyAlbum.score)) {
      setScoreVaildateText(`점수를 입력하세요!`);
      return;
    }
    //스코어의 값이 1~100사이의 값이 아니라면
    if(modifyDialog.modifyAlbum.score <= 0 || modifyDialog.modifyAlbum.score > 100 ) {
      setScoreVaildateText(`점수는 0부터 100까지만 입력이 가능합니다.`);
      return;
    }
    await dispatch(asyncPatchAlbumFetch(modifyDialog.modifyAlbum));
    dispatch(asyncGetAlbumFetch(user.id));
    setModifyDialog({ ...modifyDialog, isOpened: false });
  };
  const closeDialog = () => {
    setModifyDialog({ ...modifyDialog, isOpened: false });
  };
  return (
    <ScoreDialogForm
      album={modifyDialog.modifyAlbum}
      handleChangeDescription={handleChangeDescription}
      handleChangeScore={handleChangeScore}
      scoreVaildateText={scoreVaildateText}
      applyScore={applyScore}
      closeDialog={closeDialog}
    ></ScoreDialogForm>
  );
};

export default ModifyDialog;
