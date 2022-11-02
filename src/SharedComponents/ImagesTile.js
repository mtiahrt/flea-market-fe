import styled from 'styled-components';
import './ImagesTile.css';

const ImagesTile = ({ fileDataURL, deleteHandler, allowDelete }) => {

  console.log('file urls Images Tile got was', fileDataURL);
  return (
    <div className='image-container'>
      {fileDataURL.map(item => {
        return (
          <div className="image-item">
            {allowDelete &&
              <StyledA data-item-image-id={item.id} data-public-id={`my-uploads/${item.publicId}`}
                       onClick={deleteHandler}
                       href='#' className='close'>X</StyledA>
            }
            <img src={item.url} alt='something' />
          </div>
        );
      })}
    </div>
  );
};

export default ImagesTile;
const StyledA = styled.a`
  position: relative;
  //top: 5%;
  //right: 2%;
  opacity: 0.4;
  font-size: 25px;
  //color: #333;
  color: firebrick;

  &:hover {
    opacity: 8;
  }

  &before, &after {
    position: absolute;
    left: 15px;
    content: '';
    width: 10px;
    height: 20px;
    background-color: #333;
  }

  &before {
    transform: rotate(45deg);
  }

  &after {
    transform: rotate(-45deg);
  }
`;