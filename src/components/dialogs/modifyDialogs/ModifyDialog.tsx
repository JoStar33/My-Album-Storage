import React, { useState } from "react";
import { asyncPatchAlbumFetch, asyncGetAlbumFetch } from "../../../store/album";
import { userAlbumType } from "../../../types/album";
import { AppDispatch, RootState } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import ScoreDialogForm from "@/components/forms/commonForms/ScoreDialogForm";

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
