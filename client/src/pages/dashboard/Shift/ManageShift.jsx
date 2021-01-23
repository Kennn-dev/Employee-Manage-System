import React, {useEffect, useState} from 'react'

import moment from 'moment'
import Select from 'react-select'
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Row , Col } from 'reactstrap'
import { Table} from 'reactstrap';
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
    CommonButtonBlack
 } from "../../../components/buttons/index";
 import {FormMaxWidthHeight} from '../Employee/Employee'

 import {ListStyled , ItemListStyled} from '../../../components/nav/Holiday'
 import {AiOutlineMore } from 'react-icons/ai'


export default function ManageShift({loading , data, setOnShiftAdd}){
    return(
        <CommonCard width="100%">
           <Table hover responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                </tr>
            </thead>
            <tbody>
                  {
                    loading ? <ReactLoading type={"spin"} color={"#242424"} height={30} width={30} /> :
                    data && data.getAllShifts.map( (i, index) => 
                    <tr>
                      <th scope="row">{index +1}</th>
                      <td>{i.name}</td>
                      <td>{moment(parseInt(i.timeStart)).format("HH:mm")}</td>
                      <td>{moment(parseInt(i.timeEnd)).format("HH:mm")}</td>
                    </tr>
                    )
                  }
                </tbody>
           </Table>
           <CommonButtonBlack onClick={() => setOnShiftAdd(true)}>Add</CommonButtonBlack>
        </CommonCard>
    )
}