// import React from 'react';
// import ProductReviews from '../../components/Layout/components/Card_Detail/ProductReviews';
// const ProductDetail = ({ product }) => {
//   return (
//     <div>
//       <h1>{product.title}</h1>
//       <p>{product.description}</p>
//       <ProductReviews reviews={product.reviews} />
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from 'react';
import ProductReviews from '../../components/Layout/components/Card_Detail/ProductReviews';
const ProductDetail = () => {
  const [product, setProduct] = useState(null); // Khởi tạo product là null

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ API
    fetch('https://dummyjson.com/products/1')  // Thay đổi URL của bạn nếu cần
      .then((response) => response.json())
      .then((data) => setProduct(data)) // Đảm bảo lưu dữ liệu vào state
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  // Nếu product là null (chưa tải xong), hiển thị loading
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </div>
      {/* Truyền reviews vào component ProductReviews */}
      <ProductReviews reviews={product.reviews} />
    </div>
  );
};

export default ProductDetail;
