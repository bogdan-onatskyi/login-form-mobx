import React, {Component} from 'react';
import {observable, action} from "mobx";
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

import UsersView from './users/users';
import LogsServerView from './logs-server-view/logs-server-view';
import ShowModal from './modal/show-modal';

import './main-view.scss';

@inject("usersStore", "logsStore") @observer
class MainView extends Component {
    static PropTypes = {
        usersStore: PropTypes.object.isRequired,
        logsStore: PropTypes.object.isRequired
    };

    selectedUser = null;

    @observable showModal = false;

    @action.bound
    openModal(index) {
        this.showModal = true;
        this.selectedUser = this.props.usersStore.Users[index];
        if (this.selectedUser.Auth !== '') {
            this.selectedUser.Auth = '';
        }
    };

    @action.bound
    closeModal() {
        this.showModal = false;
        this.selectedUser = null;
    };

    render = () => {
        const {Users} = this.props.usersStore;
        const {Logs} = this.props.logsStore;

        return (
            <main className="main">
                <h2 className="main__title">List of users:</h2>

                <UsersView users={Users} openModal={this.openModal}/>

                <LogsServerView logs={Logs}/>

                <ShowModal isShowModal={this.showModal}
                           closeModal={this.closeModal}
                           user={this.selectedUser}/>
            </main>
        );
    };
}

export default MainView;