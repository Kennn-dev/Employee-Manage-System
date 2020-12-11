import React from 'react'
import styled from 'styled-components'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link
  } from "react-router-dom";


//components
import Employee from './Employee'
import Request from './Request'
import Home from './Home'

const MainStyled = styled.div`
    height: 630px;
    overflow-x: hidden;
    padding: 10px;

    &:hover{
        overflow-x : scroll;
    }
`

export function Main() {
let { path, url } =   useRouteMatch();

return (
    <>
    <MainStyled>
        <Switch>
            <Route exact path={path}>
                <Home/>
            </Route>
            <Route path={`${path}/employee`}>
                <Employee />
            </Route>
            <Route path={`${path}/request`}>
                <Request />
            </Route>
        </Switch>
    </MainStyled>
    </>
    )
}
