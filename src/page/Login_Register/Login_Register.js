import React, { Suspense, useContext, useEffect, useState,useMemo } from "react";  // Make sure to import useState
import { Canvas , useThree , useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import Style from './Login_Register.module.css';
import { Mesh } from "three";
import { EXRLoader } from "three/examples/jsm/Addons.js";
import { a, useSpring } from "@react-spring/three";
//THREE REACT

function SmoothCamera({ isLogin }) {
    const { camera } = useThree();

    // Dùng react-spring để tạo hiệu ứng di chuyển camera
    const { position, rotation } = useSpring({
        position: isLogin ? [0, 0, 5] : [1, 2, -5], // Camera position khi login và logout
        rotation: isLogin
            ? [0, 0, 5] // Góc 30 độ
            : [-Math.PI / 1, Math.PI / 10, Math.PI/1], // Góc khi logout
        config: { mass: 5, tension: 50, friction: 50 }, // Tinh chỉnh tốc độ và mượt mà
    });

    useFrame(() => {
        // Cập nhật vị trí và góc xoay camera
        camera.position.set(...position.get()); // Cập nhật vị trí camera liên tục
        camera.rotation.set(...rotation.get()); // Cập nhật góc xoay camera liên tục
        camera.lookAt(0, 0, 0); // Giữ camera nhìn vào một điểm cố định
    });

    return null;
}

function ShibaModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
    const { scene } = useGLTF("./obj/coffee/scene.gltf");
    const shibaScene = useMemo(() => scene.clone(), [scene]);

    shibaScene.rotation.set(rotation[0], rotation[1], rotation[2]);
    shibaScene.traverse((object) => {
        if (object instanceof Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            object.material.envMapIntensity = 60;
        }
    });

    return <primitive object={shibaScene} scale={0.04} position={position} />;
}


function RamdomCoffe({ Num }) {
    const [randomCoffees, setRandomCoffees] = useState([]);

    useEffect(() => {
        const coffees = [];
        for (let i = 0; i < Num; i++) {
            const randomX = (Math.random() * 6 - 2).toFixed(2);
            const randomY = (Math.random() * 6 - 0.5).toFixed(2);
            const randomZ = (Math.random() * 6 - 0.5).toFixed(2);
            const rotateX = (Math.random() * 6 - 2).toFixed(1);
            const rotateY = (Math.random() * 6 - 2).toFixed(1);
            const rotateZ = (Math.random() * 6 - 2).toFixed(1);

            coffees.push(
                <Coffe_bean
                    key={i}
                    position={[parseFloat(randomX), parseFloat(randomY), parseFloat(randomZ)]}
                    rotation={[parseFloat(rotateX), parseFloat(rotateY), parseFloat(rotateZ)]}
                />
            );
        }
        setRandomCoffees(coffees);
    }, [Num]);

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

function Canvas_Three_Js({ isLogin }){
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
                <SmoothCamera isLogin={isLogin} />
  
                {/* <OrbitControls/> */}
            
                <RamdomCoffe Num={50}/>
                <ShibaModel  position ={[3,-1.8,0]}  rotation={[0, 0.2, 0.4]}  />
         </Canvas>
      </Suspense>
    );
}

function Login({IsLogin,setIsLogin}){
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
                        <p>Không có tài khoản?<button  onClick={() => setIsLogin(!IsLogin)}  >Đăng Kí</button></p>
                    </div>

         

                </div>

     </div>)
}

function Sign_in({IsLogin,setIsLogin}){
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
                        <p>Đã Có Tài Khoản ? <button   onClick={() => setIsLogin(!IsLogin)}  >Đăng Nhập</button></p>
                    </div>

         

                </div>

     </div>
    )
}

export default function Login_Register() {
    
    const[IsLogin,setIsLogin] = useState(true);

       



  return (
    <div className={Style.Container}>
          
        <div className={Style.Login_Register_Conten}>
           <div className={`${Style.Login_Register_Conten_Login} ${Style.Defaul_Layout}`} >
                <div style={{  clipPath: IsLogin ? "inset(0 0 0 0)" : "inset(0 0 0 100%)"}} >
                    <Login IsLogin={IsLogin} setIsLogin={setIsLogin} />
                </div>
                <div className={Style.Login_Register_KhoangTrong} >
                
                </div>
                <div style={{ clipPath: IsLogin ?"inset(0 0 0 100%)" :"inset(0 0 0 0)" }} >
                    <Sign_in IsLogin={IsLogin} setIsLogin={setIsLogin} />
                </div>
                
            </div>
        </div>
        <div className={Style.Login_Register_Canvas}>
             <Canvas_Three_Js isLogin={IsLogin}/>
        </div>

 
    </div>
  );
}


useGLTF.preload("./obj/Shiba/scene.gltf");
