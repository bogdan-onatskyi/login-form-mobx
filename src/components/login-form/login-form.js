import React, {Component} from 'react';
import {FormControl, Button, Glyphicon} from 'react-bootstrap';
import {observable, computed, action} from 'mobx';
import {inject, observer} from 'mobx-react';

import './login-form.scss';

// todo: May be DO NOT use inject (use <LoginForm loginStore={loginStore}/> instead)
@inject("loginStore") @observer
class LoginForm extends Component {

    @observable isLogging = false;
    @observable currentUsername = this.props.loginStore.Username;
    @observable currentPassword = this.props.loginStore.Password;

    @computed
    get currentUser() {
        return {
            Username: this.currentUsername,
            Password: this.currentPassword
        };
    }

    @action.bound
    handleChangeLogin(e) {
        this.currentUsername = e.target.value;
    };

    @action.bound
    handleChangePassword(e) {
        this.currentPassword = e.target.value;
    };

    @action.bound
    setIsLogging() {
        if (process.env.NODE_ENV !== 'production') {
            console.log('1');
        }
        this.isLogging = true;
    }

    @action.bound
    unsetIsLogging() {
        if (process.env.NODE_ENV !== 'production') {
            console.log('2');
        }
        this.isLogging = false;
    }

    handleLogging = () => {
        this.setIsLogging();
        setTimeout(this.unsetIsLogging, 1000);

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


        const checkStatus = (response) => {
            if (response.status >= 200 && response.status < 300) return response;

            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        };

        const parseJSON = (response) => response.json();

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "no-cors",
            body: JSON.stringify(this.currentUser)
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                console.log('request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('request failed', error);
            });
    };

    render() {
        return (
            <form className="login-form" name="login-form">
                <div className="login-form__title">
                    <Glyphicon className="login-form__title--logo" glyph="fire"/>
                    <span className="login-form__title--text">Login</span>
                </div>

                <div className="login-form__input">
                    <FormControl
                        className="login-form__input--login"
                        type="text"
                        value={this.currentUsername}
                        placeholder="Login"
                        onChange={this.handleChangeLogin}
                    />
                    <FormControl
                        className="login-form__input--password"
                        type="password"
                        value={this.currentPassword}
                        placeholder="Password"
                        onChange={this.handleChangePassword}
                    />
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

export default LoginForm;