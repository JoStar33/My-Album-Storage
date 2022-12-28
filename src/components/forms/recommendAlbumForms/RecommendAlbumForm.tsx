import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../../../styles/slider.css';

const RecommendAlbumForm: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const indexRef = useRef() as any;
  const checkSliderIndex = (): any => {
    setSliderIndex(sliderIndex + 1);
    const sliderInputparts = document.getElementsByClassName("slider");
    if(sliderIndex === 0) {
      (sliderInputparts[4] as HTMLInputElement).checked = false;
      (sliderInputparts[sliderIndex] as HTMLInputElement).checked = true;
      return;
    }
    (sliderInputparts[sliderIndex - 1] as HTMLInputElement).checked = false;
    (sliderInputparts[sliderIndex] as HTMLInputElement).checked = true;
    if(sliderIndex === 4) {
      setSliderIndex(0);
    }
  };
  useEffect(() => {
    indexRef.current = checkSliderIndex;
  });
  useEffect(() => {
    const sliderInputparts = document.getElementsByClassName("slider");
    (sliderInputparts[sliderIndex] as HTMLInputElement).checked = true;
    const timer = setInterval(() => {
      indexRef.current();
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <RecommendAlbumFormContainer>
      <section id="slider">
        {
          new Array(5).fill(1).map((_, index) => {
            return <input key={index} type="radio" className='slider' name="slider" id={`s${index + 1}`} onChange={() => setSliderIndex(index)}/>
          })
        }
        {
          new Array(5).fill(1).map((_, index) => {
            return <label key={index} htmlFor={`s${index + 1}`} id={`slide${index + 1}`} onClick={() => setSliderIndex(index)}></label>
          })
        }
      </section>
    </RecommendAlbumFormContainer>
  );
};

const RecommendAlbumFormContainer = styled.div`
width: 90vw;
height: 50vh;
margin: 0;
display: flex;
justify-content: center;
align-items: center;
user-select: none;
font-family: sans-serif;
`;

export default RecommendAlbumForm;