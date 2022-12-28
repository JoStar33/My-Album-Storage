import React from 'react';
import styled from 'styled-components';

type propsType = {
  text: string,
  dialogController: (dialogStatus: boolean) => void,
};

const TextDialog: React.FC<propsType> = ({ text, dialogController }) => {
  const closeDialog = () => {
    dialogController(false);
  }
  return (
    <DialogBackground>
      <DialogContainer>
        <DefaultCloseBtn onClick={ closeDialog }></DefaultCloseBtn>
        <DialogText>
          {text}
        </DialogText>
      </DialogContainer>
    </DialogBackground>
  );
};

export default TextDialog;

const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const DialogBackground = styled(Centering)`
position: absolute;
background-color: rgba(0, 0, 0, 0.4);
width: 100vw;
height: 100vh;
top: 0;
left: 0;
`;

const DialogContainer = styled(Centering)`
position: relative;
background-color: white;
border-radius: 20px;
width: 400px;
height: 300px;
`;

const DefaultCloseBtn = styled.div`
cursor: pointer;
border: 5px solid black;
position: absolute;
bottom: 90%;
left: 94%;
background-color: white;
border-radius: 100px;
width: 50px;
height: 50px;
`;

const DialogText = styled(Centering)`
font-weight: 800;
`;
