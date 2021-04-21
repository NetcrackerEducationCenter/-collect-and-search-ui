import { message } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Report from '../Components/ForWorkpage/Report'
import StatusTable from '../Components/StatusTable';
import { config } from '../Config';

import '../css/loading.css';

export default function WorkPage(props) {
    const [report, setReport] = useState({});
    const [loading, setloading] = useState(true);

    const getReport = (id, time) => {
        setloading(true);
        axios.post(`${config.url}/api/report/get`, {
            requestId: id,
            time: time
        }).then(res => {
            if (!res.data) {
                getReport(id, 'second');
            } else {
                setReport(res.data);
                setloading(false);
            }
        });
    }
    useEffect(() => {
        message.info(props.match.params.requestId);
        getReport(props.match.params.requestId, 'first');
    }, []);

    if (loading) {
        return <div className="lds-ring">
            {/* <div>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div> */}
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