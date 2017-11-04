import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {observable, action} from 'mobx';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

import LoginForm from '../login-form/login-form';

import './main-view.scss';

@inject("loginStore") @observer
class MainView extends Component {
    static PropTypes = {
        loginStore: PropTypes.object.isRequired
    };

    @observable showModal = false;

    @action.bound
    openModal() {
        this.showModal = true;
    };

    @action.bound
    closeModal() {
        this.showModal = false;
    };

    render() {
        const {Username, Password} = this.props.loginStore;
        return (
            <main>
                <h2>Данные из store:</h2>
                <p>Username = {Username}</p>
                <p>Password = {Password}</p>

                <Button bsStyle="primary" onClick={this.openModal}>Open Modal</Button>

                <Modal show={this.showModal} onHide={this.closeModal}>
                    <Modal.Body>
                        <LoginForm/>
                    </Modal.Body>
                </Modal>
            </main>
        );
    }
}

export default MainView;
