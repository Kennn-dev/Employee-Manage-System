import {atom} from 'recoil'

import { AiOutlineHome } from "react-icons/ai";
import { BiGroup } from 'react-icons/bi';
import { RiCalendarEventFill} from 'react-icons/ri'
import {BsChatDots} from 'react-icons/bs'
import {GoGraph} from 'react-icons/go'
import {ImCoinDollar} from 'react-icons/im'

const   homeIcon = <AiOutlineHome   size="23px" color = "#F8f8f8"/>;
const   employeeIcon = <BiGroup size="23px" color = "#F8f8f8"/>;
const   salaryIcon = <ImCoinDollar   size="23px" color = "#F8f8f8"/>;
const   eventIcon = <RiCalendarEventFill    size="23px" color = "#F8f8f8"/>
const   requestIcon = <BsChatDots   size="23px" color = "#F8f8f8"/>
const   statisticIcon = <GoGraph    size="23px" color = "#F8f8f8"/>

export const itemSideBar = atom({
    key: 'itemSideBar', // unique ID (with respect to other atoms/selectors)
    default: [
            {   
                id : "0",
                href : "/dashboard",
                name : "Home",
                icon : homeIcon
            },
            {   
                id : "1",
                href : "/dashboard/employee",
                name : "Employee",
                icon : employeeIcon,
            },
            {
                id : "2",
                href : "/dashboard/salary",
                name : "hi",
                icon : salaryIcon
            },
            {
                id : "3",
                href : "/dashboard/event",
                name : "Event",
                icon : eventIcon
            },
            {
                id : "4",
                href : "/dashboard/request",
                name : "Requests",
                icon : requestIcon
            },
            {
                id : "5",
                href : "/dashboard/statistic",
                name : "Statistics",
                icon : statisticIcon
            },
            // {
            //     id : "6",
            //     href : "/dashboard/schedule",
            //     name : "Schedule",
            // },
        ], // default value (aka initial value)
        
    });

export const itemNavbar = atom({
    key: 'itemNavbar', // unique ID (with respect to other atoms/selectors)
    default: [
            {
                id : "0",
                name : "Home",
                href : "/dashboard"
            },
            {
                id : "1", //employee
                name : "List",
                href :"/employee/list"
            },
            {
                id : "1", //employee
                name : "Shift",
                href :"/employee/shift"
            },
            {
                id : "2", //salary
                name : "Dev",
                href :"/salary/list"
            },
            {
                id : "3", //events
                name : "List",
                href :"/event/list"
            },
            {
                id : "4", //requests
                name : "List",
                href :"/request/list"
            },
        ], // default value (aka initial value)
        
    });

export const clickSideBar = atom({
    key : "clickSideBar",
    default : {
        sideBar : ""
    }
})