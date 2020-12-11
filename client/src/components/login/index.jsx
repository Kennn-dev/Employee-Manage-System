import styled from 'styled-components';

export const FormLogin = styled.form`
width : 900px;
height : 500px;
background-color : #f8f8f8;
border-radius : 20px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
`;

export const ContainerMiddle = styled.div`
padding : 50px;
`;

export const TitleH1 = styled.h1`
font-weight : 500;
font-style : normal;
line-height : 58.59px;
`;

export const BigImage = styled.div`
width : 100%;
height : 500px;
border-radius : 0px 20px 20px 0px;
background-size : cover;
background-image : url(${props => props.url || ""} );
`

export const InputItems = styled.div`
margin-top : 10px;
`;

export const CustomInput = styled.input`
name : ${props => props.name || ""};
width: ${props => props.width || "100%" };
height:  ${props => props.height || "50%" };
background: #fbfbfb;
border-width:0px;
border-radius: 10px;
padding : 10px;
margin-top : 10px;

&:hover{
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.25);
    transition-duration : 0.2s;
}
`;