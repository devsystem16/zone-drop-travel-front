import React, { useState } from "react";
import "./Collage.css";
import axios from "axios";
import API from "Environment/config";
import Icon from "@mui/material/Icon";

const Collage = ({ initialMainImage, initialThumbnailImages }) => {
  const [mainImage, setMainImage] = useState(initialMainImage || "");
  const [thumbnailImages, setThumbnailImages] = useState(initialThumbnailImages || []);

  const [portada, setPortada] = useState(null);
  const [miniaturas, setMiniaturas] = useState([]);
  const handleMainImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPortada(event.target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCollage = async (idTour) => {
    try {
      const formData = new FormData();
      formData.append("mainImage", portada);

      for (let i = 0; i < miniaturas.length; i++) {
        formData.append("thumbnailImages[]", miniaturas[i]);
      }

      // thumbnailImages.forEach((image, index) => {
      //   formData.append(`thumbnailImages[]`, image);
      // });

      const response1 = await API.post(`/image/upload/tour/16`, formData);

      console.log(response1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleThumbnailImagesChange = (event) => {
    const files = event.target.files;

    setMiniaturas(event.target.files);

    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setThumbnailImages([...thumbnailImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailImageDelete = (index) => {
    const newImages = [...thumbnailImages];
    newImages.splice(index, 1);
    setThumbnailImages(newImages);
  };

  return (
    <div className="collage">
      <div>
        <button onClick={handleSaveCollage}>Enviar</button>
        <label htmlFor="main-image">Portada</label>
        <input type="file" id="main-image" onChange={handleMainImageChange} />
        {mainImage && <img src={mainImage} className="main-img" alt="" />}
      </div>
      <div>
        <label htmlFor="thumbnail-images">Minuaturas</label>
        <input
          type="file"
          name="thumbnailImages[]"
          id="thumbnail-images"
          onChange={handleThumbnailImagesChange}
          multiple
        />
        <div className="thumbnails">
          {thumbnailImages.map((image, index) => (
            <div key={"imageMinio" + index} className="thumbnail-container">
              <img src={image} className="thumbnail" alt="" />
              <Icon
                className="thumbnail-icon-delete"
                onClick={() => handleThumbnailImageDelete(index)}
              >
                delete
              </Icon>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collage;
