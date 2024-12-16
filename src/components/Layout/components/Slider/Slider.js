
import Style from "./Slider.module.css"
import Accordion from 'react-bootstrap/Accordion';
import { useState } from "react";
function Slider() {
     // State để theo dõi trạng thái thêm class
     const [isActive, setIsActive] = useState(false);

     // Hàm xử lý sự kiện bấm nút
     const handleToggle = () => {
         setIsActive(!isActive); // Đảo trạng thái giữa true/false
     };

     
    return ( 
    <>  
        <div className={Style.Slider_buuton}>
            <button className={`${isActive ? "": Style.button_IsAvite} `} onClick={handleToggle}><i class="bi bi-caret-left-square-fill"></i></button>
        </div>
        <div className={`${Style.Slider} ${isActive ? "" : Style.IsAvite} `}>
            <div className={Style.Slider_Page}>
                <p id={Style.Title} > Các Page Chính </p>
                <ul>
                    <li>
                        <p><a href="/"><span><i class="bi bi-house-door-fill"></i></span>Trang Chủ</a></p>
                    </li>
                    <li>
                        <p><a href="/about_us"><span><i class="bi bi-bookmarks-fill"></i></span>Về Chúng Tôi</a></p>
                    </li>
                
                    <li>
                        <p><a href="/contact"><span><i class="bi bi-telephone-fill"></i></span>Liên Hệ</a></p>
                    </li>
                    <li>
                        <p><a href="/menu"><span><i class="bi bi-list"></i></span>Menu</a></p>
                    </li>
        
                   
                </ul>
            </div>
            <hr></hr>
            <div className={Style.Slider_Page}>
                <p id={Style.Title}>Khách Hàng</p>
                <ul>
                    <li>
                        <p><a href="/list_order" ><span><i class="bi bi-truck"></i></span>Theo Dõi </a></p>
                    </li>
                    <li>
                        <p><span><i className="bi bi-file-earmark-text-fill"></i></span>Hủy Đơn</p>
                    </li>
                    <li>
                        <p><a href="/cart" ><span><i class="bi bi-cart2"></i></span>Giỏ Hàng </a></p>
                    </li>
                    <li>
                    <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><p>Hóa Đơn</p></Accordion.Header>
                            <Accordion.Body>
                                <a href="https://example.com"><p><span><i className="bi bi-file-earmark-text-fill"></i></span>Xem Hóa Đơn</p></a>
                               
                            </Accordion.Body>
                            <Accordion.Body>
                            <a href="https://example.com"><p><span><i className="bi bi-pencil-fill"></i></span>Chỉnh Sửa </p></a>
                               
                            </Accordion.Body>
                        </Accordion.Item>
                    
                    </Accordion>
                    </li>
                </ul>
            </div>
            <hr></hr>
            <div className={Style.Slider_Page}>
                <p id={Style.Title}>Nhân Viên</p>
                <ul>
                    <li>
                        <p><span><i class="bi bi-folder-plus"></i></span>Tạo Hóa Đơn </p>
                    </li>
                    <li>
                        <p><span><i className="bi bi-file-earmark-text-fill"></i></span>Hủy Đơn</p>
                    </li>
                    <li>
                    <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><p>Cài Đặt</p></Accordion.Header>
                            <Accordion.Body>
                                <a href="https://example.com"><p><span><i className="bi bi-pencil-fill"></i></span>Điểm Danh</p></a>
                               
                            </Accordion.Body>
                            <Accordion.Body>
                            <a href="https://example.com"><p><span><i class="bi bi-body-text"></i></span>Xem Ngày</p></a>
                               
                            </Accordion.Body>
                        </Accordion.Item>
                    
                    </Accordion>
                    </li>
                </ul>
            </div>
            <hr></hr>
            <div className={Style.Slider_Page}>
                <p id={Style.Title}>Giám Đốc</p>
                <ul>
                    <li>
                        <p><a href="/list_base"><span><i class="bi bi-database"></i></span>Cơ Sở</a></p>
                    </li>
                    <li>
                        <p><a href="/add-branch"><span><i class="bi bi-database-add"></i></span>Thêm Cơ Sở</a></p>
                    </li>
                    <li>
                    <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><p>Cài Đặt</p></Accordion.Header>
                            <Accordion.Body>
                                <a href="https://example.com"><p><span><i className="bi bi-pencil-fill"></i></span>Điểm Danh</p></a>
                               
                            </Accordion.Body>
                            <Accordion.Body>
                            <a href="https://example.com"><p><span><i class="bi bi-body-text"></i></span>Xem Ngày</p></a>
                               
                            </Accordion.Body>
                        </Accordion.Item>
                    
                    </Accordion>
                    </li>
                </ul>
            </div>


            

        </div>
        
    
    </> );
}

export default Slider;