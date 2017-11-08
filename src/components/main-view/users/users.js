import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {Row, Col, Button} from 'react-bootstrap';

import './users.scss';

const RenderUser = observer(({user}) => {
    const {Username, Password, Auth} = user;

    return (
        <div>
            <p>Username: <strong>{Username}</strong></p>
            <p>Password: <strong>{Password}</strong></p>
            <p>Auth: <strong>{Auth}</strong></p>
        </div>
    );
});

RenderUser.PropTypes = {
    user: PropTypes.object.isRequired
};

RenderUser.displayName = 'RenderUser';

const UsersView = observer(({users, openModal}) => (
    <Row>
        {users.map((user, i) => (
            <Col className="user" xs={4} key={`user_${i}`}>
                <RenderUser user={user}/>
                <Button bsStyle="primary"
                        onClick={openModal.bind(this, user)}>
                    Login
                </Button>
            </Col>
        ))}
    </Row>
));

UsersView.PropTypes = {
    user: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired
};

UsersView.displayName = 'UsersView';

export default UsersView;