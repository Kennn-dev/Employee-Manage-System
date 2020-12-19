
import {Row , Col} from 'reactstrap';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import {useRecoilState} from 'recoil'
import {FiSearch} from 'react-icons/fi'
import {IoNotificationsOutline} from 'react-icons/io5'

import {AvatarRectangleCard} from '../cards/AvatarCard'
import {TextBlack} from '../text/index'
import {CustomInput} from '../login/index'

//state
import {user} from '../../graphql/var/userVar'
import {clickSideBar} from '../../states/navbarState'

export const NavBar= () =>{
    const [title] = useRecoilState(clickSideBar)
    const currentUser = useReactiveVar(user) 



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
            <TextBlack fontSize="30px" fontWeight="500">
                { title.sideBar != "Home" || "" ? title.sideBar : `Welcome back ${user.username}` }
            </TextBlack>
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
            <IoNotificationsOutline style={{margin: "0 10px"}} size="30px"/>
            <AvatarRectangleCard name={currentUser.username} position={currentUser.position}/>
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
    justify-content : space-around;
    padding : 0 10px;
`
