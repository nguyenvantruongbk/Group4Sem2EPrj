// Tạo context
import React, { createContext, useState, useEffect } from 'react';

const Context = createContext();  // Khởi tạo context

// Tạo một component ContextProvider để quản lý trạng thái toàn cục
export const ContextProvider = ({ children }) => {
  // Sử dụng useState để lưu trữ giỏ hàng (cart) và kiểm tra nếu có dữ liệu trong localStorage
  const [cart, setCart] = useState(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage khi lần đầu tiên tải trang
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; // Trả về giỏ hàng đã lưu hoặc một mảng rỗng nếu không có
  });

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật giỏ hàng trong localStorage
  }, [cart]); // Mảng phụ thuộc đảm bảo chỉ chạy khi giỏ hàng (cart) thay đổi

  return (
    <Context.Provider value={{ cart, setCart }}>
      {children}  {/* Truyền dữ liệu giỏ hàng và phương thức setCart cho các component con */}
    </Context.Provider>
  );
};

// Xuất context để các component khác có thể sử dụng
export default Context;
