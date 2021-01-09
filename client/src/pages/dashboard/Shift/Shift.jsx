import React, {useEffect, useState} from 'react'
import {Row , Col} from 'reactstrap';

import 'rodal/lib/rodal.css';
import 'react-big-scheduler/lib/css/style.css'
import 'antd/lib/style/index.less';
import moment from 'moment'

import Schedule from './Schedule'
import {CommonCard} from '../../../components/cards/CommonCard'


function Shift() {
 
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
                    <Schedule/>
                    </CommonCard>
                </Col>
            </Row>
            
        </div>
    )
}

export default Shift