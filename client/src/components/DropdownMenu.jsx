import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import { useReactiveVar } from '@apollo/client';
import {showMenu} from '../graphql/var/uiVar'

export default function DropdownMenu({items , isShow}) {
    const status = useReactiveVar(showMenu) 
    return (
        <div>
            <Menu show={isShow}>
                {items.map(i =>    
                    <MenuItem>
                        <Link
                        style={{
                            textDecoration : "none",
                            color : "#242424"
                        }}
                        onClick={() => showMenu(!status)}
                        to={i.path}>
                            {i.title}    
                        </Link>
                    </MenuItem>
                )}
            </Menu>
        </div>
    )
}

const Menu = styled.div`
    display : ${props => props.show ? "block" : "none"};  
    border-radius : 10px;
    border : 1px solid rgba(95, 94, 94, 0.28) ;
    padding : 10px 20px;
    position : absolute; 
    background: rgba(248, 248, 248, 0.7);
    right : -10px;
    backdrop-filter: blur(20px);
    z-index : 99;
    transition-duration : 0.3s;
    &:hover{
        box-shadow: 0px 10px 54px rgba(0, 0, 0, 0.05);
    }
`
const MenuItem = styled.div`
    cursor : pointer;
    width : 100%;
    font-size : 16px;
    margin : 10px 0;
    transition-duration : 0.3s;
    border-bottom : 1px solid rgba(95, 94, 94, 0.28);

`