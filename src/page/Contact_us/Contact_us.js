import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "./Contact_us.module.css"; // Import CSS Module
import Accordion from 'react-bootstrap/Accordion';

const Contact = () => {
    
  return (
    <div className={styles.body}>
      {/* Navigation Section */}
      <div className={styles.textup}>
        <div className={styles.blurText}>CONTACT</div>
        <div className={styles.overlayTextUp}>LIÊN HỆ VỚI CHÚNG TÔI</div>
        <div className={styles.overlayTextDown}>THÔNG TIN XOFA CAFE & BISTRO</div>
      </div>

      {/* Contact Section */}
      <div className={styles.contactContainer}>
        {/* Address */}
        <div className={styles.contactItem}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-shop"></i>
          </div>
          <h4 className={styles.textTitle}>ĐỊA CHỈ</h4>
          <p className={styles.textDescription}>
            Số 8, Tôn Thất Thuyết, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
          </p>
        </div>

        {/* Email */}
        <div className={styles.contactItem}>
          <div className={`${styles.iconBox} ${styles.iconBoxGreen}`}>
            <i className={`fa-regular fa-envelope ${styles.iconGreen}`}></i>
          </div>
          <h4 className={styles.textTitle}>EMAIL</h4>
          <p className={styles.textDescription}>nhom4@gmail.com</p>
        </div>

        {/* Phone */}
        <div className={styles.contactItem}>
          <div className={styles.iconBox}>
            <i className="fa-solid fa-phone"></i>
          </div>
          <h4 className={styles.textTitle}>PHONE</h4>
          <p className={styles.textDescription}>024 3717 1555</p>
        </div>

        {/* Opening Hours */}
        <div className={styles.contactItem}>
          <div className={`${styles.iconBox} ${styles.iconBoxGreen}`}>
            <i className={`fa-solid fa-clock-rotate-left ${styles.iconGreen}`}></i>
          </div>
          <h4 className={styles.textTitle}>GIỜ MỞ CỬA</h4>
          <p className={styles.textDescription}>Mở cả ngày</p>
        </div>
      </div>

      {/* Google Map */}
      <div className={styles.map}>
        <iframe
          width="100%"
          height="450"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2387.712944203182!2d105.7814162!3d21.0284995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abf1b3e8c4f5%3A0x1f4b1e8d7d5c2f7d!2sYour%20Location!5e0!3m2!1sen!2sin!4v1636437305075!5m2!1en!2sin"
          allowFullScreen
          title="Google Map"
        ></iframe>
      </div>
      <div className={styles.textdown}>
        <div className={styles.blurText}>FAQ</div>
        <div className={styles.overlayTextUp}>THẮC MẮC CỦA KHÁCH HÀNG</div>
        <div className={styles.overlayTextDown}>CÂU HỎI THƯỜNG GẶP</div>
      </div>
      <div className={styles.textFAQ}>
      <Container>
      <Row>
        <Col>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Nên thử những phương pháp pha cà phê nào?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}> 
          A: Có nhiều phương pháp pha cà phê bạn có thể thử tùy theo sở thích. Espresso và French Press mang đến cà phê đậm đà, trong khi pour-over tạo ra hương vị sáng và tinh tế. Nếu thích cà phê mượt mà, ít axit, cold brew là lựa chọn lý tưởng. Các phương pháp như Aeropress và Moka pot cung cấp cà phê mạnh mẽ, trong khi siphon lại cho ra một ly cà phê thanh thoát và tinh tế.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Shop có cung cấp dịch vụ VC quốc tế không?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}>
          A: Rất tiếc, chúng tôi hiện không cung cấp dịch vụ vận chuyển quốc tế. Chỉ có các đơn hàng trong nước mới được hỗ trợ vận chuyển. Cảm ơn bạn đã thông cảm!
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Shop có cung cấp các tùy chọn quà tặng không?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}>
          A: Chúng tôi có nhiều lựa chọn quà tặng cho khách hàng, bao gồm các bộ quà tặng đặc biệt và dịch vụ đóng gói quà. Bạn có thể chọn quà theo sở thích cá nhân hoặc theo dịp đặc biệt. Nếu bạn cần sự tư vấn, chúng tôi luôn sẵn sàng hỗ trợ để giúp bạn tìm món quà hoàn hảo.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Chính sách đổi trả của cửa hàng là gì?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}>
          A: Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua, với điều kiện sản phẩm còn nguyên trạng, chưa qua sử dụng và có đầy đủ hóa đơn. Nếu sản phẩm bị lỗi hoặc không đúng như mô tả, chúng tôi sẽ hỗ trợ đổi hoặc hoàn tiền. Bạn có thể liên hệ với bộ phận chăm sóc khách hàng để được hướng dẫn chi tiết.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </Col>
        <Col>
        <Accordion defaultActiveKey="2">
      <Accordion.Item eventKey="4" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Shop có đồ uống không chứa caffein không?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}> 
          A: Chúng tôi cung cấp nhiều lựa chọn đồ uống không chứa caffein, bao gồm các loại trà, sữa chua, và các loại cà phê decaf. Bạn có thể yêu cầu đồ uống không chứa caffein khi đặt hàng.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Shop có phục vụ bữa sáng và bữa trưa không?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}>
          A: Có, chúng tôi phục vụ các món ăn sáng và bữa trưa, bao gồm bánh mì, sandwich, salad và các món ăn nhẹ khác. Các món ăn được chế biến từ nguyên liệu tươi ngon, phù hợp cho bữa sáng hoặc bữa trưa nhẹ nhàng.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Shop có chỗ ngồi ngoài trời không?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}>
          A: Có, chúng tôi có khu vực ngồi ngoài trời để khách hàng có thể thưởng thức đồ uống trong không gian thoáng đãng. Bạn có thể chọn ngồi trong nhà hoặc ngoài trời tùy theo sở thích.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7" className={styles.custom_accordion}>
        <Accordion.Header className={styles.smailcontent}>Q: Có thể đặt hàng qua mạng và giao tận nơi không?</Accordion.Header>
        <Accordion.Body className={styles.insidesmailconten}>
          A: Chúng tôi có dịch vụ đặt hàng qua mạng và giao tận nơi cho khách hàng. Bạn có thể đặt hàng qua website hoặc ứng dụng của chúng tôi và sẽ nhận được đồ uống yêu thích tại nhà hoặc văn phòng.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  );
};

export default Contact;
