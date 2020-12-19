import React,{useEffect} from 'react'
import { Row , Col } from 'reactstrap'
import Cookies from 'js-cookie'
import {useRecoilState} from 'recoil'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../custom.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import {loginState} from '../states/adminState'

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
    const [auth , setAuth] = useRecoilState(loginState)
     useEffect(() => {
    const token = Cookies.get('accessToken');
    if(token){ 
        setAuth(true)
    }
    
    }, [])
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
