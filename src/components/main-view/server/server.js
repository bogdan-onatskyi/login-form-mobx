import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';

const ServerView = observer(({logs}) => (
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

ServerView.PropTypes = {
    logs: PropTypes.array.isRequired
};

ServerView.displayName = 'ServerView';

export default ServerView;