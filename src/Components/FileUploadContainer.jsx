import React, { useContext, useState } from 'react';
import { storage } from '../utils/FireBase';
import CanvasComponent from './CanvasComponent';

export const FileUploadContainer = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [uploadedImage, setuploadedImage] = useState();

  const uploadImageToFirebase = (file) => {
    const imageName = Math.random() * 1000 + '';
    const uploadTask = storage.ref(`/images/${imageName}`).put(file);
    //initiates the firebase side uploading
    uploadTask.on('state_changed', () => { }, () => { }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref('images')
        .child(imageName)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setuploadedImage(fireBaseUrl);
        });
    });
  };

  const onImageChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0] || selectedImage;
    console.log(file);
    const { type } = file;
    if (
      type.endsWith('jpeg') ||
      type.endsWith('png') ||
      type.endsWith('jpg') ||
      type.endsWith('gif')
    ) {
      setSelectedImage(file);
      uploadImageToFirebase(file);
    }
  };
  return (
    <div>
      <div >
        {uploadedImage ? <CanvasComponent imageUrl={uploadedImage} /> : null}
        <p>Upload Image</p>
        <input
          type="file"
          tabIndex="0"
          multiple=""
          accept=".jpg,.jpeg,.png,.gif"
          aria-label="Change Image"
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};
export default FileUploadContainer;
