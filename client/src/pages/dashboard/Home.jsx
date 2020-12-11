import React from 'react'
import { 
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';
// import { Row , Col } from 'reactstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment, { now } from 'moment'
// import 'react-calendar/dist/Calendar.css';

import {CommonCard} from '../../components/cards/CommonCard'


//example data
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
{name: 'Page B', uv: 200, pv: 2400, amt: 2400},
{name: 'Page C', uv: 400, pv: 2400, amt: 2400},
{name: 'Page D', uv: 400, pv: 2400, amt: 2400}, ];

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const myEventsList = [
     {
        title: "this is tilte",
        start: Date(12,2),
        end: Date(now),
        allDay: true,
      }
]

export default function Home() {
    return (
        <div style={{overflowX : "scroll" , padding : "10px"}}>
            <CommonCard width={"100%"}>
            <h3>Charts</h3>
            <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
            </CommonCard>
            <CommonCard width="100%">
            <h3>Events</h3>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
             </CommonCard>
        </div>
    )
}
