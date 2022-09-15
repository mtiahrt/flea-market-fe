import { ImageList, ImageListItem } from '@mui/material';
import * as React from 'react';

const ImagesTile = ({ fileDataURL }) => {
  console.log('file urls Images Tile got was', fileDataURL);
  return (
    <ImageList cols={2} rowHeight={164}>
      {fileDataURL?.map((item, index) => (
        <ImageListItem key={`images${index}`}>
          <img
            src={item.url ? item.url : item}
            alt={'item' + index}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesTile;