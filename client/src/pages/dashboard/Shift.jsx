import React, {useEffect, useState} from 'react'
import {Row , Col} from 'reactstrap';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import {CommonCard} from '../../components/cards/CommonCard'


export default function Shift() {
    return (
        <div>
            <Row>
                <Col lg="2">
                    <CommonCard>
                        List employee
                    </CommonCard>
                </Col>
                <Col lg="10">
                    <CommonCard width="100%" height= "100%" >
                    <FullCalendar
                        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                          }}
                        // dateClick={this.handleDateClick}
                        // eventContent={renderEventContent} //Content inject
                    />
                    </CommonCard>
                </Col>
            </Row>
            
        </div>
    )
}
