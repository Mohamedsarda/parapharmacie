import React, { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseIcon from "@mui/icons-material/Close";
import "./scss/addProductForm.scss";

const AddProductForm = ({ closeProductForm }) => {
  const [file, setFile] = useState("");
  console.log(file);
  return (
    <div className="AddProductForm">
      <form>
        <CloseIcon onClick={closeProductForm} className="close" />
        <div className="left">
          <div className="row">
            <label>Product Name</label>
            <input type="text" />
          </div>
          <div className="__col">
            <div className="row">
              <label>New Price</label>
              <input type="Number" />
            </div>
            <div className="row">
              <label>Old Price</label>
              <input type="Number" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="row img">
            <label htmlFor="file">
              <img
                src={file ? URL.createObjectURL(file) : "../no-image.jpg"}
                alt=""
              />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <div className="row">
            <label>Description</label>
            <textarea name="" id="" cols="15" rows="10"></textarea>
          </div>
        </div>
        <div className="btn">
          <button>add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
