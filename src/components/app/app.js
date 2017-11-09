import React from 'react';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import Header from '../header/header';
import MainView from '../main-view/main-view';
import Footer from '../footer/footer';

import usersStore from '../../stores/users-store';
import logsStore from "../../stores/logs-store";

import './app.scss';

useStrict(true);

const stores = {usersStore, logsStore};

const Index = () => (
    <Provider {...stores}>
        <div className="app">
            <Header text="Simple MobX Login form"/>
            <MainView/>
            <Footer/>
        </div>
    </Provider>
);

export default Index;
