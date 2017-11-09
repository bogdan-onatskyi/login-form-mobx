import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import RenderLoginForm from './login-form';
import RenderLogged from './pure/logged';
import RenderNetworkError from './pure/network-error';

import './show-modal.scss';

@observer
class ShowModal extends Component {
    static propTypes = {
        isShowModal: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        user: PropTypes.any
    };

    renderModalBody = () => {
        const {closeModal, user} = this.props;

        if (!user) return;

        switch (user.Auth) {
            case '':
            case 'Denied':
                return <RenderLoginForm user={user}/>;

            case 'Logged':
                setTimeout(closeModal, 2000);
                return <RenderLogged/>;

            case 'Network Error':
                setTimeout(closeModal, 2000);
                return <RenderNetworkError/>;
        }
    };

    render = () => {
        const {isShowModal, closeModal} = this.props;

        return (
            <Modal show={isShowModal} onHide={closeModal}>
                <Modal.Body>
                    {this.renderModalBody()}
                </Modal.Body>
            </Modal>
        );
    };
}

export default ShowModal;