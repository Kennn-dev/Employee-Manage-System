import React, {useEffect, useState} from 'react'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import moment from 'moment'
import Select from 'react-select'
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { Row , Col } from 'reactstrap'
import { useQuery , useMutation, useLazyQuery } from '@apollo/client';
import { useForm , Controller } from "react-hook-form";
import styled from 'styled-components'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
//components
import {CommonCard} from '../../../components/cards/CommonCard'
import {Menu , MenuItem} from '../../../components/DropdownMenu'
import {
    FormLogin,
    ContainerMiddle,
    TitleH1,
    InputItems,
    CustomInput
} from '../../../components/login/index'
import { 
    TextBlack,
    TextLight,
    TextError
 } from "../../../components/text";
 import { 
    PrimaryButton
 } from "../../../components/buttons/index";
 import {Tag} from './Shift'
 import {FormMaxWidthHeight} from '../Employee/Employee'
 import {ListStyled , ItemListStyled} from '../../../components/nav/Holiday'
 import {AiOutlineMore } from 'react-icons/ai'
  
  export default function SignUpShift({loading , data ,setOnAdd ,currentDate }) {
    const [show, setShow] = useState(false) //dropdown
      return (
          <div>
               <CommonCard width="100%">
                        <div style={{display: "flex" ,alignItems : "center", justifyContent : "space-between"}}>
                        <h3>Employees</h3>
                        <div>
                        <AiOutlineMore onClick={() => setShow(!show)} size="24"/>
                        <Menu show={show}
                            right = "50px"
                        >
                            <MenuItem onClick={() => {
                                setOnAdd(true)
                                setShow(!show);
                                }} >Add</MenuItem>
                        </Menu>
                        </div>
                        </div>
                        <ListStyled>
                            {
                                loading ? <ReactLoading type={"spin"} color={"#242424"} height={30} width={30} /> :
                                data && data.getEmployeeByDate.map(i => 
                                <ItemListStyled>
                                    <div style={{display : "flex"}}>
                                        <div className="content">
                                            <div style={{display : "flex"}}>
                                                {
                                                    i.workDays.filter(day => day.date === currentDate).map(day => <Tag><span>{`${day.timeStart} - ${day.timeEnd}`}</span></Tag>)
                                                }
                                            </div>
                                            
                                            <h5>{i.name}</h5>
                                            <p>{i.position}</p>
                                        </div>
                                        <div className="options"></div>
                                    </div>
                                </ItemListStyled>
                                )  
                            }
                        </ListStyled>
                </CommonCard>
          </div>
      )
  }
  