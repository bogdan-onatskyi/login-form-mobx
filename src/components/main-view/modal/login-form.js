import React, {Component} from 'react';
import {observable, action} from "mobx";
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {toString, parseData} from '../../../utils/utils';

import FormGroup from 'react-bootstrap/es/FormGroup';
import FormControl from 'react-bootstrap/es/FormControl';
import Button from 'react-bootstrap/es/Button';
import Glyphicon from 'react-bootstrap/es/Glyphicon';

import './login-form.scss';

@inject("logsStore") @observer
class RenderLoginForm extends Component {
    static propTypes = {
        logsStore: PropTypes.object,
        user: PropTypes.object.isRequired
    };

    @observable isLoggingIn = false;

    @action.bound
    handleChangeLogin(e) {
        this.props.user.Username = e.target.value;
    };

    @action.bound
    handleChangePassword(e) {
        this.props.user.Password = e.target.value;
    };

    @action.bound
    setIsLoggingIn(bool) {
        this.isLoggingIn = bool;
    };

    handleLoggingIn = () => {
        if (this.isLoggingIn) return;
        this.setIsLoggingIn(true);

        const timeOut = 1000;
        const networkError = 'Network Error';

        const {logsStore, user} = this.props;
        const request = {
            Username: user.Username,
            Password: user.Password,
        };

        const delay = (t) => new Promise(resolve => {
            setTimeout(resolve, t);
        });

        logsStore.addRecord(toString('You posted:', request));

        Promise.resolve(request)
            .then(request => {
                if (user.Title === 'simulate network error')
                    return delay(timeOut).then(() => {
                        return {Auth: networkError};
                    });

                if (process.env.NODE_ENV_GH_PAGES === 'production-gh-pages') {
                    console.warn('It simulates server behavior for gh-pages');

                    return delay(timeOut).then(() => parseData(request));

                } else {
                    return (
                        axios.post('/login', request, {timeout: 2000})
                            .then(response => response.data)
                            .catch(error => {
                                console.log(error);
                                return {Auth: networkError};
                            })
                    );
                }
            })
            .then(data => {
                user.setAuth(data.Auth);

                logsStore.addRecord(
                    data.Auth === networkError
                        ? networkError
                        : toString('Server answered:', data)
                );

                this.setIsLoggingIn(false);
            })
            .catch((error) => {
                console.log(error);
                this.setIsLoggingIn(false);
            });
    };

    getValidationState = () => this.props.user.Auth === 'Denied' ? 'error' : null;

    render = () => (
        <form className="login-form" name="login-form">
            <div className="login-form__title">
                <Glyphicon className="login-form__title--logo" glyph="fire"/>
                <span className="login-form__title--text">Login</span>
            </div>

            <div className="login-form__inputs">
                <FormGroup className="login-form__inputs--username"
                           validationState={this.getValidationState()}>
                    <FormControl
                        className="login-form__inputs--username-input"
                        type="text"
                        value={this.props.user.Username}
                        placeholder="Login"
                        onChange={this.handleChangeLogin}/>
                </FormGroup>

                <FormControl
                    className="login-form__inputs--password-input"
                    type="password"
                    value={this.props.user.Password}
                    placeholder="Password"
                    onChange={this.handleChangePassword}/>
            </div>

            <div className="login-form__button">
                <Button className="login-form__button--login" onClick={this.handleLoggingIn}>
                    {this.isLoggingIn
                        ? <Glyphicon className="login-form__button--login-logging" glyph="cog"/>
                        : <span>Login &rarr;</span>
                    }
                </Button>
            </div>
        </form>
    );
}

export default RenderLoginForm;