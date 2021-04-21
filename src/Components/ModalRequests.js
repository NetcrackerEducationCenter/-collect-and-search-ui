import React from 'react';
import { Modal } from 'antd';

import StatusTable from './StatusTable';

function ModalRequests(props) {


    return (
        <Modal
            {...props}
            title='Last request statuses'
        >
                <StatusTable pageSize='5' {...props} />
        </Modal>
    );
}

export default ModalRequests;