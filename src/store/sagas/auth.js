import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios/axios-auth';

export function* authRegisterSaga(action) {
    yield put(actions.authLoading());
    const registerData = action.registerData;
    try {
        yield axios.post('/register', registerData);
        // const token = response.data.success.token;
        yield put(actions.authRegisterSuccess());
    } catch(error) {
        let message = 'Server error';
        if(error.response) {
            message = 'Email has been taken';
        } else if(error.response.status === 401) {
            message = 'Wrong Password';
        }
        yield put(actions.authError(message));
    }
}

export function* authLoginSaga(action) {
    yield put(actions.authLoading());
    const loginData = action.loginData;
    try {
        const response = yield axios.post('/login', loginData);
        const token = response.data.success.token;
        yield put(actions.authSuccess(token));
    } catch(error) {
        let message = 'Server error';
        if(error.response.status === 422) {
            message = 'Email does not exists';
        } else if(error.response.status === 401) {
            message = 'Wrong Password or Unverified Account';
        }
        yield put(actions.authError(message));
    }
}

export function* authInitSaga(action) {
    yield put(actions.authLoading());
    const token = yield localStorage.getItem('token');
    if(token) {
        yield put(actions.authSuccess(token));
    } else {
        yield put(actions.authLogout());
    }

}