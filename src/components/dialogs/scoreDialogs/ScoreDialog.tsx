import React, { useState } from "react";
import { AppDispatch } from "../../../store/index";
import { useDispatch } from "react-redux";
import { setIsSelected } from "../../../store/album";
import { albumType } from "../../../types/album";
import ScoreDialogForm from "@/components/forms/commonForms/ScoreDialogForm";

type scoreDialogType = {
  scoreAlbum: albumType;
  isOpened: boolean;
};

type propsType = {
  selectedAlbums: albumType[];
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>;
  scoreDialog: scoreDialogType;
  setScoreDialog: React.Dispatch<React.SetStateAction<scoreDialogType>>;
};

const ScoreDialog: React.FC<propsType> = ({
  scoreDialog,
  selectedAlbums,
  setScoreDialog,
  setSelectedAlbums,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [scoreVaildateText, setScoreVaildateText] = useState(``);
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreVaildateText(``);
    setScoreDialog({
      ...scoreDialog,
      scoreAlbum: {
        ...scoreDialog.scoreAlbum,
        score: parseInt(e.target.value),
      },
    });
  };
  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setScoreDialog({
      ...scoreDialog,
      scoreAlbum: {
        ...scoreDialog.scoreAlbum,
        description: e.target.value,
      },
    });
  };
  const applyScore = () => {
    if(typeof scoreDialog.scoreAlbum.score === "string") {
      setScoreVaildateText(`점수를 입력하세요!`);
      return;
    }
    //스코어의 값이 1~100사이의 값이 아니라면
    (scoreDialog.scoreAlbum.score <= 0 ||
    scoreDialog.scoreAlbum.score > 100 )
      ? setScoreVaildateText(`점수는 1부터 100까지만 입력이 가능합니다.`)
      : dispatch(
        setIsSelected({ key: scoreDialog.scoreAlbum.key, isSelected: true })
      )
    !selectedAlbums.find(
      (selectedAlbum) => selectedAlbum.key === scoreDialog.scoreAlbum.key
    )
      ? pushScoreAlbum()
      : updateSeletedAlbum();
  };
  const pushScoreAlbum = () => {
    setSelectedAlbums([...selectedAlbums, scoreDialog.scoreAlbum]);
    setScoreDialog({ ...scoreDialog, isOpened: false });
  };
  const updateSeletedAlbum = () => {
    const updatedSelectedAlbums = selectedAlbums.map((selectedAlbum) =>
      selectedAlbum.key === scoreDialog.scoreAlbum.key
        ? scoreDialog.scoreAlbum
        : selectedAlbum
    );
    setSelectedAlbums(updatedSelectedAlbums);
    setScoreDialog({ ...scoreDialog, isOpened: false });
  };
  const closeDialog = () => {
    setScoreDialog({ ...scoreDialog, isOpened: false });
  };
  return (
    <ScoreDialogForm
      album={scoreDialog.scoreAlbum}
      handleChangeDescription={handleChangeDescription}
      handleChangeScore={handleChangeScore}
      scoreVaildateText={scoreVaildateText}
      applyScore={applyScore}
      closeDialog={closeDialog}
    ></ScoreDialogForm>
  );
};

export default ScoreDialog;
