import Header from '../components/Header/Header';
import style from './Admin_Layout.module.css'

function Admin_Layout({children}) {
    return ( 
    <div>
        {/* <div className={style.Container}> */}
            <div>
                <Header/>
            </div>
            <div >
                {children}
            </div>
        {/* </div> */}

        
    </div> );
}

export default Admin_Layout;