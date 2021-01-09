import React from 'react'

import {user} from '../../../graphql/var/userVar'
import {useReactiveVar } from '@apollo/client'

// import 
import {IconContext } from 'react-icons'
import ReactLoading from 'react-loading';
import { Table } from 'reactstrap';
import {AiOutlineReload} from 'react-icons/ai'
import {BsPlus} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {IoRemoveCircleOutline} from 'react-icons/io5'

import {CommonButtonBlack} from '../../../components/buttons/index'

export default function List({onAdd , refetch,setOnAdd , data , loading , handleDelete ,handleEdit}) {
    const currentUser = useReactiveVar(user)
    
    return (
        <div>
                <h3>List </h3>
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
                    {loading ? <ReactLoading type={"bars"} color={"#242424"} height={50} width={50} /> : 
                        data.map((i ,index) => 
                        <tbody>
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>{i.position}</td>
                            {
                                currentUser.position === "Admin" ?
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
                            </td> :
                            <td></td>
                            }
                            
                            </tr>
                        </tbody>
                        )
                    }
                </Table> 
        </div>
    )
}
