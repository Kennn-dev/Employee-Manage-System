import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import { useRecoilState } from 'recoil'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
//pages
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'

import { useReactiveVar } from '@apollo/client';
import {auth} from './graphql/var/authVar'

import {PrivateRoute} from './components/routes/PrivateRoute'

export default function App() {
  const isAuth = useReactiveVar(auth)
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
          <Route 
              exact
              path="/"
              component={() => <Redirect to="/dashboard" />}
          />
          <PrivateRoute
            path="/dashboard"
            isAuth = {isAuth}
            component={Dashboard}
          />
          <Route path="*" >
            <h1>404 - Page not found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
