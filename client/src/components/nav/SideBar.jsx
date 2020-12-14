import {
    Link
} from 'react-router-dom'

import { useRecoilState, useRecoilValue} from 'recoil'
import {itemSideBar, clickSideBar} from '../../states/navbarState'

//cpn
import {SideBarStyled,SideBarItem} from '../sidebar'
//icons
import { FiLogOut } from "react-icons/fi";
 

export default function SideBar() {
    //state
    const [currentStateBar , setCurrentStateBar] = useRecoilState(clickSideBar)
    // const [sideBarState , setSideBarState] = useRecoilState(itemSideBar)
    const sideBarState = useRecoilValue(itemSideBar)

    const handleClick = (name) => {
        let newVal = {
            ...currentStateBar,
            sideBar : name
        }
        setCurrentStateBar(newVal)
        // console.log(currentStateBar)
    }
   
    return (
        <div className="">
            <SideBarStyled>
                <div className="top_side_bar">
                    {
                        sideBarState.map((item, index)  =>
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
                    <SideBarItem>
                        <Link to =""><FiLogOut size="20px" color = "#F8f8f8"/></Link>
                    </SideBarItem>
                </div>
            </SideBarStyled>
        </div>
    )
}
