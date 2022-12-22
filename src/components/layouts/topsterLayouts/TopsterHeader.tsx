import React from 'react';
import styled from 'styled-components';

//탑스터 형태변환(10x10 or 5x5), 내가 담고있는 탑스터 리스트(최대 5개)를 불러와 변경이 가능하게 해주는 기능.
const TopsterHeader: React.FC = () => {
  return (
    <TopsterHeaderContainer>
      
    </TopsterHeaderContainer>
  );
};

const TopsterHeaderContainer = styled.div`
width: 100vw;
height: 9vh;
margin-bottom: 1vh;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
`;

export default TopsterHeader;