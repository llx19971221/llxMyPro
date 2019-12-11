import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import createSagaMiddleware from "redux-saga";
import  rootSaga from "@/sagas";
import "@assets/css/commonpc.less";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
,document.getElementById('root')
);