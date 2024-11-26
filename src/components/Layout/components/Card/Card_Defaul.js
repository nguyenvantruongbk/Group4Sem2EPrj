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
            <img src={iteam.thumbnail}/>
        </div>
        <div className={Style.Card_Defaul_Conten} >
            <div className={Style.Card_Defaul_Conten_Title}>
                <p>{iteam.title}</p>
            </div>
            <div className={Style.Card_Defaul_Conten_Describe}>
                <p>{iteam.description}</p>
            </div>
            <div className={Style.Card_Defaul_Conten_Star}>
                {
                    [...Array(5)].map((_, i) => (
                        i < Math.floor(iteam.rating) ? (
                            <i key={i} className="bi bi-star-fill"></i>
                        ) : (
                            <i key={i} className="bi bi-star"></i>
                        )
                    ))
                }
              
            </div>
            <div className={Style.Card_Defaul_Conten_Size_Price}>
                <div className={Style.Card_Defaul_Conten_Size_Price_Size} >
               
                    <div key="minimal-radio" style={{ display: 'flex', gap: '10px' }}>
                        
                        <p>Size:</p>
                        <Form.Check
                           className={Style.Input1}
                            name={`group1` + iteam.id}
                            type="radio"
                            id="radio-1"
                            defaultChecked
                            style={{ margin: 0 }} // Loại bỏ khoảng cách
                        />
                        <Form.Check
                            className={Style.Input2}
                            name={`group1` + iteam.id}
                            type="radio"
                            id="radio-2"
                            style={{ margin: 0 }}
                        />
                        <Form.Check
                            className={Style.Input3}
                            name={`group1` + iteam.id}
                            type="radio"
                            id="radio-3"
                            style={{ margin: 0 }}
                        />
                    </div>
            
                </div>
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