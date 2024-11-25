import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Fragment } from "react";
import { useState } from 'react';


//Page
import Home from "./page/Home/Home";
import About_us from "./page/About_us/About_us";
import Owner from "./page/Owner/Owner";
import Cart from "./page/Cart/Cart";

import { ContextProvider } from "./Context/Context";
import Menu from "./page/Menu/Menu";
//Layout
import Default_Layout from "./components/Layout/Default_Layout/Default_Layout";
import Admin_Layout from "./components/Layout/Admin_Layout/Admin_Layout";
import ProductDetails from "./page/ProductDetail/Product_Detail";
function App() {

  const [cart,setCart] = useState([]);


  return (
    <ContextProvider >
      <Router>
        <div className="App">
          <Routes>
            {/* Trang Binh Thuong */}
              <Route path="/" element={<Default_Layout><Home/></Default_Layout>} />
              <Route path="/about_us" element={<Default_Layout><About_us/></Default_Layout>} />
              <Route path="/menu" element={<Default_Layout><Menu /></Default_Layout>} />
              <Route path="/cart" element={<Default_Layout><Cart/></Default_Layout>} />
              <Route path="/product/:id" element={<ProductDetails />} />
              {/* KhachHang */}



              {/* NhanhVien */}



              {/* QuanLi */}


              {/* GiamDoc */}
              <Route path="/owner" element={<Admin_Layout><Owner/></Admin_Layout>} />
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
