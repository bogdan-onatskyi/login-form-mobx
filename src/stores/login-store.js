import {observable, computed} from 'mobx';

class LoginStore {
    @observable Username = 'foo';
    @observable Password = 'bar';

    @computed
    get user() {
        return {
            Username: this.Username,
            Password: this.Password
        };
    }
}

export default LoginStore;