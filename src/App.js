import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Fragment } from "react";
import { useState } from 'react';


//Page
import Home from "./page/Home/Home";
import About_us from "./page/About_us/About_us";
import Owner from "./page/Owner/Owner";
import Cart from "./page/Cart/Cart";
import Contact from "./page/Contact_us/Contact_us";

import { ContextProvider } from "./Context/Context";
import Menu from "./page/Menu/Menu";
//Layout
import Default_Layout from "./components/Layout/Default_Layout/Default_Layout";
import Admin_Layout from "./components/Layout/Admin_Layout/Admin_Layout";
import Login_Register from "./page/Login_Register/Login_Register";
import ProductDetails from "./page/ProductDetail/Product_Detail";
import Slider_Layout from "./components/Layout/Slider_Layout/Slider_Layout";
import UserList from "./page/User/UserList";
import UpdateUser from "./page/User/UpdateUser";
import BranchList from "./page/List_Base/BranchList";
import SalesManagement from "./page/Revenue/revenue";
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
              <Route path="/login_register" element={<Slider_Layout><Login_Register/></Slider_Layout>} />
              <Route path="/product/:id" element={<Slider_Layout> <ProductDetails /></Slider_Layout>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/user_list" element={<UserList />} />
              <Route path="/update_user" element={<Default_Layout><UpdateUser/></Default_Layout>} />
              {/* KhachHang */}



              {/* NhanhVien */}



              {/* QuanLi */}

              <Route path="/revenue" element={<SalesManagement />} />

              {/* GiamDoc */}
              <Route path="/owner" element={<Admin_Layout><Owner/></Admin_Layout>} />
              <Route path="/list_base" element={<BranchList />} />
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
