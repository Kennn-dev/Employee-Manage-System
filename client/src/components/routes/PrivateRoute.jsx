import React from 'react'
import {Route , Redirect} from 'react-router-dom'
import {auth} from '../../graphql/var/authVar'
// import * as isAuth from '../functions/isAuth' //return boolean

export function PrivateRoute({ component: Component,isAuth, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          isAuth === true ? (
            <Component />
          ) : (
            <Redirect
              to= "/login"
            />
          )
        }
      />
    );
  }


