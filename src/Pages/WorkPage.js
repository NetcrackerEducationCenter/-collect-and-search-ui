import { message } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Report from '../Components/ForWorkpage/Report'
import { config } from '../Config';

import '../css/loading.css';

export default function WorkPage(props) {

    if (props.loading) {
        return <div className="lds-ring">
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    } else {
        return (
            <Content
                style={{
                    padding: '0 20%',
                    fontFamily: 'Geneva, Arial, Helvetica, sans-serif'
                }}
            >
                <Report report={props.report} />
            </Content>
        );
    }


}