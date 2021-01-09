import React, {useState} from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useForm,Controller} from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
// import formatDistance from 'date-fns/formatDistance'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isBefore from 'date-fns/isBefore'

import { useQuery , useMutation } from '@apollo/client';

import {AiOutlineMore , AiOutlineDelete} from 'react-icons/ai'
import { TextBlackUnderline} from '../text/index'
import {Menu , MenuItem} from '../DropdownMenu'
import {FormMaxWidthHeight} from '../../pages/dashboard/Employee/Employee'
import {
    ContainerMiddle,
    TitleH1,
    InputItems,
    CustomInput
} from '../login/index'
import { 
    TextBlack,
    TextLight,
    TextError
} from "../text";
import { 
    PrimaryButton   
} from "../buttons/index";

// mutations
import {ADD_HOLIDAY,
    DELETE_HOLIDAY
} from '../../graphql/mutation/index'
 //queries 
import {GET_ALL_HOLIDAYS} from '../../graphql/query/index'
//vars
import {user} from '../../graphql/var/userVar'
import { useReactiveVar } from '@apollo/client';

export default function Holiday() {
    const currentUser = useReactiveVar(user)
    const [add, setAdd] = useState(false) //rodal add
    const [show, setShow] = useState(false) //dropdown
    const { register ,handleSubmit, errors ,control } = useForm();
    const [time, setTime] = useState(new Date)
    //queries
    const { loading : loadingGetAllHolidays, error : errorGetAllHolidays, data : dataGetAllHolidays , refetch } = useQuery(GET_ALL_HOLIDAYS);

     //mutations
     const [addHoliday,{ loading: loadingAddHoliday }] = useMutation(ADD_HOLIDAY,{
        credentials: 'include',
        refetchQueries :[
            {query :GET_ALL_HOLIDAYS }
        ],
        onCompleted : () => {
            toast("✅ Successfully")
        },
        onError : () => {
            toast("⛔ Mutation has failed")
        },
        
    });
    const [deleteHoliday,{ loading: loadingDeleteHoliday }] = useMutation(DELETE_HOLIDAY,{
        credentials: 'include',
        refetchQueries :[
            {query :GET_ALL_HOLIDAYS }
        ],
        onCompleted : () => {
            toast("✅ Delete Successfully")
        },
        onError : () => {
            toast("⛔ Delete error")
        },
        
    });

    //btn
    const handleDelete = (id) => {
        // console.log(id)
        deleteHoliday({
            variables : {
                id : id
            }
        })
        refetch();
    }
    const onSubmit = (data) => {
        const trueDate = moment(data.date).toDate()
        addHoliday({
            variables : {
                title : data.title,
                date : trueDate
            }
        })
        setAdd(false);
        // console.log(data)
        // const date = data.date ;  // true Date()
        // const format = moment(foo).format("DD-MM-yyyy")
        // console.log({foo ,format })
    }

    return (
        <div style ={{width : "95%" }}>
        <div>
            <Rodal visible={add} onClose={() => setAdd(false)} showCloseButton={true}>
            <FormMaxWidthHeight onSubmit={handleSubmit(onSubmit)} >
                {loadingAddHoliday ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> :
                <ContainerMiddle style={{overflow : "scroll"}}>
                    <TitleH1 >New Holiday </TitleH1>
                    <InputItems>
                        <TextBlack fontWeight ="500" fontSize = "16px">Title</TextBlack>
                        <CustomInput  name="title" height = "40px" placeholder="Title ..." ref={register({ required: true })} />
                        {errors.title && <TextError>This field is required</TextError>}
                    </InputItems>
                    <InputItems>
                    <TextBlack fontWeight ="500" fontSize = "16px">Date</TextBlack>
                    </InputItems>
                    <InputItems>
                    <Controller
                        control={control}
                        name="date"
                        register={register({ required: true })} 
                        render={(props) => (
                        <ReactDatePicker
                            dateFormat="d MMM yyyy"
                            className="input"
                            placeholderText="Select date"
                            isClearable
                            shouldCloseOnSelect
                            onChange={(e) => props.onChange(e)}
                            selected={props.value}
                        />
                        )}
                    />
                    </InputItems>
                    <InputItems style={{marginTop : "50px"}}>
                        <PrimaryButton type="submit"> 
                            <TextLight fontWeight = "500" fontSize="14px">Create</TextLight> 
                        </PrimaryButton>
                    </InputItems>
                </ContainerMiddle>}
                </FormMaxWidthHeight>
            </Rodal>
        </div>
        <div>
            <div>
                {
                    currentUser.position != "Admin" ?
                    <>
                    <CustomUnderLineText fontSize="16px">
                    <span>Holidays</span>
                    </CustomUnderLineText>
                    </>
                    :
                    <>
                    <CustomUnderLineText fontSize="16px">
                    <span>Holidays</span>
                    <AiOutlineMore onClick={() => setShow(!show)} size="20px"/>
                    </CustomUnderLineText>
                    <Menu show={show}
                        right = "10px"
                    >
                        <MenuItem onClick={() => {
                            setAdd(true)
                            setShow(!show);
                            }} >Add</MenuItem>
                        <MenuItem onClick={() => {
                            refetch()
                            setShow(!show)
                            }} >Refetch</MenuItem>
                    </Menu>
                    </>
                }
            </div>
            {loadingGetAllHolidays || loadingDeleteHoliday ? <ReactLoading type={"spin"} color={"#242424"} height={50} width={50} />  :
            <ListStyled>
                {
                    dataGetAllHolidays.getAllHolidays.filter(i => isBefore(moment(i.date).toDate(),new Date()) === false).map(iFilter => 
                        <ItemListStyled >
                            {/* fix this to date with React-moment */}
                            <div style={{display : "flex", justifyContent:"space-between"}}
                            >
                                {/* formatDistance(parseInt(i.dateStart),parseInt(i.dateEnd)) */}
                                <p>{formatDistanceToNow(parseInt(iFilter.date), { addSuffix: true })} ({moment(iFilter.date, "x").format("DD MM YYYY")})</p>
                                {
                                    currentUser.position == "Admin" ? <AiOutlineDelete size="20" onClick={() => { handleDelete(iFilter.id) }}/> :
                                    ""
                                }
                                </div>
                            <h4>{iFilter.title}</h4>
                        </ItemListStyled>
                    )  
                
                }
            </ListStyled>
            }
        </div>
    </div>
    )
}


const ListStyled = styled.ul`
    list-style : none;
    width : 100%;
`

const ItemListStyled = styled.li`
    padding : 10px 15px;
    border: 1px solid rgba(95, 94, 94, 0.2);
    border-radius : 20px;
    margin-top : 15px;

    &:hover {
        box-shadow: 0px 10px 54px rgba(0, 0, 0, 0.1);
    }
`

const CustomUnderLineText = styled(TextBlackUnderline)`
    display : flex;
    justify-content : space-between;
    align-items : center;
`