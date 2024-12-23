
    import Style from "./Slider.module.css"
    import Accordion from 'react-bootstrap/Accordion';
    import { useState } from "react";
    import Context from "../../../../Context/Context";
    import { useContext } from 'react';
    function Slider() {
        const { roles } = useContext(Context);
        const [isActive, setIsActive] = useState(true);
    
        const handleToggle = () => {
            setIsActive(!isActive);
        };
    
        // Kiểm tra quyền
        const hasRole = (roleName) => {
            return roles.some((role) => role.role.roleName === roleName);
        };
    
        return (
            <>  
                <div className={Style.Slider_buuton}>
                    <button
                        className={`${isActive ? "" : Style.button_IsAvite}`}
                        onClick={handleToggle}
                    >
                        <i className="bi bi-caret-left-square-fill"></i>
                    </button>
                </div>
                <div className={`${Style.Slider} ${isActive ? "" : Style.IsAvite}`}>
                <div className={Style.Slider_Page}>
                        <p id={Style.Title}>Các Page Chính</p>
                        <ul>
                            <li>
                                <p>
                                    <a href="/">
                                        <span><i className="bi bi-house-door-fill"></i></span>
                                        Trang Chủ
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/about_us">
                                        <span><i className="bi bi-info-circle-fill"></i></span>
                                        Về Chúng Tôi
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/menu">
                                        <span><i className="bi bi-list-ul"></i></span>
                                        Thực Đơn
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/cart">
                                        <span><i className="bi bi-cart-fill"></i></span>
                                        Giỏ Hàng
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/contact">
                                        <span><i className="bi bi-telephone-fill"></i></span>
                                        Liên Hệ
                                    </a>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <hr />
                    {hasRole("CUSTOMER") && (
                       <div className={Style.Slider_Page}>
                        <p id={Style.Title}>Khách Hàng</p>
                        <ul>
                            <li>
                                <p>
                                    <a href="/list_order">
                                        <span><i className="bi bi-truck"></i></span>
                                        Theo Dõi
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="/cart">
                                        <span><i className="bi bi-cart3"></i></span>
                                        Đặt Mua
                                    </a>
                                </p>
                            </li>
                        </ul>
                        <hr />
                        </div>
                        
                    )}
                     {/* <hr />
                    {hasRole("EMPLOYEE") && (
                        <div className={Style.Slider_Page}>
                            <p id={Style.Title}>Nhân Viên</p>
                            <ul>
                                <li>
                                    <p><span><i className="bi bi-folder-plus"></i></span>Tạo Hóa Đơn</p>
                                </li>
                                <li>
                                    <p><span><i className="bi bi-file-earmark-text-fill"></i></span>Hủy Đơn</p>
                                </li>
                            </ul>
                        </div>
                    )} */}
                   
                    {hasRole("MANAGER") && (
                       <div className={Style.Slider_Page}>
                       <p id={Style.Title}>Quản Lý</p>
                       <ul>
                           <li>
                               <p>
                                   <a href="/order_for_manager">
                                       <span><i className="bi bi-file-text"></i></span>
                                       Danh Sách Hóa Đơn
                                   </a>
                               </p>
                           </li>
                           <li>
                               <p>
                                   <a href="/add_product">
                                       <span><i className="bi bi-box"></i></span>
                                       Tạo Sản Phẩm
                                   </a>
                               </p>
                           </li>
                           <li>
                               <p>
                                   <a href="/list_product">
                                       <span><i className="bi bi-card-list"></i></span>
                                       Danh Sách Sản Phẩm
                                   </a>
                               </p>
                           </li>
                       </ul>
                       <hr />
                   </div>
                    )}
            
                    {hasRole("DIRECTOR") && (
                        <div className={Style.Slider_Page}>
                            <p id={Style.Title}>Giám Đốc</p>
                            <ul>
                                <li>
                                    <p><a href="/list_base"><span><i className="bi bi-database"></i></span>Cơ Sở</a></p>
                                </li>
                                <li>
                                    <p><a href="/add-branch"><span><i className="bi bi-database-add"></i></span>Thêm Cơ Sở</a></p>
                                </li>
                                <li>
                                    <p><a href="/statistical"><span><i className="bi bi-bar-chart-line-fill"></i></span>Xem Doanh Thu</a></p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </>
        );
    }
    
    export default Slider;
