import React from 'react'
import { Row , Col } from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../custom.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link
  } from "react-router-dom";



// import {adminState} from '../states/adminState'
// import {clickSideBar} from '../states/navbarState'

//components
// import {Home,  Kitchen, Bedroom } from './test'
import Employee from './dashboard/Employee'
import Request from './dashboard/Request'
import Home from './dashboard/Home'

import {NavBar} from '../components/nav/index'
import SideBar from '../components/nav/SideBar'
// import {Main} from './dashboard/main'
import {MainStyled} from './dashboard/main'
import {InfoSideBar} from '../components/nav/infoSideBar'

export default function Dashboard() {
    return (
        <Router>
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
                <MainStyled> 
                    <Switch>
                        <Route exact path='/dashboard' component = {Home}/>
                        <Route  path="/dashboard/employee" component={Employee}/>
                        <Route  path="/dashboard/request" component={Request}/>
                    </Switch>
                </MainStyled>
                </Col>
                <Col lg="3">
                    <InfoSideBar/>
                </Col>
            </Row>
        </div>
        </Router>
    )
}
