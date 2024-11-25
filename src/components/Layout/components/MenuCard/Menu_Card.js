// components/MenuCard.js
import React from "react";
import { Link } from "react-router-dom";

const MenuCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <div className="card">
          <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
            // style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title"><strong>{product.title}</strong></h5>
            <h5 className="card-text">
              Price: {product.price.toLocaleString()}₫
            </h5>
            <h5 className="card-text">
              Brand: {product.brand}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuCard;
