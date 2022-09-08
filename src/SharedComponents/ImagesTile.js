import { ImageList, ImageListItem } from '@mui/material';
import * as React from 'react';

const ImagesTile = ({ fileDataURL }) => {
  console.log('filedata', fileDataURL)
  return (
    <ImageList cols={3} rowHeight={164}>
      {fileDataURL?.map((item, index) => (
        <ImageListItem>
          <img
            src={item}
            alt={'item' + index}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesTile;