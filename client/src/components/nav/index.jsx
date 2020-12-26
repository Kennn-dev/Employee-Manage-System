import {Row , Col} from 'reactstrap';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import {useRecoilState} from 'recoil'
import {FiSearch} from 'react-icons/fi'
import {MdExpandMore} from 'react-icons/md'
import {HiMenuAlt3} from 'react-icons/hi'

import DropdownMenu from '../DropdownMenu'
import {AvatarRectangleCard} from '../cards/AvatarCard'
import {TextBlack} from '../text/index'
import {CustomInput} from '../login/index'

//state
import {user} from '../../graphql/var/userVar'
import {showMenu ,hideInfoBar} from '../../graphql/var/uiVar'
import {clickSideBar} from '../../states/navbarState'

export const NavBar= () =>{
    const [title] = useRecoilState(clickSideBar)

    const infoBarStatus = useReactiveVar(hideInfoBar)
    const currentUser = useReactiveVar(user)
    const showStatus = useReactiveVar(showMenu) 

    const items = [
        {title : "List" , path : "/dashboard/employee/list"},
        {title : "Shift" , path : "/dashboard/employee/shift"},
    ]

    return (
    <Row>
    <NavBarStyled>
        <Col lg="1">
            <TextBlack fontSize ="40px" fontWeight ="700">
                C
            </TextBlack>
        </Col>
        <Col lg="8">
            <NavBarMidItems>
            <div style={{position : "relative"}}>
                <TextBlack fontSize="30px" fontWeight="500">
                    { title.sideBar != "Home" || "" ? title.sideBar : `Welcome back ${currentUser.username}` }
                    <MdExpandMore 
                        onClick={() => showMenu(!showStatus)}
                        size="24px" 
                        style={{marginLeft : "10px" , cursor : "pointer"}} 
                    />
                </TextBlack>
                <DropdownMenu isShow={showStatus} items = {items}/>
            </div>
            <div className="input-custom">
                <FiSearch style={{
                    color: "rgb(36, 36, 36)",
                    position: "relative",
                    left: "316px",
                    bottom: "2px",
                    zIndex: "1",}} 
                size="20" 
                color="#242424"/>
                <CustomInput
                    style = {{marginLeft : "30px"}}
                    name = "Search"
                    width = "300px"
                    height = "35px"
                />
            </div>
            
            </NavBarMidItems>
        </Col>
        <Col lg="3">
            <NavBarEndItems>
            <AvatarRectangleCard name={currentUser.username} position={currentUser.position}/>
            <HiMenuAlt3 onClick={() => hideInfoBar(!infoBarStatus)} style={{margin: "0 10px" , cursor : "pointer"}} size="30px"/>
            </NavBarEndItems>
        </Col>
    </NavBarStyled>
    </Row>
    )
}



const NavBarStyled = styled.nav`
    display : flex;
    align-items : center;
    width : 100%;
    padding : 10px 20px;
    position : fixed ;
    top : 0;
    left : 0;
    background : #ffff;
    z-index : 3;
`
const NavBarMidItems = styled.div`
    display : flex;
    padding : 0px;
    align-items : center;
    justify-content : space-between;
`
const NavBarEndItems = styled(NavBarMidItems)`
    justify-content : flex-end;
    padding : 0 10px;
`
