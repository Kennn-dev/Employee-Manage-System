import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
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
} from '../../../components/login/index'
import { 
    TextBlack,
    TextLight,
    TextError
 } from "../../../components/text";
 import { 
    PrimaryButton
 } from "../../../components/buttons/index";
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import {CommonCard} from '../../../components/cards/CommonCard'
//gql
import {
    GET_ALL_EMPLOYEES,
    GET_EMPLOYEE_BY_ID,
    GET_ALL_LEAVES,
} from '../../../graphql/query/index'
import {
    CREATE_NEW_EMPLOYEE,
    DELETE_EMPLOYEE_BY_ID,
    EDIT_EMPLOYEE_BY_ID,
    SIGN_UP_LEAVE,
    DELETE_LEAVE,
    APPROVE_LEAVE
} from '../../../graphql/mutation/index'

//components
import List from './List'
import Leave from './Leave'

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

    //QUERY
    const { loading, error, data ,refetch } = useQuery(GET_ALL_EMPLOYEES , {
        onError : (err) => { toast(`⛔ ${err}`)}
    });
    const { loading : loadingLeaves, data : dataLeaves } = useQuery(GET_ALL_LEAVES ,{ 
        onError : (err) => { toast(`⛔ ${err}`)} });
    // const [loadLeaves, { loading : loadingLeaves, data : dataLeaves }] = useLazyQuery(GET_ALL_LEAVES);
    const [getEmployeeById,{ loading : queryEditEmployeeId, data : dataEmployeeId }] = useLazyQuery(GET_EMPLOYEE_BY_ID,{
        onCompleted: dataEmployeeId => {
            setCurrentEmp({...dataEmployeeId.getEmployeeById, 
                position : { value : dataEmployeeId.getEmployeeById.position, label : dataEmployeeId.getEmployeeById.position}
            });
            
            
        }
    });

    //MUTATE
    const [createNewEmployee,{ loading: mutationLoading, error: mutationError }] = useMutation(CREATE_NEW_EMPLOYEE,{
        credentials: 'include',
        refetchQueries :[
            {query :GET_ALL_EMPLOYEES }
        ]
      });
    const [deleteEmployee, {  error : mutationDeleteError }] = useMutation(DELETE_EMPLOYEE_BY_ID,{
        credentials: 'include',
        onCompleted : () => { toast(`✅ Success`)},
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
    const [signUpLeave,{ loading: loadingSignUpLeave }] = useMutation(SIGN_UP_LEAVE,{
        credentials: 'include',
            refetchQueries :[
                {query : GET_ALL_LEAVES }
            ],
            onCompleted : () => { toast(`✅ Success`)}
        });
    const [approvedLeave,{ loading: loadingApprovedLeave }] = useMutation(APPROVE_LEAVE,{
        credentials: 'include',
            refetchQueries :[
                {query : GET_ALL_LEAVES }
            ],
            onCompleted : () => { toast(`✅ Success`)}
        });
    const [deleteLeave,{ loading: loadingDeleteLeave}] = useMutation(DELETE_LEAVE,{
        credentials: 'include',
            refetchQueries :[
                {query : GET_ALL_LEAVES }
            ],
            onCompleted : () => { toast(`✅ Success`)}
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
        deleteEmployee({
                variables : {
                    id : idEmployee
                }
            })
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
    

    if(loading) return <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} />

    return (
        <Router>
        <div style={{overflowX : "scroll" , padding : "10px"}}>
            <CommonCard width={"100%"}>
                <div className="flex-items">
                    <TotalCard>
                        <ItemsInCard>
                            <Link to="/dashboard/employee">
                                <TextBlack>Employees</TextBlack>
                                {data ? <TextBlack style={{display : "block"}} fontSize="30px" fontWeight="500">{data.getAllEmployees.length}</TextBlack> : "Fetching"}
                            </Link>
                        </ItemsInCard>
                    </TotalCard>
                    {
                        loadingLeaves ? <ReactLoading type={"spin"} color={"#242424"} height={30} width={30} /> :
                        <TotalCard> 
                            <Link to ="/dashboard/employee/leave">
                            <ItemsInCard>
                                <TextBlack>Leaves Today</TextBlack>
                                <TextBlack style={{display : "block"}} fontSize="30px" fontWeight="500">{dataLeaves.getAllLeaves.length}</TextBlack>
                            </ItemsInCard>
                            </Link>
                        </TotalCard>
                    }
                    
                </div>
                <Switch>
                    {
                        loading ? "" : 
                        <Route exact={true} path = "/dashboard/employee" component={() => 
                        <List 
                            refetch={refetch} 
                            onAdd={onAdd} 
                            setOnAdd={setOnAdd} 
                            loading ={loading} 
                            handleDelete={handleDelete} 
                            handleEdit={handleEdit} 
                            data={data.getAllEmployees} 
                            />
                        }/>
                    }
                    {
                        loadingLeaves ? "" :
                        <Route  path = "/dashboard/employee/leave" component={() =>
                            <Leave 
                                data = {dataLeaves.getAllLeaves}
                                signUpLeave = {signUpLeave}
                                loadingSignUpLeave = {loadingSignUpLeave}
                                approvedLeave = {approvedLeave}
                                deleteLeave = {deleteLeave}
                            />
                        }/>
                    }
                    
                </Switch>
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
        </Router>
    )
}



export const FormMaxWidthHeight = styled(FormLogin)`
    width : 100%;
    height : 100%;
    overflow-x : scroll;
`
const TotalCard = styled.div`
   
    padding : 10px 50px;
    border-radius : 20px;
    border : 1px solid rgba(95, 94, 94, 0.28) ;
    text-align : center;
    &:hover {
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
    }
`
const ItemsInCard = styled.div`
    cursor : pointer;
    padding : 10px;
    
`
