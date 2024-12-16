import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductReviews from '../../components/Layout/components/Card_Detail/ProductReviews';
import { Add_To_Card_Menu } from '../../components/Function/Card_Funci/Card_Funci';
import Style from "../../components/Layout/components/Card/Card.module.css";
import Context from "../../Context/Context";
import { useContext } from 'react';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useContext(Context);

  const handleAddToCart = () => {
    Add_To_Card_Menu({ product, cart, setCart });
  };

  useEffect(() => {
    // Giả lập API để lấy thông tin sản phẩm theo id
    fetch(`http://localhost:8082/product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Cột hình ảnh */}
        <div className="col-md-4 text-center">
          <img
            src={product.img || "default-image.jpg"}
            alt={product.name || "No name available"}
            className="img-fluid rounded shadow-sm border"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>

        {/* Cột thông tin sản phẩm */}
        <div className="col-md-8">
          <h1 className="fw-bold mb-3">{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <h5 className="text-danger mb-3">
            <b>Price: </b>{product.price.toLocaleString()}₫
          </h5>
          <h5 className="mb-4">
            <b>Stock: </b>
            {product.stock > 0 ? (
              <span className="text-success">In Stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </h5>
          <button className="btn btn-warning btn-lg" onClick={handleAddToCart}>
            <i className="bi bi-bag-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
