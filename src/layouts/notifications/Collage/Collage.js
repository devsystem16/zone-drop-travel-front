import React, { useState, useEffect } from "react";
import "./Collage.css";
import axios from "axios";
import API from "Environment/config";

import { validarImagen } from "Environment/utileria";

import Icon from "@mui/material/Icon";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import alertify from "alertifyjs";

const Collage = ({
  Thumbnails,
  setThumbnails,
  initialMainImage,

  setOpen,
  tourId,
}) => {
  const [mainImage, setMainImage] = useState(initialMainImage || "");
  const [portada, setPortada] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState(Thumbnails || []);
  const [nuevasImagenesCargadas, setNuevasImagenesCargadas] = useState([]);

  const [miniaturas, setMiniaturas] = useState([]);

  useEffect(() => {}, [mainImage]);

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];

    if (!validarImagen(event, file)) return;

    if (file) {
      setPortada(event.target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCollage = async () => {
    console.log("ÓRTADA", portada);
    console.log("miniaturas", miniaturas);

    try {
      const formData = new FormData();
      formData.append("mainImage", portada);

      for (let i = 0; i < miniaturas.length; i++) {
        formData.append("thumbnailImages[]", miniaturas[i]);
      }

      const response1 = await API.post(`/image/upload/tour/${tourId}`, formData);

      alertify.success("Guardado Correctamente."); // alert(JSON.stringify(response1.data));
      console.log(response1);
    } catch (error) {
      alertify.error("Ocurrió un error.");
      console.error(error);
    }
  };

  const Resetear = (event) => {
    event.target.value = null;
    setThumbnailImages([]);
    setNuevasImagenesCargadas([]);
    setMiniaturas([]);
  };

  const handleThumbnailImagesChange = (event) => {
    const files = event.target.files;
    // setThumbnailImages([]);
    // setNuevasImagenesCargadas([]);
    setMiniaturas(event.target.files);

    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // if (!validarImagen(event, file)) {
      //   setMiniaturas([]);
      //   return;
      // }

      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setThumbnailImages([...thumbnailImages, ...newImages]); // Precargar Imagens ya almacenadas
          setNuevasImagenesCargadas([...nuevasImagenesCargadas, ...newImages]); // Nuevas imagenes a Añadir.
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarFromS3 = async (id) => {
    const nuevasImagenes = Thumbnails.filter((imagen) => imagen.id !== id);
    setThumbnails(nuevasImagenes);
    const response1 = await API.post(`/image/delete/${id}`, {});

    if (response1.data.codigo !== 200) alertify.error("Ocurrió un error.");
    alertify.success("Imagen eliminada correctamente.");
  };

  const eliminarWithoutS3 = (id) => {
    const newImages = [...nuevasImagenesCargadas];
    newImages.splice(id, 1);
    setNuevasImagenesCargadas(newImages);

    const newImages1 = [...miniaturas];
    newImages1.splice(id, 1);
    setMiniaturas(newImages1);
  };
  const handleThumbnailImageDelete = async (id) => {
    alertify
      .confirm(
        "",
        `La imagen se eliminará permanentemente ¿Está seguro?`,
        function async() {
          eliminarFromS3(id);
        },
        function () {}
      )
      .set("labels", { ok: "Si, eliminar", cancel: "Cancelar" });
  };

  return (
    <div className="collage">
      <div>
        <label htmlFor="main-image">Portada</label>
        <input accept="image/*" type="file" id="main-image" onChange={handleMainImageChange} />
        {mainImage && <img src={mainImage} className="main-img" alt="" />}
      </div>
      <div>
        <label htmlFor="thumbnail-images">Minuaturas</label>
        <input
          onClick={Resetear}
          accept="image/*"
          type="file"
          name="thumbnailImages[]"
          id="thumbnail-images"
          onChange={handleThumbnailImagesChange}
          multiple
        />
        <div className="thumbnails">
          {/* {miniaturas.map((image, index) => (
            <div key={"imageMinio" + index} className="thumbnail-container">
              <img src={image} className="thumbnail" alt="" />
              <Icon
                className="thumbnail-icon-delete"
                onClick={() => handleThumbnailImageDelete(index)}
              >
                delete
              </Icon>
            </div>
          ))} */}

          {Thumbnails.map((miniatura, index) => (
            <div key={"imageMinio" + index} className="thumbnail-container">
              <img src={miniatura.paths3} className="thumbnail" alt="" />
              <Icon
                className="thumbnail-icon-delete"
                onClick={() => handleThumbnailImageDelete(miniatura.id)}
              >
                delete
              </Icon>
            </div>
          ))}

          {nuevasImagenesCargadas.map((miniatura, index) => (
            <div key={"imageMinio" + index} className="thumbnail-container nueva">
              <img src={miniatura} className="thumbnail" alt="" />
              <Icon className="thumbnail-icon-delete" onClick={() => eliminarWithoutS3(index)}>
                delete
              </Icon>
            </div>
          ))}
        </div>
      </div>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button autoFocus onClick={() => handleSaveCollage()}>
          Guardar
        </Button>
      </DialogActions>
    </div>
  );
};

export default Collage;
