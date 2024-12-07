import React, { createContext, useState, useEffect } from 'react';

const Context = createContext();  // Khởi tạo context

// Tạo một component ContextProvider để quản lý trạng thái toàn cục
export const ContextProvider = ({ children }) => {


  // ||||||||||    ||||||||||   ||||||||||     ||||||||
  // ||            ||      ||   ||      ||     ||     ||
  // ||            ||||||||||   ||||||||||     ||     ||
  // ||            ||      ||   ||     ||      ||     ||
  // ||||||||||    ||      ||   ||       ||    ||||||||


  // Sử dụng useState để lưu trữ giỏ hàng (cart) và kiểm tra nếu có dữ liệu trong localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; // Trả về giỏ hàng đã lưu hoặc một mảng rỗng nếu không có
  });

  // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật giỏ hàng trong localStorage
  }, [cart]); // Mảng phụ thuộc đảm bảo chỉ chạy khi giỏ hàng (cart) thay đổi


  // ||||||||||    ||||||||||   ||||||||||     ||||||||
  // ||            ||      ||   ||      ||     ||     ||
  // ||            ||||||||||   ||||||||||     ||     ||
  // ||            ||      ||   ||     ||      ||     ||
  // ||||||||||    ||      ||   ||       ||    ||||||||

  

  // ||||||||||    ||||||||||   ||    ||    ||||||||  ||||      ||
  //     ||        ||      ||   ||  ||      ||        ||  ||    ||
  //     ||        ||      ||   ||||||      ||||||||  ||    ||  ||
  //     ||        ||      ||   ||   ||     ||        ||      ||||
  //     ||        ||||||||||   ||     ||   ||||||||  ||        ||

  

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {

      if (!token) return;


       // Kiểm tra token qua backend
       try {
        const response = await fetch("http://localhost:8082/token/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const isValid = await response.json();
        if (!isValid) {
          console.error("Token không hợp lệ hoặc đã hết hạn!");
          removeToken(); // Xóa token khi không hợp lệ
        }else{
          console.error("Token  hợp lệ ");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error);
        removeToken();
      }

      // Giải mã token để lấy thời gian hết hạn
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Giải mã phần payload
        const expiryTime = decodedToken.exp * 1000; // Chuyển sang milliseconds
        const currentTime = Date.now();

        if (expiryTime <= currentTime) {
          // Token đã hết hạn
          console.error("Token đã hết hạn!");
          removeToken(); // Gọi hàm xóa token
        } else {
          // Thiết lập timeout để kiểm tra lại khi token hết hạn
          const timeoutDuration = expiryTime - currentTime;
          const timeoutId = setTimeout(() => {
            console.error("Token đã hết hạn!");
            removeToken();
          }, timeoutDuration);

          return () => clearTimeout(timeoutId); // Dọn dẹp timeout cũ khi token thay đổi
        }
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        removeToken();
      }
      
      console.log(token)
     
    };

    checkTokenValidity();
  }, [token]); // Chỉ chạy khi token thay đổi

  // ||||||||||    ||||||||||   ||    ||    ||||||||  ||||      ||
  //     ||        ||      ||   ||  ||      ||        ||  ||    ||
  //     ||        ||      ||   ||||||      ||||||||  ||    ||  ||
  //     ||        ||      ||   ||   ||     ||        ||      ||||
  //     ||        ||||||||||   ||     ||   ||||||||  ||        ||


  return (
    <Context.Provider value={{ cart, setCart, token, saveToken, removeToken }}>
      {children}
    </Context.Provider>
  );
};

// Xuất context để các component khác có thể sử dụng
export default Context;
