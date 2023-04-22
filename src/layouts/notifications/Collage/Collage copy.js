import React, { useState } from "react";
import "./Collage.css";

const Collage = () => {
  const [mainImage, setMainImage] = useState("");
  const [thumbnailImages, setThumbnailImages] = useState([]);

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailImagesChange = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setThumbnailImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="collage">
      <div>
        <label htmlFor="main-image">Main Image</label>
        <input type="file" id="main-image" onChange={handleMainImageChange} />
        {mainImage && <img src={mainImage} className="main-img" alt="" />}
      </div>
      <div>
        <label htmlFor="thumbnail-images">Thumbnail Images</label>
        <input type="file" id="thumbnail-images" onChange={handleThumbnailImagesChange} multiple />
        <div className="thumbnails">
          {thumbnailImages.map((image, index) => (
            <img src={image} key={index} className="thumbnail" alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collage;
