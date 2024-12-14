import Style from "./Card.module.css"
import Form from 'react-bootstrap/Form';

//Khai Báo Biến Toàn Cục
import Context from "../../../../Context/Context";
import { useContext } from 'react';


//KhaiBaoChucNang
import { Add_To_Card } from "../../../Function/Card_Funci/Card_Funci";


function Card_Defaul(props) {

   const {cart,setCart} = useContext(Context);
    const iteam = props.iteam

    const handleAddToCart = () => {
        
        Add_To_Card({props:iteam,cart,setCart})
    };

    

    return ( 
    <div className={Style.Card_Defaul} >
        <div className={Style.Card_Defaul_Img} >
            <img src={iteam.img}/>
        </div>
        <div className={Style.Card_Defaul_Conten} >
            <div className={Style.Card_Defaul_Conten_Title}>
                <p>{iteam.name}</p>
            </div>
            <div className={Style.Card_Defaul_Conten_Describe}>
                <p>{iteam.description}</p>
            </div>
          
            <div className={Style.Card_Defaul_Conten_Size_Price}>
            <p>Price:</p>
                     
                <div className={Style.Card_Defaul_Conten_Size_Price_Price} >

                    <p>{iteam.price}</p>
                </div>
            </div>
            <div className={Style.Card_Defaul_Conten_Button}>
                <div className={Style.Card_Defaul_Conten_Button_WachMore} >
                    <button>Chi Tiết</button>
                </div>
                <div className={Style.Card_Defaul_Conten_Button_Add_to_Card} >
                    <button onClick={handleAddToCart}><i class="bi bi-bag-plus"></i></button>
                </div>
            </div>
        </div>
    </div>
    

);
}



export default Card_Defaul;