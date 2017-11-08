import React, {Component} from 'react';
import {observable, computed, action} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import axios from 'axios';

import {FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';

import './login-form.scss';

@observer
class RenderLoginForm extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    @observable isLogging = false;

    @action.bound
    handleChangeLogin(e) {
        this.props.user.Username = e.target.value;
    };

    @action.bound
    handleChangePassword(e) {
        this.props.user.Password = e.target.value;
    };

    @action.bound
    setIsLogging(bool) {
        this.isLogging = bool;
    }

    handleLogging = () => {
        this.setIsLogging(true);

        const reqData = {
            Username: this.props.user.Username,
            Password: this.props.user.Password
        };

        axios.post('http://localhost:8080/login', reqData)
        // axios.post('http://localhost:8080/login', JSON.stringify(reqData))
            .then(response => response.data)
            .then(data => {
                this.setIsLogging(false);
                this.props.user.setAuth(data.Auth);
            })
            .catch((error) => {
                this.setIsLogging(false);
                this.props.user.setAuth('Network Error');

                if (process.env.NODE_ENV !== 'production') {
                    console.log(error);
                }
            });

        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://localhost:8080/login', true);
        // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //
        // const data = JSON.stringify(this.currentUser);
        //
        // xhr.send(data);
        // if (process.env.NODE_ENV !== 'production') {
        //     console.log("__" + data + "__");
        // }
        //
        // if (xhr.status !== 200) {
        //     console.log('1. ' + xhr.status + ': ' + xhr.statusText);
        // } else {
        //     console.log('2. ' + xhr.responseText);
        // }

        // const checkStatus = (response) => {
        //     if (response.status >= 200 && response.status < 300) return response;
        //
        //     const error = new Error(response.statusText);
        //     error.response = response;
        //     throw error;
        // };
        //
        // const parseJSON = (response) => response.json();
        //
        // fetch('http://localhost:8090/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     mode: "no-cors",
        //     body: JSON.stringify(this.currentUser)
        // })
        //     .then(checkStatus)
        //     .then(parseJSON)
        //     .then(function (data) {
        //         console.log('request succeeded with JSON response', data);
        //     })
        //     .catch(function (error) {
        //         console.log('request failed', error);
        //     });
    };

    getValidationState() {
        return this.props.user.Auth === 'Denied' ? 'error' : null;
    }

    render() {
        return (
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
                    <Button className="login-form__button--login" onClick={this.handleLogging}>
                        {this.isLogging
                            ? <Glyphicon className="login-form__button--login-logging" glyph="cog"/>
                            : <span>Login &rarr;</span>
                        }
                    </Button>
                </div>
            </form>
        );
    }
}

export default RenderLoginForm;