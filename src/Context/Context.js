import React, { createContext, useState, useEffect } from 'react';

const Context = createContext(); // Khởi tạo context

export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [roles, setRoles] = useState([]); // Trạng thái lưu trữ mảng quyền

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRoles([]); // Xóa luôn mảng quyền khi token bị xóa
  };

  // Hàm kiểm tra và xác thực token
  const verifyToken = async (currentToken) => {
    try {
      const response = await fetch("http://localhost:8082/token/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: currentToken }),
      });

      const isValid = await response.json();
      if (!isValid) {
        console.error("Token không hợp lệ hoặc đã hết hạn!");
        removeToken();
        return false;
      }

      // Kiểm tra thời gian hết hạn của token
      const decodedToken = JSON.parse(atob(currentToken.split('.')[1]));
      const expiryTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (expiryTime <= currentTime) {
        console.error("Token đã hết hạn!");
        removeToken();
        return false;
      }

      // Nếu token hợp lệ, trả về true
      return true;
    } catch (error) {
      console.error("Lỗi khi kiểm tra token:", error);
      removeToken();
      return false;
    }
  };

  // Hàm fetch role từ API
  const fetchRole = async (currentToken) => {
    try {
      const response = await fetch("http://localhost:8082/user_data/get_role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`, // Gửi token trong Authorization Header
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy thông tin quyền từ server.");
      }

      const roleData = await response.json();
      setRoles(roleData); // Lưu mảng quyền vào state
      console.log(roleData)
    } catch (error) {
      console.error("Lỗi khi lấy quyền:", error);
      setRoles([]); // Nếu xảy ra lỗi, đặt lại roles thành mảng rỗng
    }
  };

  // Kiểm tra token và lấy quyền nếu hợp lệ
  useEffect(() => {
    const processTokenAndRoles = async () => {
      if (!token) return;

      const isTokenValid = await verifyToken(token);
      if (isTokenValid) {
        await fetchRole(token); // Chỉ gọi fetchRole nếu token hợp lệ
      }
    };

    processTokenAndRoles();
  }, [token]);

  return (
    <Context.Provider value={{ cart, setCart, token, saveToken, removeToken, roles }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
