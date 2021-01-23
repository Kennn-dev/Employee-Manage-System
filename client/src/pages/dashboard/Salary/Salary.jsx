import React,{useState, useRef} from 'react'
import { Table} from 'reactstrap';
import { useQuery , useMutation ,useLazyQuery} from '@apollo/client';

import { CSVLink, CSVDownload } from "react-csv";
import ReactLoading from 'react-loading';
import Select from 'react-select'
import { toast } from 'react-toastify';

import {CommonButtonBlack} from '../../../components/buttons/index'
import {IoEyeSharp} from 'react-icons/io5';
import {CommonCard} from '../../../components/cards/CommonCard'

//gql
import {
  GET_ALL_PAYROLLS,
  GET_PAYROLLS_BY_ID
} from '../../../graphql/query/index'

export default function Salary() {
  const headers = [
    { label: "Full name", key: "name" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Position", key: "position" },
    { label: "Work Time", key: "workDays" },
    { label: "Salary", key: "salary" },
    { label: "RealWages", key: "realWages" }
    ];
    const [options, setOptions] = useState([])
    const [csvData, setCsvData] = useState([])
    //QUERY
    const { loading, error, data ,refetch } = useQuery(GET_ALL_PAYROLLS , {
      onCompleted : () => {
        const arr = []
        data.getAllPayrolls.map(i => arr.push({value : i.id, label : i.name}))
        setOptions(arr)
      },  
      onError : (err) => { toast(`⛔ ${err}`)}
    });
    const [loadPayroll, { called, loading : loadingPayroll, data : dataPayroll }] = useLazyQuery(
      GET_PAYROLLS_BY_ID,
      {
        onCompleted : () => { 
          const arr = [] ;
          dataPayroll.getPayrollById.employees.map( i => {
          arr.push({ 
            name : i.name ,
            username : i.username, 
            email : i.email, 
            position : i.position,
            workDays : i.workDays.length, 
            salary : parseInt(i.salary.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
            realWages : (parseInt(i.salary.amount)*i.workDays.length).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
          })}
        )
        setCsvData(arr)
        }
      }
    );

    const handleChange = selectedOption => {
      // console.log(`Option selected:`, selectedOption);
      loadPayroll({
        variables : { idPayroll : selectedOption.value}
      })
    }

    return (
        <div>
          <h1>Salaries : </h1>
          <div style={{display : "flex" , alignItems : "center", justifyContent : "space-between"}}>
            <div style={{ width : "70%"}}>
              <Select 
                options = {options} 
                onChange={handleChange}
              />
            </div>
            <CommonButtonBlack>
            <CSVLink style={{color : "#FFFF"}} data={csvData} headers={headers}>Export</CSVLink>
          </CommonButtonBlack>
          </div>
          <CommonCard width="100%">
              {loadingPayroll ? <ReactLoading type={"spin"} color={"#242424"} height={30} width={30} />:
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Worktime</th>
                    <th>Salary</th>
                    <th>Realwages</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loadingPayroll ? <ReactLoading type={"spin"} color={"#242424"} height={30} width={30} /> :
                    dataPayroll && dataPayroll.getPayrollById.employees.map( (i, index) => 
                    <tr>
                      <th scope="row">{index +1}</th>
                      <td>{i.name}</td>
                      <td>{i.username}</td>
                      <td>{i.email}</td>
                      <td>{i.position}</td>
                      <td>{i.workDays.length}</td>
                      <td>{parseInt(i.salary.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                      <td>{(parseInt(i.salary.amount)*i.workDays.length).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                    </tr>
                    )
                  }
                </tbody>
              </Table>
              }
          </CommonCard>
        </div>
    )
}
