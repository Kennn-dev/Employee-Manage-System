import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar';
import {TextBlackParagraph , TextBlack} from '../text/index'

const Card = styled.div`
    width : 90%;
    height : 100%;
    border-radius : 10px;
    background-color : #ffff;
    margin-top : 20px;
    padding : 30px 40px ;
    display : flex ;
    flex-direction : column;
    justify-content : space-between;
    align-items : center;
    transition-duration : 0.3s;
    text-align : center;
    &:hover{
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);   
    }
`
const RectangleCard = styled.div`
    padding: 10px 10px;
    background: #ffff;
    border-radius: 30px;
    display : flex;
    align-items : center;
    width: 100%;
    justify-content: space-around;
    cursor : pointer;
    transition-duration : 0.3s;
    &:hover{
        /* border : 1px solid rgb(122 122 122 /30%); */
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);   
    }
`

export const AvatarRectangleCard = ({name, position}) => {
    return (
        <RectangleCard>
            <div className="text_rect_card">
                <TextBlack 
                    fontSize="14px" 
                    fontWeight ="500"
            >{name ? name : "Vo phu hoang nhat"}</TextBlack>
                <TextBlack fontSize="12px" fontWeight ="300">
                    {position ? position : "admin"}
                </TextBlack>
            </div>
            <div className="avatar_rect_card">
                <Avatar facebookId="100013123485420" size="50" round={true}/>
            </div>
        </RectangleCard>
    )
}

export  function AvatarSquareCard( {name , position, email}) {
    return (
        <div>
            <Card>
                <div className="avatar" style={{marginBottom : "10px"}}>
                <Avatar facebookId="100013123485420" size="50" round={true}/>
                </div>
                <div className="info">
                    <TextBlackParagraph 
                        fontSize="16px" 
                        fontWeight ="500"
                    >Vo Phu Hoang Nhat</TextBlackParagraph>
                    <TextBlackParagraph fontSize="14px" fontWeight ="300">Position</TextBlackParagraph>
                    <TextBlackParagraph fontSize="14px" fontWeight ="light">nhatong2015@gmail.com</TextBlackParagraph>
                </div>
                
            </Card>
        </div>
    )
}
