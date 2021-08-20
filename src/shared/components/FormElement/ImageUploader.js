import React, { useEffect, useState } from "react";
import "./ImageUploader.css";
function ImageUploader(props) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!image) return;
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.readAsDataURL(image);
  }, [image]);

  const pickerHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setImage(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      fileIsValid = false;

      setIsValid(false);
    }
    props.onInputs(props.id, pickedFile, fileIsValid);
  };
  return (
    <div className="mb-3 image_input">
      <input
        className="form-control"
        type="file"
        id={props.id}
        accept=".jpg,.jpeg,.png"
        onChange={pickerHandler}
      />
      <div className="image_preview">
        {previewUrl ? (
          <img className="user_image" src={previewUrl} alt="" />
        ) : (
          <p>Please pick an image</p>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
