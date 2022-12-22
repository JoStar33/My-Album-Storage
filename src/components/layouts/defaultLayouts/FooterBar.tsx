import React from 'react';
import styled from 'styled-components';

const FooterBar: React.FC = () => {
  return (
    <FooterContainer>
      <div></div>
    </FooterContainer>
  );
};

export default FooterBar;

const FooterContainer = styled.div`
width: 100vw;
height: 7vh;
background-color: #91bef3;
display: flex;
justify-content: center;
align-items: center;
`;