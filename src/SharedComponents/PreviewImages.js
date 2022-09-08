import * as React from 'react';
import { useState } from 'react';
import ImagesTile from './ImagesTile';

const PreviewImages = () => {
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
  return (
    <>
      <p>
        <input type='file'
               accept='.png, .jpg, .jpeg'
               onChange={handleOnChangeForImages}
               multiple name='imageFile' />
      </p>
      <ImagesTile fileDataURL={fileDataURL} />
    </>
  );
};

export default PreviewImages;