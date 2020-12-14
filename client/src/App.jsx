import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import { useRecoilState } from 'recoil'
import 'react-toastify/dist/ReactToastify.css';

//pages
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'

import {adminState} from './states/adminState'


export default function App() {
  const [check] = useRecoilState(adminState)
  return (
    <Router>
      <div>
        <ToastContainer 
            position = "top-right"
            hideProgressBar = {true}
            closeOnClick = {true}
            pauseOnHover = {true}
            draggable = {true}
            autoClose = {3000}
            />
        <Switch>
          <Route  path="/register" component={Register}/>
          <Route  path="/login" component={Login}/>
          {/* <Route  path="/dashboard" component={Dashboard}/> */}
          <Route 
              exact
              path="/"
              render = {()=>{
                return (
                  // check.isAuth ? 
                  check.id !== "" ?
                  <Dashboard/> :
                  <Redirect to="/login" /> 
                )
              }
            }
          />
          <Route 
              path="/dashboard"
              render = {()=>{
                return (
                  // check.isAuth ? 
                  check.id !== "" ?
                  <Dashboard/> :
                  <Redirect to="/login" /> 
                )
              }
            }
          />
          <Route path="*" >
            <h1>404 - Page not found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
