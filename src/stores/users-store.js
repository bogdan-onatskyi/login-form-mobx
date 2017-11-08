import {observable, action} from 'mobx';

class User {
    @observable Username = '';
    @observable Password = '';
    @observable Auth = '';

    constructor(username, password, auth = '') {
        this.setupUser(username, password, auth);
    };

    @action.bound
    setupUser(username, password, auth = '') {
        this.Username = username;
        this.Password = password;
        this.Auth = auth;
    };

    @action.bound
    setAuth(auth) {
        this.Auth = auth;
    }
}

class UsersStore {
    Users = [
        new User('User', 'Password', ''),
        new User('foo', 'bar', ''),
        new User('', '', '')
    ];
}

export default UsersStore;