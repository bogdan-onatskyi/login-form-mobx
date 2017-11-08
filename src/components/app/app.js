import React from 'react';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import Header from '../header/header';
import MainView from '../main-view/main-view';
import Footer from '../footer/footer';

import UsersStore from '../../stores/users-store';

import './app.scss';

useStrict(true);

const usersStore = new UsersStore();
const stores = {usersStore};

const Index = () => (
    <Provider {...stores}>
        <div className="app">
            <Header text="Header"/>
            <MainView/>
            <Footer/>
        </div>
    </Provider>
);

export default Index;
