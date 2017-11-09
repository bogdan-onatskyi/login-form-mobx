import {observable, action} from 'mobx';

class User {
    Title = '';
    @observable Username = '';
    @observable Password = '';
    @observable Auth = '';

    constructor(title, username, password, auth = '') {
        this.setupUser(title, username, password, auth);
    };

    @action.bound
    setupUser(title, username, password, auth = '') {
        this.Title = title;
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
        new User('correct initial data', 'User', 'Password', ''),
        new User('incorrect initial data', 'foo', 'bar', ''),
        new User('without initial data', '', '', ''),
        new User('simulate network error', '', '', '')
    ];
}

const usersStore = new UsersStore();
export default usersStore;