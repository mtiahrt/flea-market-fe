import { ImageList, ImageListItem } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

const ImagesTile = ({ fileDataURL, deleteHandler }) => {
  console.log('file urls Images Tile got was', fileDataURL);
  return (
    <ImageList cols={2} rowHeight={164}>
      {fileDataURL?.map((item, index) => (
        <ImageListItem key={`${item.publicId}`}>
          <img
            src={item.url ? item.url : item}
            alt={'item' + index}
            loading='lazy'
          />
          <StyledSpan data-public-id={item.publicId} itemID={item.id} onClick={deleteHandler}
                      className='removeitem'>X</StyledSpan>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesTile;

const StyledSpan = styled.span`
  position: absolute;
  top: 3%;
  right: 2%;
  color: aliceblue;
  cursor: pointer;
  display: block;
`;