import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';

const LogsServerView = observer(({logs}) => (
    <Row className="main__server">
        {logs.map((record, i) => {
            const {timeStamp, message} = record;
            return (
                <Col xs={12} className="main__server--record" key={`record_${i}`}>
                    <span className="main__server--record-timestamp">{timeStamp} </span>
                    <span className="main__server--record-message">
                        <strong>{message}</strong>
                    </span>
                </Col>
            );
        })}
    </Row>
));

LogsServerView.PropTypes = {
    logs: PropTypes.array.isRequired
};

LogsServerView.displayName = 'LogsServerView';

export default LogsServerView;