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
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-ricardo-acevedo-1375736.jpg"></StyledIMG>
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
        <li></li>
      </StyledUL>
      <StyledDiv>
        <StyledSpan>100s of Different Products Added Daily!</StyledSpan>
        <StyledSpan>Up to 70% Off of Retail!!!!</StyledSpan>
      </StyledDiv>
      <StyledUL>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-the-glorious-studio-10983783.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-lil-artsy-1374128.jpg"></StyledIMG>
        </StyledLI>
        <StyledLI>
          <StyledIMG src="https://flea-market-images.s3.us-west-2.amazonaws.com/pexels-superlens-photography-11203750.jpg"></StyledIMG>
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

const StyledSpan = styled.span`
  font-size: var(--font-size-5);
`;
const StyledUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  //li:last-child {
  //  flex-grow: 10;
  //}
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
