import React,{useState} from 'react'
import { useForm,Controller} from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import Rodal from 'rodal';
import "react-datepicker/dist/react-datepicker.css";
import formatDistance from 'date-fns/formatDistance'
import ReactLoading from 'react-loading';
// import 
import {IoIosAddCircleOutline} from 'react-icons/io'
import {IconContext } from 'react-icons'
import { Table } from 'reactstrap';
import {AiOutlineReload} from 'react-icons/ai'
import {IoRemoveCircleOutline} from 'react-icons/io5'

import {user} from '../../../graphql/var/userVar'
import {useReactiveVar } from '@apollo/client'

import Select from 'react-select'
import TextTruncate from 'react-text-truncate'; // recommend
import {CommonButtonBlack} from '../../../components/buttons/index'

//componnents'../../pages/dashboard/Employee/Employee'
import {FormMaxWidthHeight} from './Employee'
import {
    ContainerMiddle,
    TitleH1,
    InputItems,
    CustomInput
} from '../../../components/login/index'
import { 
    TextBlack,
    TextLight,
    TextError
} from "../../../components/text/index";
import { 
    PrimaryButton   
} from "../../../components/buttons/index";


export default function Leave({data , signUpLeave , loadingSignUpLeave, approvedLeave, deleteLeave}) {
    const currentUser = useReactiveVar(user)
    const [defVal, setDefVal] = useState({
        dateStart : Date(),
        dateEnd : Date(),
        reason : ""
    })
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, errors , control} = useForm();
    const [optionsStatus, setOptionsStatus] = useState([
        { value : "Pending", label : "Pending"},
        { value : "Approved", label : "Approved"},
        { value : "Declined", label : "Declined"},
    ])
    const options = [
        { value: "Medical Leave", label: "Medical Leave" },
        { value: "Casual Leave", label: "Casual Leave" },
      ]

    // if(called && loading) return <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} />
    const onSubmit = (data) => {
        const newLeave = {
            type : data.type.value,
            dateStart :  moment(data.dateStart).toDate(),
            dateEnd :  moment(data.dateEnd).toDate(),
            reason : data.reason,
        }
        console.log(newLeave)
        signUpLeave(
            {
                variables : newLeave,
            } 
        )
        // console.log(data)
    }

    const onStatusChange = (data, id) => {
        approvedLeave(
            {
                variables : {
                    idLeave : id,
                    newStatus : data.value
                }
            }
        )
    }

    const handleDelete = (id) => {
        deleteLeave(
            {
                variables : {id}
            })
    }
    return (
        <div>
            <h3>Leaves</h3>
            <div className="btn_list_between">
                <CommonButtonBlack
                    width="100px"
                    height ="40px"
                    onClick={() => setOpen(!open)}
                >
                    <IoIosAddCircleOutline size="24" color="#f8f8f8"/>
                    Add
                </CommonButtonBlack>
                <CommonButtonBlack
                    width="40px"
                    height ="40px"
                    borderRadius="50%"
                    // onClick={() => refetch()}
                >
                    <AiOutlineReload size="24" color="#f8f8f8"/>
                </CommonButtonBlack>
            </div>
            {loadingSignUpLeave ? <ReactLoading type={"spin"} color={"#242424"} height={50} width={50} /> : 
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Days</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                {
                        data.map((i) => 
                        <tbody>
                            <tr>
                            <th>{i.employee.name}</th>
                            <th>{i.type}</th>
                            <td>{moment(i.dateStart, "x").format('DD MMM YYYY')}</td>
                            <td>{moment(i.dateEnd, "x").format('DD MMM YYYY')}</td>
                            <td>{formatDistance(parseInt(i.dateStart),parseInt(i.dateEnd))}</td>
                            <td>
                                <TextTruncate
                                    line={1}
                                    element="p"
                                    truncateText="…"
                                    text ={i.reason}
                                />
                            </td>
                            {
                                currentUser.position === 'Admin' ?  <td style={{width : "130px"}}>
                                    <Select 
                                        // placeholder = {i.status}
                                        defaultValue={optionsStatus.find(option => option.value === i.status)}
                                        options={optionsStatus}
                                        onChange = {(e) => onStatusChange(e,i.id)}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, }}
                                        />
                                </td>
                            : <td >{i.status === "Pending" ? "Pending ⌛" : i.status === "Approved" ? "Approved ✅" : i.status === "Declined" ? "Declined ⛔" : i.status}</td>
                            }
                            {
                                currentUser.id === i.employee.id ? 
                                <td>
                                    <IconContext.Provider value={  { style : { 
                                        padding : '5px',
                                        borderRadius : '50%',
                                        background : "#f8f8f8",
                                        marginLeft : '5px',
                                        cursor : 'pointer',
                                        fontSize : '30px',
                                    }}}>
                                        <IoRemoveCircleOutline 
                                            style={{color : "#ffff", backgroundColor : "#ff657c"}} 
                                            onClick={() => handleDelete(i.id)} 
                                        />
                                    </IconContext.Provider>
                                </td>
                                : <td></td>
                            }
                            
                            </tr>
                        </tbody>
                    )
                    }
                </Table> 
            }
            <Rodal visible={open} onClose={() => setOpen(false)} showCloseButton={true}>
                <FormMaxWidthHeight onSubmit={handleSubmit(onSubmit)} >
                {/* {(queryEditEmployeeId || mutationEditLoading) ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> : */}
                    <ContainerMiddle style={{overflow : "scroll"}}>
                    <TitleH1 >Add Leaves </TitleH1>
                    <InputItems>
                        <section>
                            <TextBlack style={{margin : "10px 0"}} fontWeight ="500" fontSize = "16px">Type</TextBlack>
                            <Controller
                                as={Select}
                                options={options}
                                name="type"
                                isClearable
                                control={control}
                                defaultValue={options[0]}
                            />
                        </section>
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Date Start</TextBlack>
                        <InputItems>
                        <Controller
                            control={control}
                            name="dateStart"
                            register={register({ required: true })} 
                            render={(props) => (
                            <ReactDatePicker
                                dateFormat="d MMM yyyy"
                                className="input"
                                placeholderText="Select date start"
                                isClearable
                                shouldCloseOnSelect
                                onChange={(e) => props.onChange(e)}
                                selected={props.value}
                                
                            />
                            )}
                        />
                        </InputItems>
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Date End</TextBlack>
                        <InputItems>
                        <Controller
                            control={control}
                            name="dateEnd"
                            register={register({ required: true })} 
                            render={(props) => (
                            <ReactDatePicker
                                dateFormat="d MMM yyyy"
                                className="input"
                                placeholderText="Select date end"
                                isClearable
                                shouldCloseOnSelect
                                onChange={(e) => props.onChange(e)}
                                selected={props.value}
                            />
                            )}
                        />
                        </InputItems>
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Reason</TextBlack>
                        <CustomInput value={defVal.reason}  onChange={(e)=> setDefVal({ ...defVal ,reason : e.target.value})} name="reason" type="text"  height = "40px" ref={register({ required: true })} />
                        {errors.reason && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <PrimaryButton type="submit"> 
                            <TextLight fontWeight = "500" fontSize="14px">Save</TextLight> 
                        </PrimaryButton>
                    </InputItems>
                </ContainerMiddle>
                {/* }  */}
                </FormMaxWidthHeight>
            </Rodal>
        </div>
    )
}
