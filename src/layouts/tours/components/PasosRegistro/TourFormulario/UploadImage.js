import React, { useState, useRef } from "react";
// import axios from "axios";
import API from "Environment/config";

import { validarImagen } from "Environment/utileria";
// import Icon from '@mui/material/Icon';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import alertify from "alertifyjs";

const UploadImage = ({ initialImage, image = null, setImage }) => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [mainImage, setMainImage] = useState(initialImage || "");

  const quitar = (event) => {
    event.preventDefault();
    fileInputRef.current.value = null;
    setImage(null);
    setMainImage(initialImage);
  };

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];

    if (!validarImagen(event, file)) return;

    setImage(event.target.files[0]);
    // setSelectedFile(event.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    // formData.append("image", selectedFile);
    formData.append("image", image);

    const jsonTours = await API.post(`/aws/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(JSON.stringify(jsonTours));
  };

  return (
    <div className="text">
      Imagen{" "}
      <input
        accept="image/*"
        ref={fileInputRef}
        type="file"
        // disabled={true}
        title="Disponible pronto."
        onChange={fileSelectedHandler}
      />{" "}
      <br></br>
      <img
        style={{
          // height: "10%",
          width: "30%",
          paddingLeft: "20px",
          // display: "block",
          // position: "absolute",
          // top: "150px",
          // left: "75%",
        }}
        src={mainImage}
      ></img>
      {image && (
        <DeleteForeverIcon onClick={quitar} style={{ cursor: "pointer" }}></DeleteForeverIcon>
      )}
      {/* <button onClick={fileUploadHandler}>Upload</button> */}
    </div>
  );
};

export default UploadImage;
