import React from "react";
import { Link } from "react-router-dom";

const MenuCard = ({ product }) => {
  return (
    <div
      style={{
        width: "100%", // Chiều rộng 100% theo bố cục cha
        maxWidth: "300px", // Chiều rộng tối đa cho mỗi thẻ (cố định)
        margin: "0 auto", // Căn giữa thẻ
      }}
    >
      <Link to={`/product/${product.productId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Hiển thị theo chiều dọc
            justifyContent: "space-between",
            height: "100%", // Đảm bảo đồng nhất chiều cao thẻ
            border: "1px solid #ddd", // Đường viền nhạt
            borderRadius: "5px", // Bo góc nhẹ
            overflow: "hidden", // Cắt ảnh hoặc nội dung thừa
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Đổ bóng
            transition: "transform 0.2s", // Hiệu ứng hover
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={product.img}
            alt={product.title}
            style={{
              height: "200px", // Chiều cao cố định cho ảnh
              width: "100%", // Chiều rộng 100% khớp với thẻ cha
              objectFit: "cover", // Đảm bảo ảnh không méo
            }}
          />
          <div
            style={{
              padding: "15px", // Khoảng cách nội dung với viền
              textAlign: "center", // Căn giữa nội dung
            }}
          >
            <h5 style={{ fontWeight: "bold", margin: "10px 0" }}>{product.title}</h5>
            <p style={{ margin: "5px 0", fontSize: "16px" }}>
              Price: {product.price.toLocaleString()}₫
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "gray" }}>
              Stock: {product.stock}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuCard;
