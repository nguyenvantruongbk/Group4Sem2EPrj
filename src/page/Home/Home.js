
import styles from './Home.module.css';
import { Carousel } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Card_Slidler(){
    return(
        <div>
            <div className={styles.Card_Slidler} >
                <div className={styles.Card_Slidler_Title} >
                    <div>
                        <p>TIN TỨC MỚI NHẤT</p>
                    </div>
                 
                </div>
                 <Carousel className={`w-100 ${styles.Card_Slidle_Body}`}>
                    <Carousel.Item  >
                       <div className={styles.Card_Slidle_Body_Conten}>
                       <Row>
                            <Col  md={4}>
                                <div className={styles.Card_Slidle_Body_Conten_Left}>
                                    <div className={styles.Card_Slidle_Body_Conten_Left_Img} >
                                        <img 
                                            className={styles.Card_Slidle_Body_Conten_Right_Conten_Image}
                                            src="https://xofacafebistro.com/wp-content/uploads/2023/01/coffee-beans-with-props-for-making-coffee-e1624585646810-1137x1536.jpg" 
                                            alt="Update Preview"
                                        />
                                    </div>
                                </div>
                            </Col>
                        
                            <Col  md={8}>
                                <div className={styles.Card_Slidle_Body_Conten_Right}>
                                    <div className={styles.Card_Slidle_Body_Conten_Right_Conten}>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Date} >November 18, 2024</p>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Title} > Exciting News: Our Latest Update!</p>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Conten} > Discover the latest features in our platform, designed to improve your experience. 
                                        Stay tuned for more updates coming soon!</p>
                                        <button>Read More</button>
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>
                              
                       </div>
                       
                        
                    </Carousel.Item>
                    

                    <Carousel.Item  >
                       <div className={styles.Card_Slidle_Body_Conten}>
                       <Row>
                            <Col  md={4}>
                                <div className={styles.Card_Slidle_Body_Conten_Left}>
                                    <div className={styles.Card_Slidle_Body_Conten_Left_Img} >
                                        <img 
                                            className={styles.Card_Slidle_Body_Conten_Right_Conten_Image}
                                            src="https://xofacafebistro.com/wp-content/uploads/2023/01/182068863_4447833575247139_2234046618090785431_n-768x768.jpg" 
                                            alt="Update Preview"
                                        />
                                    </div>
                                </div>
                            </Col>
                        
                            <Col  md={8}>
                                <div className={styles.Card_Slidle_Body_Conten_Right}>
                                    <div className={styles.Card_Slidle_Body_Conten_Right_Conten}>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Date} >November 18, 2024</p>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Title} > Exciting News: Our Latest Update!</p>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Conten} > Discover the latest features in our platform, designed to improve your experience. 
                                        Stay tuned for more updates coming soon!</p>
                                        <button>Read More</button>
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>
                              
                       </div>
                       
                        
                    </Carousel.Item>
                    

                    <Carousel.Item  >
                       <div className={styles.Card_Slidle_Body_Conten}>
                       <Row>
                            <Col  md={4}>
                                <div className={styles.Card_Slidle_Body_Conten_Left}>
                                    <div className={styles.Card_Slidle_Body_Conten_Left_Img} >
                                        <img 
                                            className={styles.Card_Slidle_Body_Conten_Right_Conten_Image}
                                            src="https://xofacafebistro.com/wp-content/uploads/2023/01/doi-ngu-nhan-su-6.jpg    " 
                                            alt="Update Preview"
                                        />
                                    </div>
                                </div>
                            </Col>
                        
                            <Col  md={8}>
                                <div className={styles.Card_Slidle_Body_Conten_Right}>
                                    <div className={styles.Card_Slidle_Body_Conten_Right_Conten}>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Date} >November 18, 2024</p>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Title} > Exciting News: Our Latest Update!</p>
                                        <p className={styles.Card_Slidle_Body_Conten_Right_Conten_Conten} > Discover the latest features in our platform, designed to improve your experience. 
                                        Stay tuned for more updates coming soon!</p>
                                        <button>Read More</button>
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>
                              
                       </div>
                       
                        
                    </Carousel.Item>
                 
                    
                
                </Carousel>
            </div>
      </div>
    );
        
    
}



function Header_Home(){
    return(
        <div className={styles.Header_Home} >
            <Row>
                <Col    xs={12}             // Điện thoại rất nhỏ (toàn màn hình)
                        sm={8}              // Điện thoại lớn hơn (chiếm 8 phần)
                        md={{ span: 7, offset: 1 }} // Máy tính bảng, iPad (chiếm 4 phần, cách 1 phần bên trái)
                        lg={{ span: 4, offset: 1 }}             // Laptop (chiếm 4 phần)
                        xl={{ span: 4, offset: 1 }}  className={styles.Header_Home_Left} >
                    <div className={styles.Header_Home_Left_Conten}>
                        <p className={styles.Header_Home_Left_Conten_H1} >Cà phê chất lượng được giao đến tận  nhà bạn</p>
                        <p className={styles.Header_Home_Left_Conten_H2}>Mọi việc chúng ta làm đều là vấn đề của trái tim, cơ thể và tâm hồn. Sứ mệnh của chúng tôi là cung cấp cà phê chất lượng, được hái bằng tay, có nguồn gốc bền vững</p>
                        <button>Menu</button>
                    </div>
                </Col>
                
            </Row>
        </div>
    );
}


function List_Menu(){
    return (
        <div className={styles.Home_List_Menu}>
            <Row className={styles.Home_List_Menu_Conten}>
                <Col   xs={12}  sm={6}  md={4}  className={styles.Home_List_Menu_Conten_Sm}  >
                    <div className={styles.Home_List_Menu_Conten__Sm_1}>
                          <div>
                                <p className={styles.Home_List_Menu_Conten_head}>GIỚI THIỆU BẠN BÈ</p>
                                <p  className={styles.Home_List_Menu_Conten_mony}>Earn $10</p>
                                <p className={styles.Home_List_Menu_Conten_conten}>Share your love of coffee with friends</p>
                                <button>Menu</button>
                          </div>
                    </div>
                </Col>
                <Col  xs={12}  sm={6}  md={4}  className={styles.Home_List_Menu_Conten_Sm}  >
                    <div className={styles.Home_List_Menu_Conten__Sm_2}>
                          <div>
                                <p className={styles.Home_List_Menu_Conten_head}>Tháng Tám</p>
                                <p  className={styles.Home_List_Menu_Conten_mony}>Earn $10</p>
                                <p className={styles.Home_List_Menu_Conten_conten}>Share your love of coffee with friends.</p>
                                <button>SHOP NOW</button>
                          </div>
                    </div>
                </Col>
                <Col  xs={12}  sm={6}  md={4}  className={styles.Home_List_Menu_Conten_Sm}  >
                    <div className={styles.Home_List_Menu_Conten__Sm_3}>
                          <div>
                                <p className={styles.Home_List_Menu_Conten_head}>CÀ PHÊ LẠNH</p>
                                <p  className={styles.Home_List_Menu_Conten_mony}>Earn $10</p>
                                <p className={styles.Home_List_Menu_Conten_conten}>Refresh your mind with organic, sustainably-sourced cold brew coffee.</p>
                                <button>ĐỌC THÊM</button>
                          </div>
                    </div>
                </Col>
                
                
            </Row>
        </div>
    );
}


function List_Card(){
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png" />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
  );
}

function Home() {
    return ( 
        <div className={styles.Container}  >
           <Header_Home/>

            <List_Menu/>

            <Card_Slidler/>
        </div>
     );
}

export default Home;