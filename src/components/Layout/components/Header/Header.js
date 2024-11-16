import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap-icons/font/bootstrap-icons.css';
import style from './Header.module.css'

function HeaderTikTok() {
    return (
      <div className={style.Header_Parent}>
        <header className={style.Header}>
            <div className={style.Header_Icon} >
                <div>COFFEE</div>
            </div>
            <div className={style.Header_Search}>
                <Form className={`d-flex `}  >
                  <Form.Control
                    type="search"
                    placeholder="Tìm Kiếm"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success"><i class="bi bi-search"></i></Button>
                </Form>
            </div>
            <div className={style.Header_Shortcut}>
                <ul>
                  <li >
                     <i class="bi bi-cup-hot"></i>
                  </li>
                  <li className={style.Header_Card}>
                    <a href="https://example.com" className={style.Header_CardLink}>
                      <div className={style.CardIcon}>
                      <i class="bi bi-bag-heart"></i>
                        <span className={style.CartNumber}>10</span> {/* Number displayed above the icon */}
                      </div>
                    </a>
                  </li>

                  <li className={style.Header_You} >
                    <img src="./image/anhdaidien.jpg" alt="Ảnh Đại diện" />
                    <div className={style.Header_Your_settings} >
                        <ul style={{ display: 'block' }}>
                          <li>
                            <p><i class="bi bi-person-circle"></i> Xem Hồ Sơ</p>
                          </li>
                          <li>
                            <p><i class="bi bi-gear"></i>Cài Đặt</p>
                          </li>
                          <li>
                            <p><i class="bi bi-sliders2"></i>Tiếng Việt</p>
                          </li>
                          <li>
                            <p><i class="bi bi-box-arrow-left"></i> Đăng Xuất</p>
                          </li>
                         
                        </ul>
                        <ul style={{ display: 'none' }}>
                          <li>
                            <p><i class="bi bi-box-arrow-right"></i>Đăng Nhập</p>
                          </li>
                          <li>
                            <p><i class="bi bi-person-plus"></i>Đăng Kí</p>
                          </li>
                          
                        </ul>
                    </div>
                  </li>
                  

                </ul>
            </div>
        </header>
      </div>
    );
  }
  



function Header() {
    return ( 
        <>
        <HeaderTikTok/>
        </> );
}

export default Header;