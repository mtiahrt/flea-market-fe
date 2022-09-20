import { ImageList, ImageListItem } from '@mui/material';
import styled from 'styled-components';

const ImagesTile = ({ fileDataURL, deleteHandler, allowDelete }) => {
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
          {allowDelete &&
            <StyledA onClick={deleteHandler} href='#' className='close'>X</StyledA>
          }
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesTile;

const StyledA = styled.a`
  position: absolute;
  top: 1%;
  right: 2%;
  opacity: 0.4;
  font-size: 25px;
  color: #333;
  &:hover{
    opacity: 8;
  }
  &before, &after{
    position: absolute;
    left: 15px;
    content: '';
    width: 10px;
    height: 20px;
    background-color: #333;
  }
  &before{
    transform: rotate(45deg);
  }
  &after{
    transform: rotate(-45deg);
  }
`;