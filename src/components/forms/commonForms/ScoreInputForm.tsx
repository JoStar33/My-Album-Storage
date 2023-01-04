import React from "react";
import { GrScorecard } from "react-icons/gr";
import styled from "styled-components";

type propsType = {
  scoreVaildateText: string;
  handleChangeScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ScoreInputForm: React.FC<propsType> = ({
  scoreVaildateText,
  handleChangeScore,
}) => {
  return (
    <ScoreBox>
      <GrScorecard size={24}></GrScorecard>
      <ScoreText>나의 점수는?</ScoreText>
      <ScoreInputBox>
        <Score
          placeholder="점수를 입력해 주세요."
          min={1}
          max={100}
          name="score"
          onChange={handleChangeScore}
        ></Score>
        <ScoreValidateText>{scoreVaildateText}</ScoreValidateText>
      </ScoreInputBox>
    </ScoreBox>
  );
};

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ScoreText = styled.div`
  margin-right: 20px;
  font-weight: 800;
`;

const Score = styled.input`
  padding: 10px;
  border-radius: 10px;
  outline: none;
`;

const ScoreInputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScoreValidateText = styled.div`
  font-size: x-small;
  color: red;
`;

export default ScoreInputForm;
