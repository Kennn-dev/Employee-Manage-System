import styled from 'styled-components'

export const PrimaryButton = styled.button`
display: block;
width: 100%;
border: none;
background-color: #242424;
color: white;
padding: 10px 15px ;
font-size: 16px;
cursor: pointer;
text-align: center;
border-radius : 20px;
transition-duration : 0.3s;

&:hover{
    margin-top : 5px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
}
`
export const SecondaryButton = styled(PrimaryButton)`
background-color: #f8f8f8;
border: 1px solid #242424;

`
export const CloseWhiteButton = styled.div`
    width : ${props => props.diameter || "30px"};
    height : ${props => props.diameter || "30px"};
    background: #F8F8F8;
    color : #242424; /* color text inside */
    border-radius : 50%;
    display : flex;
    align-items : center;
    justify-content : center;
    position : absolute;
    top : ${props => props.top || "10px"};
    right : ${props => props.right || "10px"};
    transition-duration : 0.2s;
    cursor : pointer;
    &:hover{
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25);
    }
    
`;
export const CloseBlackButton = styled(CloseWhiteButton)`
    color : #242424;
    background: rgba(248, 248, 248, 0.12);
`
export const CommonButtonBlack = styled.div`
    width : ${props => props.width || '100px'};
    height : ${props => props.height || '50px'};
    display : flex ;
    justify-content : space-around;
    align-items : center;
    text-align : center;
    background : #242424;
    color: #f8f8f8;
    cursor : pointer;
    margin : 10px;
    border-radius : ${props => props.borderRadius || '10px'};
    &:hover{
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25);
    }
`