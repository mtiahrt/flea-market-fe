import * as React from 'react';
import { useEffect, useState } from 'react';
import ImagesTile from './ImagesTile';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM_IMAGE } from '../queries/graphQL';
import { deleteImageFromS3 } from '../Components/ModifyItems/Utilities';

const PreviewImages = ({ fileDataURL: urls }) => {
  const [deleteItemImage, { deleteImageData, deleteImageLoading, deleteImageError }] = useMutation(DELETE_ITEM_IMAGE);
  const [fileDataURL, setFileDataURL] = useState([]);

  useEffect(() => {
    if (urls) {
      setFileDataURL(urls);
    }
  }, [urls]);

  function handleOnChangeForImages(changeEvent) {
    if (changeEvent.target.files.length) {
      const maxId = fileDataURL.length ? Math.max(...fileDataURL.map(i => i.id)) : 0;
      Array.from(changeEvent.target.files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          const result = { url: e.target.result };
          if (result.url) {
            result.id = maxId + ++index;
            setFileDataURL(prev => [...prev, result]);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  }

  const deleteImage = (publicId, imageId) => {
    const promises = [];
    promises.push(deleteImageFromS3(publicId));
    promises.push(deleteItemImage({
      variables: { id: imageId }
    }));
    Promise.all(promises).then(setFileDataURL(prev => prev.filter(item => item.id !== imageId)));
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
    </>);
};

export default PreviewImages;