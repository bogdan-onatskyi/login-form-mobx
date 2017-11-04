import React from 'react';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import Header from '../header/header';
import MainView from '../main-view/main-view';
import Footer from '../footer/footer';

import LoginStore from '../../stores/login-store';

import './app.scss';

useStrict(true);

const loginStore = new LoginStore();
const stores = {loginStore};

const Index = () => (
    <Provider {...stores}>
        <div className="app">
            <Header text="Заголовок"/>
            <MainView/>
            <Footer/>
        </div>
    </Provider>
);

export default Index;
