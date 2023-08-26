import React from 'react';
import styled from 'styled-components';

function Home() {
  return (
    <>
      <StyledUL>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-ahmed-%C3%A3%C2%83%C2%84-13159182.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-alina-matveycheva-17289658.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-anastasiia-chaikovska-15385901.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-anastasiya-lobanovskaya-1035683.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-angela-roma-7318959.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-atef-khaled-1726496.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-david-yohanes-1450903.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-elias-de-carvalho-1006999.jpg"></StyledIMG>
        </StyledLI>
      </StyledUL>
      <StyledDiv>
        <StyledSpan>100s of Different Products Added Daily!</StyledSpan>
        <StyledSpan>Up to 70% Off of Retail!!!!</StyledSpan>
      </StyledDiv>
      <StyledUL>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-emmanuel-ikwuegbu-9720924.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-evg-kowalievska-1381553.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-godisable-jacob-914668.jpg"></StyledIMG>
        </StyledLI>
      </StyledUL>
      <div>Add different categories here</div>
    </>
  );
}

export default Home;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  font-size: var(--font-size-4);
  margin-top: 3rem;
  margin-bottom: 4rem;
  background-color: var(--logo-background-color);
  height: 6rem;
`;

const StyledSpan = styled.span``;
const StyledUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
`;

const StyledLI = styled.li`
  height: 25vh;
  flex-grow: 1;
`;

const StyledIMG = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;
