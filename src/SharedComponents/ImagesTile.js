import './ImagesTile.css';

const ImagesTile = ({ fileDataURL, deleteHandler, allowDelete }) => {

  console.log('file urls Images Tile got was', fileDataURL);
  return (
    <div className='image-container'>
      {fileDataURL.map(item => {
        return (
          <article className="image-item">
            <img src={item.url} alt='something' />
            {allowDelete &&
              <a data-item-image-id={item.id} data-public-id={`my-uploads/${item.publicId}`}
                       onClick={deleteHandler}
                       href='#' className='close'>X</a>
            }
          </article>
        );
      })}
    </div>
  );
};

export default ImagesTile;