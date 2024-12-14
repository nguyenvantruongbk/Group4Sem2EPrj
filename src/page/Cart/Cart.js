// import Style from "./Cart.module.css"
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Button } from "react-bootstrap";

// import Context from "../../Context/Context";
// import { useContext } from 'react';
// import context from "react-bootstrap/esm/AccordionContext";
// import { useEffect } from "react";

// //importChucNang
// import { Change_quantity } from "../../components/Function/Card_Funci/Card_Funci";
// import { Delete_Card } from "../../components/Function/Card_Funci/Card_Funci";

// function Header_Cart(){
//     const {cart,setCart} = useContext(Context);
//     const handleCheckboxChange = (e) => {
//         if (e.target.checked === true){
//             const updatedCart = cart.map(item => ({
//                 ...item,  // Giữ nguyên các thuộc tính khác của item
//                 Ckeck: true  // Đặt Ckeck = true cho tất cả các item
//               }));
//               setCart(updatedCart)
//         }else{
//             const updatedCart = cart.map(item => ({
//                 ...item,  // Giữ nguyên các thuộc tính khác của item
//                 Ckeck: false  // Đặt Ckeck = true cho tất cả các item
//               }));
//               setCart(updatedCart)
//         }
//       };
//     return(
//         <>
//         <div className={Style.Cart_Layout}>

//                 <div className={Style.Cart_Layout_Left}>
//                     <div><input type="checkbox" name="terms" value="agree" onChange={handleCheckboxChange}  required/></div>
//                     <div><p>Sản Phẩm</p></div>
//                 </div>
//                 <div className={Style.Cart_Layout_Right}>
//                     <div><p>Đơn Giá</p></div>
//                     <div><p>Số Lượng</p></div>
//                     <div><p>Số Tiền</p></div>
//                     <div><p>Thao Tác</p></div>
//                 </div>
//         </div>
       

      

//        </>
      
//     );
// }

// function Body_Cart(e){
//     const {cart,setCart} = useContext(Context);
//     var iteam =  e.iteam

//     useEffect(() => {
//         if (iteam.Ckeck === undefined) {
//           iteam.Ckeck = false; // Gán giá trị mặc định là false
//         }
//     }, [iteam]);

 

//     function handleQuantityChange(props,e){
//         var quantity = e.target.value
//         if (!isNaN(quantity) && quantity !== "") {

//             Change_quantity({props:iteam,quantity,cart,setCart})
//           } else {
//             // quantity không phải là số hợp lệ
//           }

//     }

//     function Delete_Card_Onclick(){
//         Delete_Card({props:iteam,cart,setCart})
//     }


   
//     const handleCheckboxChange = (e) => {
//         const updatedCart = cart.map(item => {
//           if (item === iteam) {
//             return { ...item, Ckeck: e.target.checked }; // Cập nhật `Ckeck` của sản phẩm
//           }
//           return item;
//         });
//         console.log(updatedCart)
//         setCart(updatedCart); // Cập nhật lại giỏ hàng
//       };


 



//     return(
//         <div  className={`${Style.Cart_Layout} ${Style.BodyCart}`} >

//             <div className={Style.Cart_Layout_Left}>
//                 <div><input type="checkbox" name="terms" value="agree"  checked={iteam.Ckeck}  onChange={handleCheckboxChange}   required /></div>
//                 <div className={Style.Body_Cart_Img}>
//                     <img src={iteam.images}/>
//                 </div>
//                 <div className={Style.Body_Cart_Name} >
//                     <a href="" ><p> {iteam.title}</p></a>
//                 </div>
//             </div>
//             <div className={Style.Cart_Layout_Right}>
//                 <div className={Style.Cart_Layout_Right_Unit_Price}><p>₫{iteam.price}</p></div>
//                 <div className={Style.Cart_Layout_Right_Quantity}>
//                     <p> 
                       
//                         <span className="mx-2"> 
//                             <input type="number" id="age" name="age"  min="1" max="5"  onChange={(e) => handleQuantityChange(iteam,e)} value={iteam.quantity}  />  
//                         </span>
                      
//                     </p>
//                 </div>
//                 <div className={Style.Cart_Layout_Right_Price} ><p>₫{(iteam.price*iteam.quantity).toFixed(2)}</p></div>
//                 <div className={Style.Cart_Layout_Right_Operation}> <Button onClick={() => Delete_Card_Onclick()} variant="danger">Xóa</Button></div>
//             </div>
//         </div>
//     );
// }

// function Cart_Pay(){
//     const {cart,setCart} = useContext(Context);



//     const handleCheckboxChange = (e) => {
//         if (e.target.checked === true){
//             const updatedCart = cart.map(item => ({
//                 ...item,  // Giữ nguyên các thuộc tính khác của item
//                 Ckeck: true  // Đặt Ckeck = true cho tất cả các item
//               }));
//               setCart(updatedCart)
//         }else{
//             const updatedCart = cart.map(item => ({
//                 ...item,  // Giữ nguyên các thuộc tính khác của item
//                 Ckeck: false  // Đặt Ckeck = true cho tất cả các item
//               }));
//               setCart(updatedCart)
//         }
//       };
  

//       const deleteCheckedItems = () => {
//         const updatedCart = cart.filter(item => item.Ckeck !== true);  // Lọc ra các item không có Ckeck = true
//         setCart(updatedCart);  // Cập nhật lại giỏ hàng
//       }


