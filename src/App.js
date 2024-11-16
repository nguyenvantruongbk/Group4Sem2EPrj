import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Fragment } from "react";



//Page
import Home from "./page/Home/Home";
import About_us from "./page/About_us/About_us";
import Owner from "./page/Owner/Owner";


//Layout
import Default_Layout from "./components/Layout/Default_Layout/Default_Layout";
import Admin_Layout from "./components/Layout/Admin_Layout/Admin_Layout";

function App() {
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
  );
}

export default App;
