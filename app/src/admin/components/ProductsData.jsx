import React from "react";
import "./scss/productsData.scss";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const ProductsData = ({ action }) => {
  return (
    <div className="GridItem">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
        alt=""
      />
      <div className="content">
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio a natus
          sequi temporibus vero voluptates quisquam possimus aut dolore omnis
          esse laboriosam architecto praesentium, officiis, nesciunt, quaerat
          illum tempore error!
        </p>
        <div className="bottom">
          <h4>categorie</h4>
          <div className="btn">
            <i title="Order Now" className="fa-solid fa-bag-shopping"></i>
            <i
              title="Delete This Product"
              className="fa-solid fa-trash icon delete"
            ></i>
            <i
              title="Edit This Product"
              className="fa-solid fa-pen-to-square icon edit"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsData;
