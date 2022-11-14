import './ImagesTile.css';
import styled from 'styled-components';

const ImagesTile = ({ fileDataURL, deleteHandler, allowDelete }) => {
  console.log('file urls Images Tile got was...', fileDataURL);
  return (
    <div className='image-container'>
      {fileDataURL.map(item => {
        return (
          <article key={`imageKey${item.id}`} className='image-item'>
            <StyledImg src={item.url} alt='something' />
            {allowDelete &&
              <a data-item-image-id={item.id} data-public-id={`my-uploads/${item.publicId}`}
                 onClick={deleteHandler}
                 href='#' className='close image-delete'>X</a>
            }
          </article>
        );
      })}
    </div>
  );
};

export default ImagesTile;

const StyledImg = styled.img`
  max-width: 100%;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;