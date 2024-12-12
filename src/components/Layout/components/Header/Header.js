import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap-icons/font/bootstrap-icons.css';
import style from './Header.module.css'

//Khai Báo Biến Toàn Cục
import Context from '../../../../Context/Context';
import { useContext } from 'react';


function HeaderTikTok() {
    

    const {cart,setCart} = useContext(Context)
    const {token,removeToken} =useContext(Context)
    
    const handleSubmit = async(e)=>{
        removeToken()
    }


    return (
      <div className={style.Header_Parent}>
        <header className={style.Header}>
            <div className={style.Header_Icon} >
                <div><a href='/'>COFFEE</a></div>
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
                    <a href="/cart" className={style.Header_CardLink}>
                      <div className={style.CardIcon}>
                      <i class="bi bi-cart2"></i>
                        <span className={style.CartNumber}>{cart.length}</span> {/* Number displayed above the icon */}
                      </div>
                    </a>
                  </li>

                  <li className={style.Header_You} >
                    <img src="./image/anhdaidien.jpg" alt="Ảnh Đại diện" />
                    <div className={style.Header_Your_settings} >
                      <ul style={{ display: token ? 'block' : 'none' }}>
                        <li>
                          <p><i className="bi bi-person-circle"></i> Xem Hồ Sơ</p>
                        </li>
                        <li>
                          <a href='/update-user/'><p><i className="bi bi-gear"></i> Cài Đặt</p></a>
                        </li>
                        <li>
                          <p><i className="bi bi-sliders2"></i> Tiếng Việt</p>
                        </li>
                        <li>
                          <p onClick={handleSubmit} ><i className="bi bi-box-arrow-left"></i> Đăng Xuất</p>
                        </li>
                      </ul>

                      <ul style={{ display: token ? 'none' : 'block' }}>
                        <li>
                          <p>
                            <a href="/login_register"><i className="bi bi-box-arrow-right"></i> Đăng Nhập</a>
                          </p>
                        </li>
                        <li>
                          <p>
                            <a href="/login_register"><i className="bi bi-person-plus"></i> Đăng Kí</a>
                          </p>
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