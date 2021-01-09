import styled from 'styled-components'
export const SideBarStyled = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    height : 670px;
    justify-content : space-between;
    background-color : #ffff;
    width  : 90px;
    position : fixed;
    cursor: pointer;
    transition-duration : 0.2s;
    /* height : 100%; */
`
export const SideBarItem = styled.div`
    display : flex;    
    border-radius: 15px;
    justify-content: space-around;
    padding : 15px 30px;
    margin-top : 30px;
    align-items : center;
    /* cursor : pointer; */
    
    background-color : ${props => props.active ? "#242424" : "#ffff"};
    transition-duration : 0.2s;
    &>a,svg{
        font-weight : 500;
        color : ${props => props.active ? "#f8f8f8 !important" : "#242424 !important"};
        text-decoration : none;
    }
    &:hover{
        &>a,svg{   
            color : #f8f8f8 !important;
        }
        background-color : #242424;
        text-decoration : none;
    }

`
