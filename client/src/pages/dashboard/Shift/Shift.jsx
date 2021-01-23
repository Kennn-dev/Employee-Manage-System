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
import TimePicker from 'react-time-picker';
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
 import {FormMaxWidthHeight} from '../Employee/Employee'
 import {ListStyled , ItemListStyled} from '../../../components/nav/Holiday'
 import {AiOutlineMore } from 'react-icons/ai'

import ManageShift from './ManageShift'
import SignUpShift from './SignUpShift'

//global state
import {user} from '../../../graphql/var/userVar'
import {useReactiveVar } from '@apollo/client'

//query
import {
    GET_ALL_SHIFTS,
    GET_EMPLOYEES_BY_DATE,
    GET_ALL_EMPLOYEES
} from '../../../graphql/query/index'
import {
    ADD_SHIFT,
    ADD_WORK_DAY
} from '../../../graphql/mutation/index'


function Shift() {
    const currentUser = useReactiveVar(user)
    
    const [currentDate , setCurrentDate] = useState()
    const [shift, setShift] = useState([])
    const [empList, setEmpList] = useState([]);
    const [onShiftAdd, setOnShiftAdd] = useState(false)
    const [onAdd, setOnAdd] = useState(false)
    const [shiftCur, setShiftCur] = useState()
    const [week, setWeek] = useState([])
    const [timeStart, setTimeStart] = useState();
    const [timeEnd, setTimeEnd] = useState();
    const [value, onChange] = useState(new Date());


    const { register, handleSubmit, errors , control, getValues} = useForm();
    const { register : registerShift,control : controlShift, handleSubmit : handleSubmitShift, errors : errorShifts } = useForm();
    
    //queries
    const { loading : loadingGetAllShifts, data : dataGetAllShifts ,refetch } = useQuery(GET_ALL_SHIFTS , {
        onCompleted : () => {
            let newData = shift;
            dataGetAllShifts.getAllShifts.map(i => {
                newData.push({value : {start : i.timeStart , end : i.timeEnd}, label : i.name})
            })
            setShift(newData)}
            ,
        onError : (err) => { toast(`⛔ ${err}`)}
    });
    const { loading : loadingGetAllEmployees, data : dataGetAllEmployees } = useQuery(GET_ALL_EMPLOYEES , {
        onCompleted : () => {
            let newArr = empList;
            dataGetAllEmployees.getAllEmployees.map(i => {
                newArr.push({value : i.id, label : i.name})
            })
            setEmpList(newArr)}
            ,
        onError : (err) => { toast(`⛔ ${err}`)}
    });
    const [loadEmployeeByDate,{ loading : loadingGetEmployeeByDate, data : dataGetEmployeeByDate , refetch : refetchGetEmployeeByDate}] = useLazyQuery(GET_EMPLOYEES_BY_DATE,{
    });
    
    //mutation
    const [addShift,{ loading: loadingAddShift }] = useMutation(ADD_SHIFT,{
        credentials: 'include',
        refetchQueries :[
            {query :GET_ALL_SHIFTS }
        ],
        onCompleted : () => {
            toast("✅ Successfully")
        },
        onError : () => {
            toast("⛔ Mutation has failed")
        },
        
    });
    const [addWorkDay,{ loading: loadingAddWorkDay}] = useMutation(ADD_WORK_DAY,{
        credentials: 'include',
        onCompleted : () => {
            toast("✅ Successfully")
        },
        onError : () => {
            toast("⛔ Mutation has failed")
        },
        
    });

    const onSubmit = (data) => {
        console.log(data)
        addWorkDay({
            variables : {
                idEmployee : data.employee.value,
                date : currentDate,
                timeStart : data.shift.value.start,
                timeEnd : data.shift.value.end
            }
        })
        loadEmployeeByDate({
            variables : { date : currentDate}
        })
        // data.days.map(i => {if(i === false) console.log(i.time)})
    }
    const onSubmitShift = (data) => {
        addShift({
            variables : {
                name : data.name,
                timeStart : timeStart,
                timeEnd : timeEnd
            }
        })
        refetchGetEmployeeByDate()
    }

    const handleChange = (value , event) => {
        const newDate = moment(value).format("DD-MM-YYYY")
        setCurrentDate(newDate)
        loadEmployeeByDate({
            variables : { date : newDate}
        })
    }

    const handleSelectChange = selectedOption => {
         console.log(`Option selected:`, selectedOption);
    }

    const handleSelectEmpChange = selectedOption => {
        console.log(`Option selected:`, selectedOption);    
    }
   
    return (
        <Router>
            <div>
                <Row>
                    <Col>
                    <CommonCard width="100%">
                    <div style={{display : "flex"}}>
                    <Tag><Link to="/dashboard/shift">Employees</Link></Tag>
                    {currentUser.position === "Admin" && <Tag><Link to="/dashboard/shift/list">Manage Shift</Link></Tag>}
                    </div>
                        <Calendar
                            onChange={onChange}
                            value={value}
                            onClickDay = {handleChange}
                        />
                    </CommonCard>
                    </Col>
                    <Col>
                    <Route exact={true} path="/dashboard/shift" component={() => <SignUpShift
                        setOnAdd = {setOnAdd}
                        loading = {loadingGetEmployeeByDate}
                        data ={dataGetEmployeeByDate}
                        currentDate = {currentDate}
                    />}/>
                    <Route path="/dashboard/shift/list" component={() => <ManageShift
                        setOnShiftAdd = {setOnShiftAdd}
                        data = {dataGetAllShifts}
                        loading = {loadingGetAllShifts}
                    />}/>
                    </Col>
                </Row>
                <Rodal visible={onAdd} onClose={() => setOnAdd(false)} showCloseButton={true}>
                    <FormMaxWidthHeight onSubmit={handleSubmit(onSubmit)} >

                        <ContainerMiddle style={{overflow : "scroll"}}>
                        <TitleH1 >Sign Up Shift</TitleH1>
                        <section>
                        <TextBlack style={{margin : "10px 0"}} fontWeight ="500" fontSize = "16px">Shift</TextBlack>
                        {loadingGetAllShifts ?<ReactLoading type={"spin"} color={"#242424"} height={24} width={24} /> :
                            <Controller
                                as={Select}
                                options={shift}
                                name="shift"
                                isClearable
                                control={control}
                                onChange={handleSelectChange}
                            />
                        }
                        </section>
                        {
                            currentUser.position === "Admin" &&  
                            <section>
                            <TextBlack style={{margin : "10px 0"}} fontWeight ="500" fontSize = "16px">Employee</TextBlack>
                            {loadingGetAllEmployees ?<ReactLoading type={"spin"} color={"#242424"} height={24} width={24} /> :
                                dataGetAllEmployees && <Controller
                                    as={Select}
                                    options={empList}
                                    name="employee"
                                    isClearable
                                    control={control}
                                    onChange={handleSelectEmpChange}
                                />
                                
                            }
                            </section>
                        }
                        <InputItems>
                            <PrimaryButton onClick={() => setOnAdd(false)} type="submit"> 
                                <TextLight fontWeight = "500" fontSize="14px">Create</TextLight> 
                            </PrimaryButton>
                        </InputItems>
                    </ContainerMiddle>
                 
                    </FormMaxWidthHeight>
                </Rodal>
                <Rodal visible={onShiftAdd} onClose={() => setOnShiftAdd(false)} showCloseButton={true}>
                    <FormMaxWidthHeight onSubmit={handleSubmitShift(onSubmitShift)} >

                        <ContainerMiddle style={{overflow : "scroll"}}>
                        <TitleH1 >Add Shift</TitleH1>
                        <section>
                            <InputItems>
                                <TextBlack fontWeight ="500" fontSize = "16px">Title</TextBlack>
                                <CustomInput  name="name" height = "40px" placeholder="Title ..." ref={registerShift({ required: true })} />
                                {errorShifts.name && <TextError>This field is required</TextError>}
                            </InputItems>
                        </section>
                        <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Time Start</TextBlack>
                        <Controller
                            control={controlShift}
                            name="start"
                            register={registerShift({ required: true })} 
                            render={() => (
                                <TimePicker
                                onChange={setTimeStart}
                                value={timeStart}
                              />
                            )}
                        />
                        </InputItems>
                        <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Time End</TextBlack>
                        <Controller
                            control={controlShift}
                            name="end"
                            register={registerShift({ required: true })} 
                            render={() => (
                                <TimePicker
                                onChange={setTimeEnd}
                                value={timeEnd}
                              />
                            )}
                        />
                        </InputItems>
                        <InputItems>
                            <PrimaryButton type="submit" onClick={() => setOnShiftAdd(false)}> 
                                <TextLight fontWeight = "500" fontSize="14px">Create</TextLight> 
                            </PrimaryButton>
                        </InputItems>
                    </ContainerMiddle>
                 
                    </FormMaxWidthHeight>
                </Rodal>
            </div>
        </Router>
    )
}

export default Shift

export const Tag = styled.div`
    color : #242424;
    padding : 5px;
    background-color : #80808052;
    border-radius : 10px;
    margin : 5px 10px 5px 0;
`