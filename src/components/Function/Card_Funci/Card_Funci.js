//Chưa Các Chức Năng Cơ Bản Của Card  THêm Sửa Xóa Ckeck


//Khai Báo Biến Toàn Cục




//Thêm Sản Phẩm Vào Giỏ Hàng
function Add_To_Card({ props, cart, setCart }){

      // Kiểm tra xem item đã tồn tại trong giỏ hàng chưa
      const existingItem = cart.find(cartItem => cartItem.productId === props.productId);
    
      if (existingItem) {
          // Nếu đã tồn tại, cập nhật số lượng
        //   const updatedCart = cart.map(cartItem =>
        //       cartItem.productId === props.productId
        //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
        //           : cartItem
        //   );
        //   setCart(updatedCart);

        const newQuantity = existingItem.quantity ? existingItem.quantity + 1 : 1; // Cộng 1 vào quantity nếu có, nếu không có thì tạo quantity = 1
        console.log(newQuantity);  // Kiểm tra kết quả console.log
        Change_quantity({ props, quantity: newQuantity, cart, setCart });
      } else {  
          // Nếu chưa, thêm mới vào giỏ hàng
          setCart([...cart, { ...props, quantity: 1 }]);
      }
      
}


function Change_quantity({ props, quantity, cart, setCart }) {
    // Chuyển đổi quantity thành số nếu nó là chuỗi
    const numericQuantity = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

    // Duyệt qua từng phần tử trong giỏ hàng (cart)
    const updatedCart = cart.map(cartItem => {
        // Kiểm tra nếu productId của phần tử trong giỏ hàng trùng với productId của sản phẩm cần cập nhật
        if (cartItem.productId === props.productId) {
            // Nếu trùng, tạo một đối tượng mới với số lượng được cập nhật
            return { ...cartItem, quantity: numericQuantity };  // Cập nhật số lượng mới
        }
        // Nếu không trùng, giữ nguyên phần tử đó trong giỏ hàng
        return cartItem;
    });

    // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
    setCart(updatedCart);
}

function Delete_Card({ props, cart, setCart }){
  
    
    //  Lọc ra những sản phẩm không trùng với sản phẩm cần xóa
     const updatedCart = cart.filter(cartItem => cartItem.productId !== props.productId);

     // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
     setCart(updatedCart);
}

export {Add_To_Card,Change_quantity,Delete_Card}

