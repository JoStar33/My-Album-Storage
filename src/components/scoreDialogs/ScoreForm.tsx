import React from 'react';
import '../../styles/fire_font.css';
import styled from 'styled-components';

type propsType = {
  score: number
};

const ScoreForm: React.FC<propsType> = ({score}) => {
  const scoreType = (): number => {
    if(score < 20) {
      return 1;
    }
    if(score < 60) {
      return 2;
    }
    if(score < 80) {
      return 3;
    }
    if(score < 100) {
      return 4;
    }
    return 0;
  };
  return (
    <div>
      { 
        scoreType() === 4 &&  
          <h1 className="blazing">
            {score}
          </h1>
      }
      { 
        scoreType() === 1 &&  
          <h1 className="frozen">
            {score}
          </h1>
      }
      {
        scoreType() === 2 &&
          <ScoreStyle color='green'>
            {score}
          </ScoreStyle>
      }
      {
        scoreType() === 3 &&
          <ScoreStyle color='orange'>
            {score}
          </ScoreStyle>
      }
      {
        scoreType() === 0 &&
          <ScoreStyle color='black'>
            점수는?
          </ScoreStyle>
      }
    </div>
  );
};

interface scoreColorType {
  color: string;
};

const ScoreStyle = styled.div<scoreColorType>`
text-align: center;
font-weight: 800;
color: ${(props) => { 
  return props.color;
}};
margin: 20px;
font-size: 40px;
vertical-align: middle;
`;

export default ScoreForm;