import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../../styles/slider.css';

const RecommendAlbumForm: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const indexRef = useRef() as any;
  const callback = (): any => {
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
    indexRef.current = callback;
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
        <input type="radio" className='slider' name="slider" id="s1"/>
        <input type="radio" className='slider' name="slider" id="s2"/>
        <input type="radio" className='slider' name="slider" id="s3"/>
        <input type="radio" className='slider' name="slider" id="s4"/>
        <input type="radio" className='slider' name="slider" id="s5"/>
        <label htmlFor="s1" id="slide1">1</label>
        <label htmlFor="s2" id="slide2">2</label>
        <label htmlFor="s3" id="slide3">3</label>
        <label htmlFor="s4" id="slide4">4</label>
        <label htmlFor="s5" id="slide5">5</label>
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