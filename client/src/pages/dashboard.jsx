import React from 'react'
import { Row , Col } from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../custom.css'



// import {adminState} from '../states/adminState'
// import {clickSideBar} from '../states/navbarState'

//components
import {NavBar} from '../components/nav/index'
import SideBar from '../components/nav/SideBar'
import {Main} from './dashboard/main'
import {InfoSideBar} from '../components/nav/infoSideBar'

export default function Dashboard() {
    // const admin = useRecoilValue(adminState)
    return (
        <div className="dashboard">
            <NavBar />
            <Row style= {{
                marginTop : "90px",
                boxSizing : "border-box",
                height : "100%",
                width : "100%"
                }}>
                <Col lg="1">
                    <SideBar />
                </Col>
                <Col lg="8" 
                    className="main-tab"
                >  
                    <Main/>
                </Col>
                <Col lg="3">
                    <InfoSideBar/>
                </Col>
            </Row>
        </div>
    )
}
