import React, {useEffect, useState} from 'react'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Select from 'react-select'
import styled from 'styled-components'

import { useQuery , useMutation, useLazyQuery } from '@apollo/client';
import { useForm , Controller } from "react-hook-form";

import {
    FormLogin,
    ContainerMiddle,
    TitleH1,
    InputItems,
    CustomInput
} from '../../components/login/index'
import { 
    TextBlack,
    TextLight,
    TextError
 } from "../../components/text";
 import { 
    PrimaryButton
 } from "../../components/buttons/index";
import { Table } from 'reactstrap';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import {IconContext } from 'react-icons'
import {AiOutlineReload} from 'react-icons/ai'
import {BsPlus} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {IoRemoveCircleOutline} from 'react-icons/io5'
import {CommonCard} from '../../components/cards/CommonCard'
import {CommonButtonBlack} from '../../components/buttons/index'

//gql
import {
    GET_ALL_EMPLOYEES,
    GET_EMPLOYEE_BY_ID,
} from '../../graphql/query/index'
import {
    CREATE_NEW_EMPLOYEE,
    DELETE_EMPLOYEE_BY_ID,
    EDIT_EMPLOYEE_BY_ID,
} from '../../graphql/mutation/index'

export default function Employee() {
    const [onAdd , setOnAdd] = useState(false)
    const [onEdit , setOnEdit] = useState(false)
    const [currentEmp, setCurrentEmp] = useState({
        id : '',
        username : '',
        name : '',
        phone : '',
        email : '',
        address : '',
        position : {value : '' , label : ''},
    })


    const { register, handleSubmit, errors , control} = useForm();
    const { register : registerEdit, handleSubmit : handleSubmitEdit, errors : errorsEdit , control : controlEdit} = useForm();


    const { loading, error, data ,refetch } = useQuery(GET_ALL_EMPLOYEES);
    const [getEmployeeById,{ loading : queryEditEmployeeId, data : dataEmployeeId }] = useLazyQuery(GET_EMPLOYEE_BY_ID,{
        onCompleted: dataEmployeeId => {
            setCurrentEmp({...dataEmployeeId.getEmployeeById, 
                position : { value : dataEmployeeId.getEmployeeById.position, label : dataEmployeeId.getEmployeeById.position}
            });
            
            
        }
    });


    const [createNewEmployee,{ loading: mutationLoading, error: mutationError }] = useMutation(CREATE_NEW_EMPLOYEE,{
        credentials: 'include',
        refetchQueries :[
            {query :GET_ALL_EMPLOYEES }
        ]
      });
    const [deleteEmployee, {  error : mutationDeleteError }] = useMutation(DELETE_EMPLOYEE_BY_ID,{
        credentials: 'include',
        refetchQueries :[
            {query :GET_ALL_EMPLOYEES }
        ]
      });
    const [editEmployeeByID,{ loading: mutationEditLoading, error: mutationEditError }] = useMutation(EDIT_EMPLOYEE_BY_ID,{
    credentials: 'include',
        refetchQueries :[
            {query : GET_ALL_EMPLOYEES }
        ]
    });

    const opionsPos = [
        {value : 'Bartender', label : 'Bartender'},
        {value : 'Cashier', label : 'Cashier'},
        {value : 'Dishwasher', label : 'Dishwasher'}
    ]
    if (error || mutationError || mutationDeleteError || mutationEditError){
        toast(`⛔ ${error}`);
        toast(`⛔ ${mutationError}`);
        toast(`⛔ ${mutationDeleteError}`);
        toast(`⛔ ${mutationEditError}`);
    }

    const onSubmit = async (newEmp) => {
        try{    
            const {data} = await createNewEmployee({
                variables : {
                    username : newEmp.username,
                    password : newEmp.password,
                    email : newEmp.email,
                    name : newEmp.name,
                    phone : newEmp.phone,
                    position : newEmp.position.value,
                    address : newEmp.address
                }
            })
            if(data){
                refetch();
                setOnAdd(false);
                toast('✅ Create successfull !')
            }
        }catch(err){
            toast(`⛔ ${err.message}`);
        }
    }

    const onSubmitEdit = async (data) => {
        try {
            const rs = await editEmployeeByID({
                variables : {
                    id : currentEmp.id,
                    username : data.username,
                    name : data.name,
                    phone : data.phone,
                    email : data.email,
                    address : data.address,
                    position : data.position.value
                }
            })
            if(rs.data){
                refetch();
                toast('✅ Update successfuly')
                setOnEdit(false)
            }
            console.log(data)
        } catch (error) {
            toast(`⛔ ${error}`)
        }
        
    }

    const handleDelete = async (idEmployee) => {
        try {
            const {data} = await deleteEmployee({
                variables : {
                    id : idEmployee
                }
            })
            if(data.deleteEmployee.success === true){
                //success
                refetch();
                toast('✅ Successfully deleted')
            }
        } catch (error) {
            toast(`⛔ ${error}`)
        }
    }

    const handleEdit = async (idEmployee) => {
        getEmployeeById(
            {
                variables : { id : idEmployee},
            } 
        )
        console.log(currentEmp)
        setOnEdit(true);
    }

    return (
        <div style={{overflowX : "scroll" , padding : "10px"}}>
            <CommonCard width={"100%"}>
            {loading ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> : 
                <>
                <div className="btn_list_between">
                    <CommonButtonBlack
                        width="100px"
                        height ="40px"
                        onClick={() => setOnAdd(!onAdd)}
                    >
                        <BsPlus size="24" color="#f8f8f8"/>
                        Add
                    </CommonButtonBlack>
                    <CommonButtonBlack
                        width="40px"
                        height ="40px"
                        borderRadius="50%"
                        onClick={() => refetch()}
                    >
                        <AiOutlineReload size="24" color="#f8f8f8"/>
                    </CommonButtonBlack>
                </div>
                <Table hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        data.getAllEmployees.map((i ,index) => 
                        <tbody>
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>{i.position}</td>
                            <td>
                                <IconContext.Provider value={  { style : { 
                                    padding : '5px',
                                    borderRadius : '50%',
                                    background : "#f8f8f8",
                                    marginLeft : '5px',
                                    cursor : 'pointer',
                                    fontSize : '30px',
                                }}}>
                                    <FiEdit onClick={() => handleEdit(i.id)}/>
                                    <IoRemoveCircleOutline 
                                        style={{color : "#ffff", backgroundColor : "#ff657c"}} 
                                        onClick={() => handleDelete(i.id)} 
                                    />
                                </IconContext.Provider>
                            </td>
                            </tr>
                        </tbody>
                        )
                    }
                </Table>
                </>
            }
            
            </CommonCard>
            <Rodal visible={onAdd} onClose={() => setOnAdd(false)} showCloseButton={true}>
                <FormMaxWidthHeight onSubmit={handleSubmit(onSubmit)} >
                {mutationLoading ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> :
                    <ContainerMiddle style={{overflow : "scroll"}}>
                    <TitleH1 >New Employee </TitleH1>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Username</TextBlack>
                        <CustomInput  name="username" height = "40px" placeholder="Username ..." ref={register({ required: true })} />
                        {errors.username && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Password</TextBlack>
                        <CustomInput  name="password" type="password"  height = "40px" placeholder="Password ..." ref={register({ required: true })} />
                        {errors.password && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Full Name</TextBlack>
                        <CustomInput  name="name" height = "40px" placeholder="Full name ..." ref={register({ required: true })} />
                        {errors.name && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Phone</TextBlack>
                        <CustomInput  name="phone"   height = "40px" placeholder="Phone ..." ref={register}/>
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Email</TextBlack>
                        <CustomInput  name="email" type="email"  height = "40px" placeholder="Email ..." ref={register({ required: true })} />
                        {errors.email && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Address</TextBlack>
                        <CustomInput  name="address" height = "40px" placeholder="Address ..." ref={register}/>
                    </InputItems>
                    <section>
                        <TextBlack style={{margin : "10px 0"}} fontWeight ="500" fontSize = "16px">Position</TextBlack>
                        <Controller
                            as={Select}
                            options={opionsPos}
                            name="position"
                            isClearable
                            control={control}
                            defaultValue ={opionsPos[0]}
                        />
                    </section>
                    <InputItems>
                        <PrimaryButton type="submit"> 
                            <TextLight fontWeight = "500" fontSize="14px">Create</TextLight> 
                        </PrimaryButton>
                    </InputItems>
                </ContainerMiddle>
                } 
                </FormMaxWidthHeight>
            </Rodal>
            <Rodal visible={onEdit} onClose={() => setOnEdit(false)} showCloseButton={true}>
                <FormMaxWidthHeight onSubmit={handleSubmitEdit(onSubmitEdit)} >
                {(queryEditEmployeeId || mutationEditLoading) ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> :
                    <ContainerMiddle style={{overflow : "scroll"}}>
                    <TitleH1 >Edit Employee </TitleH1>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Username</TextBlack>
                        <CustomInput value={currentEmp.username} onChange={(e)=> setCurrentEmp({ ...currentEmp ,username : e.target.value})} name="username" height = "40px" placeholder="Username ..." ref={registerEdit({ required: true })} />
                        {errorsEdit.username && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Full Name</TextBlack>
                        <CustomInput value={currentEmp.name}  onChange={(e)=> setCurrentEmp({ ...currentEmp ,name : e.target.value})} name="name" height = "40px" placeholder="Full name ..." ref={registerEdit({ required: true })} />
                        {errorsEdit.name && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Phone</TextBlack>
                        <CustomInput value={currentEmp.phone}  onChange={(e)=> setCurrentEmp({ ...currentEmp ,phone : e.target.value})} name="phone"   height = "40px" placeholder="Phone ..." ref={registerEdit}/>
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Email</TextBlack>
                        <CustomInput value={currentEmp.email}  onChange={(e)=> setCurrentEmp({ ...currentEmp ,email : e.target.value})} name="email" type="email"  height = "40px" placeholder="Email ..." ref={registerEdit({ required: true })} />
                        {errorsEdit.email && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Address</TextBlack>
                        <CustomInput value={currentEmp.address}  onChange={(e)=> setCurrentEmp({ ...currentEmp ,address : e.target.value})} name="address" height = "40px" placeholder="Address ..." ref={registerEdit}/>
                    </InputItems>
                    <section>
                        <TextBlack style={{margin : "10px 0"}} fontWeight ="500" fontSize = "16px">Position</TextBlack>
                        <Controller
                            as={Select}
                            options={opionsPos}
                            name="position"
                            isClearable
                            control={controlEdit}
                            defaultValue={currentEmp.position}
                        />
                    </section>
                    <InputItems>
                        <PrimaryButton type="submit"> 
                            <TextLight fontWeight = "500" fontSize="14px">Save</TextLight> 
                        </PrimaryButton>
                    </InputItems>
                </ContainerMiddle>
                } 
                </FormMaxWidthHeight>
            </Rodal>
        </div>
    )
}



const FormMaxWidthHeight = styled(FormLogin)`
    width : 100%;
    height : 100%;
    overflow-x : scroll;
`
