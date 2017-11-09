import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {Row, Col, Button} from 'react-bootstrap';

const RenderUser = observer(({user}) => {
    const {Title, Username, Password, Auth} = user;

    return (
        <div>
            <p><strong>{Title}</strong></p>
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
    <Row className="main__users">
        {users.map((user, i) => (
            <Col className="main__users--user" xs={3} key={`user_${i}`}>
                <RenderUser user={user}/>
                <Button bsStyle="primary"
                        onClick={openModal.bind(this, i)}>
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