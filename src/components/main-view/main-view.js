import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';

import RenderUsers from './users/users';
import ShowModal from './modal/show-modal';

import './main-view.scss';

@inject("usersStore") @observer
class MainView extends Component {
    static PropTypes = {
        usersStore: PropTypes.object.isRequired
    };

    selectedUser = null;

    @observable showModal = false;

    @action.bound
    openModal(user) {
        this.showModal = true;
        this.selectedUser = user;
        if (this.selectedUser.Auth !== '') {
            this.selectedUser.Auth = '';
        }
    };

    @action.bound
    closeModal() {
        this.showModal = false;
        this.selectedUser = null;
    };

    render() {
        const {Users} = this.props.usersStore;

        return (
            <main className="main">
                <h2 className="main__title">List of users:</h2>

                <RenderUsers users={Users} openModal={this.openModal}/>

                <Row className="main__server">
                    <Col xs={12}>
                        <p>Server's log:</p>
                        You posted: ____ <br/>
                        Server answered: ____ <br/>
                    </Col>
                </Row>

                <ShowModal isShowModal={this.showModal}
                           closeModal={this.closeModal}
                           user={this.selectedUser}/>
            </main>
        );
    }
}

export default MainView;