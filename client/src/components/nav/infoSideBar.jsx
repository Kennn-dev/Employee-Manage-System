import React, {useState } from 'react'
import styled from 'styled-components'

import {useRecoilState} from 'recoil'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


import {itemsInfoSideBar} from '../../states/navbarState'
import {SideBarStyled} from '../sidebar'
import { TextBlackUnderline} from '../text/index'
import Holiday from './Holiday'

export  function InfoSideBar() {
    const [components] = useRecoilState(itemsInfoSideBar)
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <InfoBarStyled>
                <ItemInfoBarStyled>
                <TextBlackUnderline fontSize="16px">Calendar</TextBlackUnderline>
                    <Calendar
                        className="custom-calendar"
                        onChange={onChange}
                        value={value}
                    />
                </ItemInfoBarStyled>  
                <ItemInfoBarStyled >
                    <Holiday/>
                </ItemInfoBarStyled> 
            </InfoBarStyled>
        </div>
    )
}



const InfoBarStyled = styled(SideBarStyled)`
    width : 337px;
    overflow : hidden;
    height : 670px;
    &:hover{
        overflow-y : scroll;
        overflow-x : hidden;
    }

`
const ItemInfoBarStyled = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    margin : 10px 0;
    width : ${props => props.width ? props.width : "100%"};
`
//height : 595px
//width : 225px 
// margin-left : 1128px2

