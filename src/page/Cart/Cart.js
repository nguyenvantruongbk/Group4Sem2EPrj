import Style from "./Cart.module.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";

import Context from "../../Context/Context";
import { useContext } from 'react';
import context from "react-bootstrap/esm/AccordionContext";
import { useEffect } from "react";

//importChucNang
import { Change_quantity } from "../../components/Function/Card_Funci/Card_Funci";
import { Delete_Card } from "../../components/Function/Card_Funci/Card_Funci";

function Header_Cart(){
    const {cart,setCart} = useContext(Context);
    const handleCheckboxChange = (e) => {
        if (e.target.checked === true){
            const updatedCart = cart.map(item => ({
                ...item,  // Giữ nguyên các thuộc tính khác của item
                Ckeck: true  // Đặt Ckeck = true cho tất cả các item
              }));
              setCart(updatedCart)
        }else{
            const updatedCart = cart.map(item => ({
                ...item,  // Giữ nguyên các thuộc tính khác của item
                Ckeck: false  // Đặt Ckeck = true cho tất cả các item
              }));
              setCart(updatedCart)
        }
      };
    return(
        <>
        <div className={Style.Cart_Layout}>

                <div className={Style.Cart_Layout_Left}>
                    <div><input type="checkbox" name="terms" value="agree" onChange={handleCheckboxChange}  required/></div>
                    <div><p>Sản Phẩm</p></div>
                </div>
                <div className={Style.Cart_Layout_Right}>
                    <div><p>Đơn Giá</p></div>
                    <div><p>Số Lượng</p></div>
                    <div><p>Số Tiền</p></div>
                    <div><p>Thao Tác</p></div>
                </div>
        </div>
       

      

       </>
      
    );
}

function Body_Cart(e){
    const {cart,setCart} = useContext(Context);
    var iteam =  e.iteam

    useEffect(() => {
        if (iteam.Ckeck === undefined) {
          iteam.Ckeck = false; // Gán giá trị mặc định là false
        }
    }, [iteam]);

 

    function handleQuantityChange(props,e){
        var quantity = e.target.value
        if (!isNaN(quantity) && quantity !== "") {

            Change_quantity({props:iteam,quantity,cart,setCart})
          } else {
            // quantity không phải là số hợp lệ
          }

    }

    function Delete_Card_Onclick(){
        Delete_Card({props:iteam,cart,setCart})
    }


   
    const handleCheckboxChange = (e) => {
        const updatedCart = cart.map(item => {
          if (item === iteam) {
            return { ...item, Ckeck: e.target.checked }; // Cập nhật `Ckeck` của sản phẩm
          }
          return item;
        });
        console.log(updatedCart)
        setCart(updatedCart); // Cập nhật lại giỏ hàng
      };


 



    return(
        <div  className={`${Style.Cart_Layout} ${Style.BodyCart}`} >

            <div className={Style.Cart_Layout_Left}>
                <div><input type="checkbox" name="terms" value="agree"  checked={iteam.Ckeck}  onChange={handleCheckboxChange}   required /></div>
                <div className={Style.Body_Cart_Img}>
                    <img src={iteam.images}/>
                </div>
                <div className={Style.Body_Cart_Name} >
                    <a href="" ><p> {iteam.title}</p></a>
                </div>
            </div>
            <div className={Style.Cart_Layout_Right}>
                <div className={Style.Cart_Layout_Right_Unit_Price}><p>₫{iteam.price}</p></div>
                <div className={Style.Cart_Layout_Right_Quantity}>
                    <p> 
                       
                        <span className="mx-2"> 
                            <input type="number" id="age" name="age"  min="1" max="5"  onChange={(e) => handleQuantityChange(iteam,e)} value={iteam.quantity}  />  
                        </span>
                      
                    </p>
                </div>
                <div className={Style.Cart_Layout_Right_Price} ><p>₫{(iteam.price*iteam.quantity).toFixed(2)}</p></div>
                <div className={Style.Cart_Layout_Right_Operation}> <Button onClick={() => Delete_Card_Onclick()} variant="danger">Xóa</Button></div>
            </div>
        </div>
    );
}

function Cart_Pay(){
    const {cart,setCart} = useContext(Context);



    const handleCheckboxChange = (e) => {
        if (e.target.checked === true){
            const updatedCart = cart.map(item => ({
                ...item,  // Giữ nguyên các thuộc tính khác của item
                Ckeck: true  // Đặt Ckeck = true cho tất cả các item
              }));
              setCart(updatedCart)
        }else{
            const updatedCart = cart.map(item => ({
                ...item,  // Giữ nguyên các thuộc tính khác của item
                Ckeck: false  // Đặt Ckeck = true cho tất cả các item
              }));
              setCart(updatedCart)
        }
      };
  

      const deleteCheckedItems = () => {
        const updatedCart = cart.filter(item => item.Ckeck !== true);  // Lọc ra các item không có Ckeck = true
        setCart(updatedCart);  // Cập nhật lại giỏ hàng
      }


    const countCheckedItems = () => 
        cart.filter(item => item.Ckeck === true).length;
    const calculateTotal = () => 
         cart
            .filter(item => item.Ckeck === true)  // Lọc chỉ những item có Ckeck = true
            .reduce((total, item) => total + item.price * item.quantity, 0);  // Tính tổng

    
    return(
        <div className={Style.CartPay} >
            <div>
                <div className={Style.CartPay_Input} ><input onChange={handleCheckboxChange} type="checkbox" name="terms" value="agree" required/></div>
                <div><Button variant="danger" onClick={deleteCheckedItems} >Xóa Sản Phẩm </Button></div>
            </div>

            <div>
                <div><p>Tổng thanh toán ({countCheckedItems().toLocaleString('vi-VN')} Sản phẩm):<span id={Style.CartPay_Price} >₫{calculateTotal().toLocaleString('vi-VN')}</span></p></div>
                <div className={Style.CartPay_purchase} ><Button variant="danger">Mua Hàng</Button></div>
            </div>
              
        </div>
    );
}

function Notification({text}){
    return(
        <h1 style={{textAlign:"center"}} >{text}</h1>
    )
}

function Cart_defaul(){
    
    const {cart,setcart} = useContext(Context)
    

    return(
        <>
        <div className={Style.Header_Cart}>
            <Header_Cart/>
        </div>
      
        <div className={Style.Body_Cart}>
            {
                cart.length > 0 
                ? cart.map((e, i) => {
                    return <Body_Cart key={i} iteam={e} />;
                    })
                : <Notification text="Chưa Có Sản Phẩm Nào" />
            }
                        
   
        </div>

        <div className={Style.Pay_Cart}>
            <Cart_Pay/>
        </div>

        <div>
            <div className={Style.Pay_List}>
                
            </div>
        </div>
      
       
        </>
    );
}


function Cart() {
    return ( 
    <div className={Style.Container_Cart}>
        <div  className={Style.Container}>
        <Cart_defaul/>
        </div> 
    </div>);
}

export default Cart;