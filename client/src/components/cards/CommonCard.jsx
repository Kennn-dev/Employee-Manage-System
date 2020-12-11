import React from 'react'
import styled from 'styled-components'

export const CommonCard = styled.div`
    width : ${props => props.width ? props.width : "90%"};
    height : ${props => props.height ? props.height : "350px"};
    display : inline-table;
    padding : 30px 40px;
    background : #ffff;
    border-radius : 20px;
    margin : 1rem 0;
    &:hover{
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
    }
`