import { useReactiveVar } from '@apollo/client';
import {
    Link,
    useHistory
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useRecoilState, useRecoilValue} from 'recoil'
import {itemSideBar, clickSideBar, itemSideBarEmployee} from '../../states/navbarState'

//
import {auth} from '../../graphql/var/authVar'
import {user} from '../../graphql/var/userVar'

//cpn
import {SideBarStyled,SideBarItem} from '../sidebar'
//icons
import { FiLogOut } from "react-icons/fi";
 

export default function SideBar() {
    //state
    const history = useHistory();
    const [currentStateBar , setCurrentStateBar] = useRecoilState(clickSideBar)
    const currentUser = useReactiveVar(user)
    const sideBarState = useRecoilValue(itemSideBar)
    const sideBarEmployeeState = useRecoilValue(itemSideBarEmployee)

    const handleClick = (name) => {
        let newVal = {
            ...currentStateBar,
            sideBar : name
        }
        setCurrentStateBar(newVal)
    }

    const logout = () => {
        auth(false)
        Cookies.remove('accessToken');
        history.push('/');
      };
   
    return (
        <div className="">
            <SideBarStyled>
                <div className="top_side_bar">
                    {
                        currentUser.position == 'Admin' ? 
                        sideBarState.map((item)  =>
                        <SideBarItem 
                            active={item.name == currentStateBar.sideBar ? true : false}
                            onClick={()=>handleClick(item.name)} 
                            ><Link to ={item.href}>
                                {item.icon}</Link>
                        </SideBarItem>
                        ):
                        sideBarEmployeeState.map((item)  =>
                        <SideBarItem 
                            active={item.name == currentStateBar.sideBar ? true : false}
                            onClick={()=>handleClick(item.name)} 
                            ><Link to ={item.href}>
                                {item.icon}</Link>
                        </SideBarItem>
                        )

                        
                    }
                </div>
                <div className="bot" style={{width : "90%"}}>
                    <SideBarItem onClick={() => logout()}>
                        <FiLogOut size="20px" color = "#F8f8f8"/>
                    </SideBarItem>
                </div>
            </SideBarStyled>
        </div>
    )
}