//     const countCheckedItems = () => 
//         cart.filter(item => item.Ckeck === true).length;
//     const calculateTotal = () => 
//          cart
//             .filter(item => item.Ckeck === true)  // Lọc chỉ những item có Ckeck = true
//             .reduce((total, item) => total + item.price * item.quantity, 0);  // Tính tổng

    
//     return(
//         <div className={Style.CartPay} >
//             <div>
//                 <div className={Style.CartPay_Input} ><input onChange={handleCheckboxChange} type="checkbox" name="terms" value="agree" required/></div>
//                 <div><Button variant="danger" onClick={deleteCheckedItems} >Xóa Sản Phẩm </Button></div>
//             </div>

//             <div>
//                 <div><p>Tổng thanh toán ({countCheckedItems().toLocaleString('vi-VN')} Sản phẩm):<span id={Style.CartPay_Price} >₫{calculateTotal().toLocaleString('vi-VN')}</span></p></div>
//                 <div className={Style.CartPay_purchase} ><Button variant="danger">Mua Hàng</Button></div>
//             </div>
              
//         </div>
//     );
// }

// function Notification({text}){
//     return(
//         <h1 style={{textAlign:"center"}} >{text}</h1>
//     )
// }

// function Cart_defaul(){
    
//     const {cart,setcart} = useContext(Context)
    

//     return(
//         <>
//         <div className={Style.Header_Cart}>
//             <Header_Cart/>
//         </div>
      
//         <div className={Style.Body_Cart}>
//             {
//                 cart.length > 0 
//                 ? cart.map((e, i) => {
//                     return <Body_Cart key={i} iteam={e} />;
//                     })
//                 : <Notification text="Chưa Có Sản Phẩm Nào" />
//             }
                        
   
//         </div>

//         <div className={Style.Pay_Cart}>
//             <Cart_Pay/>
//         </div>

//         <div>
//             <div className={Style.Pay_List}>
                
//             </div>
//         </div>
      
       
//         </>
//     );
// }


// function Cart() {
//     return ( 
//     <div className={Style.Container_Cart}>
//         <div  className={Style.Container}>
//         <Cart_defaul/>
//         </div> 
//     </div>);
// }

// export default Cart;

import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Context from '../../Context/Context';
import Style from './Cart.module.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const Cart = () => {
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate(); // Khởi tạo useNavigate
  // Xử lý checkbox chọn tất cả sản phẩm
  const handleSelectAll = (e) => {
    const updatedCart = cart.map((item) => ({ ...item, Ckeck: e.target.checked }));
    setCart(updatedCart);
  };

  // Xóa các sản phẩm được chọn
  const handleDeleteSelected = () => {
    const updatedCart = cart.filter((item) => !item.Ckeck);
    setCart(updatedCart);
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cart
      .filter((item) => item.Ckeck)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Tính số lượng sản phẩm được chọn
  const countSelectedItems = () => cart.filter((item) => item.Ckeck).length;
    const handleCheckout = () => {
        const selectedItems = cart.filter(item => item.Ckeck); // Chỉ chọn các sản phẩm đã đánh dấu
        const totalAmount = calculateTotal();

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }

        navigate('/payment', {
            state: { cart: selectedItems, total: totalAmount }
        });
    };
  return (
    <div className={`container ${Style.cartContainer} mt-4`}>
      <h2 className="text-center mb-4">Giỏ Hàng</h2>

      {/* Header */}
      <div className={`row ${Style.cartHeader} py-2 border-bottom fw-bold text-center`}>
        <div className="col-1">
          <input type="checkbox" onChange={handleSelectAll} />
        </div>
        <div className="col-4">Sản phẩm</div>
        <div className="col-2">Đơn giá</div>
        <div className="col-2">Số lượng</div>
        <div className="col-2">Thành tiền</div>
        <div className="col-1">Xóa</div>
      </div>

      {/* Body */}
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className={`row py-3 align-items-center text-center border-bottom ${Style.cartItem}`}>
            <div className="col-1">
              <input
                type="checkbox"
                checked={item.Ckeck || false}
                onChange={(e) => {
                  const updatedCart = cart.map((i) =>
                    i === item ? { ...i, Ckeck: e.target.checked } : i
                  );
                  setCart(updatedCart);
                }}
              />
            </div>
            <div className="col-4 text-start d-flex align-items-center">
              <img
                src={item.img}
                alt={item.title}
                className="me-3"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
              <span>{item.name}</span>
            </div>
            <div className="col-2">{item.price.toLocaleString()} VND</div>
            <div className="col-2">
              <input
                type="number"
                className="form-control"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const updatedCart = cart.map((i) =>
                    i === item ? { ...i, quantity: parseInt(e.target.value) || 1 } : i
                  );
                  setCart(updatedCart);
                }}
              />
            </div>
            <div className="col-2">{(item.price * item.quantity).toLocaleString()} VND</div>
            <div className="col-1">
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  const updatedCart = cart.filter((i) => i !== item);
                  setCart(updatedCart);
                }}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">Giỏ hàng của bạn đang trống.</div>
      )}

      {/* Footer */}
      {cart.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-6">
            <Button variant="danger" onClick={handleDeleteSelected}>
              Xóa sản phẩm đã chọn
            </Button>
          </div>
          <div className="col-md-6 text-end">
            <h5>
              Tổng thanh toán ({countSelectedItems()} sản phẩm):{' '}
              <span className="text-danger">{calculateTotal().toLocaleString()} VND</span>
            </h5>
            <Button variant="primary" className="mt-2" onClick={handleCheckout}>
              Thanh toán
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
