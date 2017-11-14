import React, {Component} from 'react';
import {observable, computed, action} from 'mobx';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';
import {toString} from '../../../utils/utils';

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

        const {logsStore, user} = this.props;
        const reqData = {
            Username: user.Username,
            Password: user.Password
        };

        this.setIsLoggingIn(true);

        logsStore.addRecord(
            toString('You posted:', reqData)
        );

        if (process.env.NODE_ENV === 'production-gh-pages') {
            const {Username, Password} = reqData;

            console.warn('It simulates server behavior for gh-pages');

            setTimeout(() => {
                let data = {
                    Auth: "Denied"
                };

                if (Username === 'User' && Password === 'Password')
                    data = {
                        Auth: "Logged",
                        Language: "EN"
                    };

                if (user.Title === 'simulate network error')
                    data = {
                        Auth: 'Network Error'
                    };

                user.setAuth(data.Auth);

                logsStore.addRecord(
                    user.Title === 'simulate network error'
                        ? 'Network Error'
                        : toString('Server answered:', data)
                );

                this.setIsLoggingIn(false);
            }, 1000);
            return;
        }

        if (process.env.NODE_ENV !== 'production-gh-pages') {
            axios.post('/login', reqData)
                .then(response => response.data)
                .then(data => {
                    if (user.Title === 'simulate network error')
                        data = {
                            Auth: 'Network Error'
                        };

                    user.setAuth(data.Auth);

                    logsStore.addRecord(
                        user.Title === 'simulate network error'
                            ? 'Network Error'
                            : toString('Server answered:', data)
                    );

                    this.setIsLoggingIn(false);
                })
                .catch((error) => {
                    user.setAuth('Network Error');

                    logsStore.addRecord('Network Error');

                    if (process.env.NODE_ENV === 'development') {
                        console.log(error);
                    }

                    this.setIsLoggingIn(false);
                });
        }
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