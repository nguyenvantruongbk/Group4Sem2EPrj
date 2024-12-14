import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import ProductReviews from '../../components/Layout/components/Card_Detail/ProductReviews';
import { Add_To_Card } from '../../components/Function/Card_Funci/Card_Funci';
import Style from "../../components/Layout/components/Card/Card.module.css"
import Context from "../../Context/Context";
import { useContext } from 'react';

const ProductDetail = (props) => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const {cart,setCart} = useContext(Context);
  const iteam = props.iteam

  const handleAddToCart = () => {
      
      Add_To_Card({props:iteam,cart,setCart})
  };
  useEffect(() => {
    // Gọi API với id linh hoạt
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, [id]); // Thêm id vào dependencies của useEffect

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: '300px',
                     display: 'block',
                     marginLeft: 'auto',
                     marginTop: '-26px',
                     marginRight:'-10px',
                     width: '250px',
                     border: '1px solid orange'
                    }}
          />
        </div>
        <div className="col-md-5">
          <h1>{product.title}</h1>
          <h5 style={{padding: '5px'}}>{product.description}</h5>
          <h5><b>Price: </b>{product.price.toLocaleString()}₫</h5>
          <h5><b>Brand: </b>{product.brand}</h5>
                          <div className={Style.Card_Defaul_Conten_Button_Add_to_Card} >
                              <button onClick={handleAddToCart}><i class="bi bi-bag-plus"></i></button>
                          </div>
        </div>
        <ProductReviews reviews={product.reviews || []} />
      </div>
    </div>
  );
};

export default ProductDetail;
