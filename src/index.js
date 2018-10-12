import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import authReducer from './store/reducers/auth';
import anilistReducer from './store/reducers/anilist';
import mangaReducer from './store/reducers/manga';
import modalReducer from './store/reducers/modal';
import {watchAuth, watchAnilist, watchManga} from './store/sagas/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null || compose;
const mainReducer = combineReducers({
    auth: authReducer,
    anilist: anilistReducer,
    manga: mangaReducer,
    modal: modalReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchAnilist);
sagaMiddleware.run(watchManga);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
