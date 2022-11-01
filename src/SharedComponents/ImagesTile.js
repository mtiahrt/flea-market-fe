import styled from 'styled-components';
import './ImagesTile.css';

const ImagesTile = ({ fileDataURL, deleteHandler, allowDelete }) => {

  console.log('file urls Images Tile got was', fileDataURL);
  return (
    <div className='image-container'>
      {fileDataURL?.reduce((prev, curr, index, arr) => {
        if (index % 2 === 0) {
          prev.push(
            (<div className='row'>
                <img src={curr.url ? curr.url : curr}
                     alt={'item' + index}
                     loading='lazy'
                />
                <img src={arr[index + 1]?.url ? arr[index + 1]?.url : ""}
                     alt={'item' + index}
                     loading='lazy'
                />
              </div>
            )
          );
          return prev;
        }
        return prev;
      }, [])}
    </div>
  );
  //       {allowDelete &&
  //         <a data-item-image-id={item.id} data-public-id={`my-uploads/${item.publicId}`} onClick={deleteHandler}
  //            href='#' className='close'>X</a>
  //       }
};

export default ImagesTile;
// const StyledDivContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   padding: 0 4px;
//
//   @media (max-width: 768px) {
//     flex: 50%;
//     max-width: 50%;
//   }
//   @media (max-width: 425px){
//     flex: 100%;
//     max-width: 100%;
//   }
// `
//
// const StyledDivColumn = styled.div`
//   flex: 25%;
//   max-width: 25%;
//   padding: 0 4px;
// `
//
// const StyledImg = styled.img `
//   margin-top: 8px;
//   vertical-align: middle;
//   width: 100%;
// `
//
// const StyledA = styled.a`
//   position: absolute;
//   top: 1%;
//   right: 2%;
//   opacity: 0.4;
//   font-size: 25px;
//   color: #333;
//   &:hover{
//     opacity: 8;
//   }
//   &before, &after{
//     position: absolute;
//     left: 15px;
//     content: '';
//     width: 10px;
//     height: 20px;
//     background-color: #333;
//   }
//   &before{
//     transform: rotate(45deg);
//   }
//   &after{
//     transform: rotate(-45deg);
//   }
// `;