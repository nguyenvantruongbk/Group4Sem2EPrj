import React, { Suspense, useContext, useEffect, useState } from "react";  // Make sure to import useState
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import Style from './Login_Register.module.css';
import { Mesh } from "three";
import { EXRLoader } from "three/examples/jsm/Addons.js";

//THREE REACT





function ShibaModel({ position = [0, 0, 0],rotation = [0, 0, 0] }) {

    const { scene } = useGLTF("./obj/coffee/scene.gltf");
    const [movement, setMovement] = useState(0);

    scene.rotation.set(rotation[0], rotation[1], rotation[2]);
    useEffect(() => {
        const interval = setInterval(() => {
            setMovement(Math.sin(Date.now() * 0.001) * 0.1); // Tạo hiệu ứng lắc nhẹ
        }, 16); // Cập nhật mỗi frame
        return () => clearInterval(interval);
    }, []);

    scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true; // Kích hoạt đổ bóng
          object.receiveShadow = true; // Nhận đổ bóng
          object.material.envMapIntensity = 60; // Tăng độ phản chiếu môi trường
        }
      });
    return <primitive object={scene} scale={0.04} position={position} />;
}


function RamdomCoffe({ Num }) {
    const randomCoffees = [];
    
    for (let i = 0; i < Num; i++) {
        // Tạo tọa độ ngẫu nhiên trong khoảng [-3, 3], và cho phép phần thập phân
        const randomX = (Math.random() * 6 -2).toFixed(2); // Số ngẫu nhiên với 1 chữ số thập phân
        const randomY = (Math.random() * 6 - 0.5).toFixed(2); // Số ngẫu nhiên với 1 chữ số thập phân
        const randomZ = (Math.random() * 6 - 0.5).toFixed(2); // Số ngẫu nhiên với 1 chữ số thập phân


        const rotateX = (Math.random() * 6 - 2).toFixed(1); // Số ngẫu nhiên với 1 chữ số thập phân
        const rotateY = (Math.random() * 6 - 2).toFixed(1); // Số ngẫu nhiên với 1 chữ số thập phân
        const rotateZ = (Math.random() * 6 - 2).toFixed(1);
        // Thêm đối tượng Coffe_bean với tọa độ ngẫu nhiên vào mảng
        randomCoffees.push(
            <Coffe_bean  position={[parseFloat(randomX), parseFloat(randomY), parseFloat(randomZ)]} rotation={[parseFloat(randomX), parseFloat(randomY), parseFloat(randomZ)]} />
        );
    }

    return <>{randomCoffees}</>;
}



function Coffe_bean({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
    const { scene } = useGLTF("./obj/coffee_bean_-_pbr/scene.gltf");
    const coffeeBeanScene = scene.clone();  // Clone the scene to avoid shared state
  
    coffeeBeanScene.rotation.set(rotation[0], rotation[1], rotation[2]);
    coffeeBeanScene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true; 
        object.receiveShadow = true;
        object.material.envMapIntensity = 60;
      }
    });
  
    return <primitive object={coffeeBeanScene} scale={0.1} position={position} />;
  }

function Canvas_Three_Js(){
    return(
        <Suspense fallback={null}>
            <Canvas >
            
                <ambientLight intensity={0.5} />
          
                <directionalLight position={[0, 1, -1]} rotation={[1,1,3]} intensity={1.5} />
              

                <Environment
                files="./hdri/empty_play_room_2k.exr"
                preset={null} // Không dùng preset mặc định
                background={false}
                loader={EXRLoader} // Dùng EXRLoader để đọc file .exr
             
                />

                <OrbitControls/>
            
                <RamdomCoffe Num={30}/>
                <ShibaModel  position ={[3,-1.8,0]}  rotation={[0, 0.2, 0.4]}  />
         </Canvas>
      </Suspense>
    );
}

function Login(){
    return(<div className={`${Style.Login} ${Style.Defaul}`}>
        <div>
            <div className={Style.Tite}>
                <p>ĐĂNG NHẬP</p>
                </div>
                    <div className={Style.Input}>

                        <span className={Style.Input_Icon} ><i class="bi bi-envelope-check-fill"></i></span>
                        <input  type="email" />
                        <label>Email</label>
                      
                    </div>
                    
                    <div className={Style.Input}>

                        <span className={Style.Input_Icon} ><i class="bi bi-lock-fill"></i></span>
                        <input type="password"  />
                        <label>Mật Khẩu</label>

                    </div>
                    <div className={Style.Remember}>
                        <div><input type="checkbox"/>Nhớ Tôi</div>
                        <div><a href="/">Quên Mật Khẩu?</a></div>
                    </div>
                    
                    <div className={Style.Input_Button}>
                        <button>Đăng Nhập</button>
                    </div>

                    <div className={Style.Input_No_account}>
                        <p>Không có tài khoản?<a  >Đăng Kí</a></p>
                    </div>

         

                </div>

     </div>)
}

function Sign_in(){
    return(
        <div className={`${Style.Login} ${Style.Defaul}`}>
        <div>
            <div className={Style.Tite}>
                <p>ĐĂNG KÍ</p>
                </div>
                    <div className={Style.Input}>

                        <span className={Style.Input_Icon} ><i class="bi bi-envelope-check-fill"></i></span>
                        <input  type="email" />
                        <label>Email</label>
                      
                    </div>
                    
                    <div className={Style.Input}>

                        <span className={Style.Input_Icon} ><i class="bi bi-lock-fill"></i></span>
                        <input type="password"  />
                        <label>Mật Khẩu</label>

                    </div>
                    <div className={Style.Input}>

                        <span className={Style.Input_Icon} ><i class="bi bi-lock-fill"></i></span>
                        <input type="password"  />
                        <label>Nhập Lại Mật Khẩu</label>

                    </div>
                    <div className={Style.Remember}>
                        <div><input type="checkbox"/>Nhớ Tôi</div>
                  
                    </div>
                    
                    <div className={Style.Input_Button}>
                        <button>Đăng Kí</button>
                    </div>

                    <div className={Style.Input_No_account}>
                        <p>Đã Có Tài Khoản ? <a href="/" >Đăng Nhập</a></p>
                    </div>

         

                </div>

     </div>
    )
}

export default function Login_Register() {
    
    const[IsLogin,setIsLogin] = useState(false);

       
    useEffect(() => {
        setIsLogin(false); 
    }, []);


  return (
    <div className={Style.Container}>
          
        <div className={Style.Login_Register_Conten}>
           <div className={`${Style.Login_Register_Conten_Login} ${Style.Defaul_Layout}`} >
                <div style={{   transform: `translateX(${IsLogin ? "100vw" : "0"})`}} >
                    <Login/>
                </div>
                <div className={Style.Login_Register_KhoangTrong} >
                    cc
                </div>
                <div style={{ transform: `translateX(${IsLogin ? "0" : "100vw" })`}} >
                    <Sign_in/>
                </div>
                
            </div>
        </div>
        <div className={Style.Login_Register_Canvas}>
             <Canvas_Three_Js/>
        </div>

 
    </div>
  );
}


useGLTF.preload("./obj/Shiba/scene.gltf");
