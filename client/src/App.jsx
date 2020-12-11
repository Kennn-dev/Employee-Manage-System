import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import { useRecoilValue } from 'recoil'
import 'react-toastify/dist/ReactToastify.css';

//pages
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'

import {isAdmin} from './states/adminState'


export default function App() {
  const check = useRecoilValue(isAdmin)
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
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/* <Route 
            exact
            path="/dashboard"
            render = {()=>{
              return (
                check.isAuth ? 
                <Dashboard/> :
                <Redirect to="/login" /> 
              )
            }
            }
          /> */}
          <Route path='/dashboard'>
            <Dashboard/>
          </Route>
          <Route
            exact
            path="/"
            render={() => {
                return (
                  check.isAuth ?
                  <Redirect to="/dashboard" /> :
                  <Redirect to="/login" /> 
                )
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}
