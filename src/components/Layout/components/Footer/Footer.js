import React from 'react';
import './Footer.css'; // Đừng quên tạo file CSS cho phần style riêng

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>ABOUT</h3>
                <ul>
                    <li>The Company</li>
                    <li>FAQ</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>LOCATIONS</h3>
                <ul>
                    <li>San Francisco</li>
                    <li>Newport Beach</li>
                    <li>Sun City</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>FOLLOW ALONG</h3>
                <div className="social-icons">
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-tripadvisor"></i>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2020 AMAYA. ALL RIGHTS RESERVED.</p>
                <div className="logo">
                    <img src="image/Amaya-logo-white-1.png" alt="AMAYA ROASTING CO." />
                </div>
                <p className="love-coffee">BECAUSE WE LOVE COFFEE</p>
            </div>

        </footer>
    );
};

export default Footer;
