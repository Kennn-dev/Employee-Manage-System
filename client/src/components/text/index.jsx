import styled from 'styled-components'

export const TextBlack = styled.span`
color : #242424;
display : inline-block;
font-size : ${props => props.fontSize || "16px"};
font-weight : ${props => props.fontWeight || "300"};
font-style : normal;
transition-duration : 0.3s;
`;

export const TextBlackParagraph = styled.p`
color : #242424;
font-size : ${props => props.fontSize || "16px"};
font-weight : ${props => props.fontWeight || "300"};
font-style : normal;
transition-duration : 0.3s;
`;

export const TextBlackUnderline = styled(TextBlackParagraph)`
    padding : 10px;
    display : inline-block;
    width : 90%;
    border-bottom : 1px solid #D3D3D3;
`

export const TextLight = styled(TextBlack)`
color : #F8F8F8;
`

export const TextBlackHover = styled(TextBlack)`
    cursor: pointer;
    &:hover{
        color : #ff676a;
    }
`
export const TextError = styled.span`
    color : #ff676a;
    font-size : ${props => props.fontSize || '12px'};
    margin-top : 5px;
`