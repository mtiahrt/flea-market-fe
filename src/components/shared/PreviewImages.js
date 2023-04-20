import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import ImagesTile from './ImagesTile';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM_IMAGE } from '../../queries/graphQL';
import { deleteImageFromS3 } from '../../utility-functions/images';
import { UserProfileContext } from '../../contexts/UserContext';

const PreviewImages = ({ fileDataURL: urls, clearImages }) => {
  const [
    deleteItemImage,
    { deleteImageData, deleteImageLoading, deleteImageError },
  ] = useMutation(DELETE_ITEM_IMAGE);
  const [fileDataURL, setFileDataURL] = useState([]);
  const { userProfile } = useContext(UserProfileContext);

  useEffect(() => {
    if (urls) {
      setFileDataURL(urls);
    }
  }, [urls]);

  useEffect(() => {
    if (clearImages) {
      removeImages();
    }
  }, [clearImages]);

  function handleOnChangeForImages(changeEvent) {
    if (changeEvent.target.files.length) {
      const maxId = fileDataURL.length
        ? Math.max(...fileDataURL.map((i) => i.id))
        : 0;
      Array.from(changeEvent.target.files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const result = { url: e.target.result };
          if (result.url) {
            result.id = maxId + ++index;
            setFileDataURL((prev) => [...prev, result]);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  }
  const imageIsNotLocal = (imageId) => {
    const image = fileDataURL.find((x) => x.id === imageId);
    const result = new URL(image.url);
    return result?.hostname ? true : false;
  };
  const removeImages = () => {
    setFileDataURL([]);
  };
  const deleteImage = (publicId, imageId) => {
    const promises = [];
    if (imageIsNotLocal(imageId)) {
      promises.push(deleteImageFromS3(publicId, userProfile.accessToken));
      promises.push(
        deleteItemImage({
          variables: { id: imageId },
        })
      );
    }
    Promise.all(promises).then(
      setFileDataURL((prev) => prev.filter((item) => item.id !== imageId))
    );
  };

  return (
    <>
      <p>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleOnChangeForImages}
          multiple
          name="imageFile"
        />
      </p>
      <ImagesTile
        allowDelete={true}
        deleteHandler={deleteImage}
        fileDataURL={fileDataURL}
      />
    </>
  );
};

export default PreviewImages;
