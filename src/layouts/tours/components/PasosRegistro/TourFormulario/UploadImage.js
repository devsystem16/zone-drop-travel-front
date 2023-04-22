import React, { useState } from "react";
// import axios from "axios";
import API from "Environment/config";

const UploadImage = ({ image = null, setImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setImage(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const jsonTours = await API.post(`/aws/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(JSON.stringify(jsonTours));

    // axios
    //   .post(
    //     "http://dropzonetravel-web-back2023.test/api/aws/image/upload",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="text">
      Imagen <input type="file" onChange={fileSelectedHandler} />
      {/* <button onClick={fileUploadHandler}>Upload</button> */}
    </div>
  );
};

export default UploadImage;
