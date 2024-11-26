import styles from './About_us.module.css';
import React from 'react';
import { useState } from 'react';


function About_us() {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (imageName) => {
    setHoveredImage(imageName);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

    return ( 
    <div className={styles.body}>
    <div className={styles.container}>
      <div className={styles.leftcontent}>
        <div className={styles.insideconten}>
            <h3>About us</h3>
        </div>
        <div className={styles.insidebigconten}>
            <h1>Cống hiến cho chất lượng</h1>
        </div>
        <div className={styles.insidebigconten}>
            <h1>---</h1>
        </div>
        <div className={styles.insidesmailconten}>
            <p>Sứ mệnh của chúng tôi là cung cấp cà phê chất lượng được hái bằng tay, rang xay thủ công, có nguồn gốc bền vững. Cà phê tuyệt vời là niềm đam mê của chúng tôi và chúng tôi muốn chia sẻ nó với bạn.</p>
        </div>
        <div className={styles.insidesmailconten}>
            <p>Chúng tôi nỗ lực xây dựng mối quan hệ đối tác sâu sắc với những người nông dân trên khắp thế giới để cùng nhau tạo ra góc nhìn và hình thành mối quan hệ làm việc lành mạnh dựa trên sự tin tưởng và tôn trọng.</p>
        </div>
      </div>
      <div className={styles.rightvideo}>
        <div className={styles.overlayText}>
          <h1>Mọi việc chúng tôi làm đều là vấn đề của
          trái tim, cơ thể và tâm hồn.</h1>
        </div>
        <video autoPlay loop muted>
          <source src="/video/amaya-video-1-xs.mp4" type="video/mp4"/>
        </video>
      </div>
    </div> 
    <div className={styles.centercontainer}>
        <div className={styles.insidecenterconten}>
            <h3>Our philosophy</h3>
        </div>
        <div className={styles.insidebigcenconten}>
            <h1>Cà phê là nghề thủ công, là nghi lễ và là niềm đam mê của chúng tôi.</h1>
        </div>
        <div className={styles.insidebigcenconten}>
            <h1>---</h1>
        </div>
        <div className={styles.insidesmailcenterconten}>
            <p>Thương mại công bằng siphon crema thêm, viennese qui, bọt viennese siphon est so carajillo sit ut thêm rau diếp xoăn lâu đời crema rau diếp xoăn Et, một cốc sẫm màu, cortado, siphon và cà phê hương vị arabica macchiato, at, acerbic redeye đá mỹano cà phê. Để đi et, hấp một quán cà phê au lait, dư vị duy nhất là frappuccino núi xanh.</p>
        </div>
    </div> 
    <div className={styles.picture}>
      <div className={styles.leftimage}>
        <img
          src="/image/1.jpg"
          alt="Image 1"
          onMouseEnter={() => handleMouseEnter('Image 1')}
          onMouseLeave={handleMouseLeave}
          className={hoveredImage === 'Image 1' ? styles.hovered : styles.slideUp}
        />
        {hoveredImage === 'Image 1' && (
          <div className={styles.tooltip}>This is Image 1</div>
        )}
      </div>
      <div className={styles.rightimages}>
        <div className={styles.topimages}>
          <img
            src="/image/2.jpg"
            alt="Image 2"
            onMouseEnter={() => handleMouseEnter('Image 2')}
            onMouseLeave={handleMouseLeave}
            className={hoveredImage === 'Image 2' ? styles.hovered : styles.slideUp}
          />
          {hoveredImage === 'Image 2' && (
            <div className={styles.tooltip}>This is Image 2</div>
          )}

          <img
            src="/image/3.jpg"
            alt="Image 3"
            onMouseEnter={() => handleMouseEnter('Image 3')}
            onMouseLeave={handleMouseLeave}
            className={hoveredImage === 'Image 3' ? styles.hovered : styles.slideUp}
          />
          {hoveredImage === 'Image 3' && (
            <div className={styles.tooltip}>This is Image 3</div>
          )}
        </div>
        <div className={styles.bottomimage}>
          <img
            src="/image/4.jpg"
            alt="Image 4"
            onMouseEnter={() => handleMouseEnter('Image 4')}
            onMouseLeave={handleMouseLeave}
            className={hoveredImage === 'Image 4' ? styles.hovered : styles.slideUp}
          />
          {hoveredImage === 'Image 4' && (
            <div className={styles.tooltip}>This is Image 4</div>
          )}
        </div>
      </div>
    </div>
    <div className={styles.centercontainer}>
        <div className={styles.insidecenterconten}>
            <h3>Our story</h3>
        </div>
        <div className={styles.insidebigcenconten}>
            <h1>Mọi việc chúng ta làm đều xuất phát từ trái tim, cơ thể và tâm hồn.</h1>
        </div>
        <div className={styles.insidebigcenconten}>
            <h1>---</h1>
        </div>
        <div className={styles.insidesmailcenterconten}>
            <p>Tất cả bắt đầu với một khái niệm khiêm tốn: Tạo ra loại cà phê đặc biệt. Siphon crema extra thương mại công bằng, qui viennese, siphon viennese bọt là quá trình caramel hóa. Carajillo ngồi ut extra chicory crema tức thời lâu năm chicory. Et, dark một tách, cortado, siphon tại arabica hương vị macchiato. Kem, tại, acerbic redeye đá americano cà phê trắng. Để mang đi et, hấp một tách cà phê au lait, hương vị nguyên bản frappuccino blue mountain đánh bông.</p>
        </div>
    </div> 
    <div className={styles.container}>
      <div className={styles.imagebot}>
        <img src="/image/coffeebean-beans-2.jpg" alt="placeholder" />
      </div>
      <div className={styles.textbot}>
      <div className={styles.insideconten}>
            <h3>Our mission</h3>
              </div>
                <div className={styles.insidebigconten}>
              <h1>Chúng tôi lấy nguồn cà phê từ khắp nơi trên thế giới từ những người nông dân mà chúng tôi biết và tin tưởng</h1>
            </div>
            <div className={styles.insidebigconten}>
                <h1>---</h1>
            </div>
            <div className={styles.insidesmailconten}>
                <p>Chúng tôi thu mua cà phê từ nhiều quốc gia trên thế giới, với nguồn gốc rõ ràng từ những người nông dân mà chúng tôi đã biết và tin tưởng. Mối quan hệ bền vững và uy tín với những người nông dân này là yếu tố quan trọng giúp chúng tôi cung cấp những sản phẩm cà phê chất lượng cao và đảm bảo đạo đức trong chuỗi cung ứng.</p>
            </div>
        </div>
      </div>       
  </div>
  );
}

export default About_us;
