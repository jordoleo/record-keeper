import * as actionTypes from './actionTypes';

export const authLoginSaga = (loginData) => {
    return {
        type: actionTypes.AUTH_LOGIN_SAGA,
        loginData
    };
};

export const authRegisterSaga = (registerData) => {
    return {
        type: actionTypes.AUTH_REGISTER_SAGA,
        registerData
    };
};

export const authSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    };
};

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const authLoading = () => {
    return {
        type: actionTypes.AUTH_LOADING
    }
};

export const authInitSaga = () => {
    return {
        type: actionTypes.AUTH_INIT_SAGA
    }
};

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
};

export const authErrorClear = () => {
    return {
        type: actionTypes.AUTH_ERROR_CLEAR
    }
};
