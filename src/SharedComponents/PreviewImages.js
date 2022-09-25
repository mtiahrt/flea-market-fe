import * as React from 'react';
import { useEffect, useState } from 'react';
import ImagesTile from './ImagesTile';
import cloudinary from 'cloudinary/lib/cloudinary';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM_IMAGE } from '../queries/graphQL';

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

const PreviewImages = ({fileDataURL: urls}) => {
  const [deleteItemImage, { deleteImageData, deleteImageLoading, deleteImageError }] = useMutation(DELETE_ITEM_IMAGE);

  useEffect(() => {
    if(urls){
      setFileDataURL(urls)
    }
  },[]);
  const [fileDataURL, setFileDataURL] = useState([]);

  function handleOnChangeForImages(changeEvent) {
    if (changeEvent.target.files.length) {
      Array.from(changeEvent.target.files).forEach(file => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          const { result } = e.target;
          if (result) {
            setFileDataURL(prev => [...prev, result]);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  }

  const deleteImage = e => {
    const id = Number(e.target.getAttribute('data-item-image-id'));
    const publicId = e.target.getAttribute('data-public-id');
    const promises = [];
    promises.push(cloudinary.v2.uploader.destroy(publicId, function(error, result) {
      console.log(result, error);
    }));
    promises.push(deleteItemImage({
      variables: { id }
    }));
    Promise.all(promises).then(setFileDataURL(prev => prev.filter(item => item.id !== id)))
  };

  return (
    <>
      <p>
        <input type='file'
               accept='.png, .jpg, .jpeg'
               onChange={handleOnChangeForImages}
               multiple name='imageFile' />
      </p>
      <ImagesTile allowDelete={true} deleteHandler={deleteImage} fileDataURL={fileDataURL} />
    </>
  );
};

export default PreviewImages;