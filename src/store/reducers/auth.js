import * as actionTypes from '../actions/actionTypes';
import {Map} from 'immutable';

const initialState = Map({
    token: null,
    error: null,
    loading: false,
    details: {},
    message: null
});

const authSuccess = (state, action) => {
    return state.merge({
        token: action.token,
        loading: false
    });
};

const authError = (state, action) => {
    return state.merge({
        error: action.error,
        loading: false,
        message: null
    });
};

const authLogout = (state, action) => {
    return state.merge({
        token: null,
        loading: false
    });
};

const authLoading = (state, action) => {
    return state.merge({
        loading: true,
        error: null,
        message: null
    });
};

const authErrorClear = (state, action) => {
    return state.merge({
        error: null,
        message: null
    });
};

const authRegisterSuccess = (state, action) => {
    return state.merge({
        loading: false,
        message: "Register Success! Please verify your email first"
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_ERROR: return authError(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_LOADING: return authLoading(state, action);
        case actionTypes.AUTH_ERROR_CLEAR: return authErrorClear(state, action);
        case actionTypes.AUTH_REGISTER_SUCCESS: return authRegisterSuccess(state, action);
        default: return state;
    }
};

export default reducer;