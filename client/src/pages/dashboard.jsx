import React,{useEffect} from 'react'
import { Row , Col } from 'reactstrap'
import { useReactiveVar } from '@apollo/client';
import Cookies from 'js-cookie'
import {useRecoilState} from 'recoil'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../custom.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
//state
import {hideInfoBar} from '../graphql/var/uiVar'
import {loginState} from '../states/adminState'

//components
import Employee from './dashboard/Employee'
import Request from './dashboard/Request'
import Home from './dashboard/Home'
import Shift from './dashboard/Shift'

import {NavBar} from '../components/nav/index'
import SideBar from '../components/nav/SideBar'

import {MainStyled} from './dashboard/main'
import {InfoSideBar} from '../components/nav/infoSideBar'


export default function Dashboard() {
    const showInfoBar = useReactiveVar(hideInfoBar)
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
                <Col lg={showInfoBar ? "11" : "8"}
                    className="main-tab"
                >   
                <MainStyled> 
                    <Switch>
                        <Route exact path='/dashboard' component = {Home}/>
                        <Route  path="/dashboard/employee" component={Employee}/>
                        <Route  path="/dashboard/shift" component={Shift}/>
                        <Route  path="/dashboard/request" component={Request}/>
                    </Switch>
                </MainStyled>
                </Col>
                <Col lg={showInfoBar ? "0" : "3"}>
                    <InfoSideBar/>
                </Col>
            </Row>
        </div>
        </Router>
    )
}
