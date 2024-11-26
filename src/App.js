import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Fragment } from "react";
import { useState } from 'react';


//Page
import Home from "./page/Home/Home";
import About_us from "./page/About_us/About_us";
import Owner from "./page/Owner/Owner";

import { ContextProvider } from "./Context/Context";
import Menu from "./page/Menu/Menu";
//Layout
import Default_Layout from "./components/Layout/Default_Layout/Default_Layout";
import Admin_Layout from "./components/Layout/Admin_Layout/Admin_Layout";
import Login_Register from "./page/Login_Register/Login_Register";
import ProductDetails from "./page/ProductDetail/Product_Detail";
import Slider_Layout from "./components/Layout/Slider_Layout/Slider_Layout";

function App() {

  const [cart,setCart] = useState([]);


  return (
    
    <Router>
      <div className="App">
        <Routes>
           {/* Trang Binh Thuong */}
            <Route path="/" element={<Default_Layout><Home/></Default_Layout>} />
            <Route path="/about_us" element={<Default_Layout><About_us/></Default_Layout>} />

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
