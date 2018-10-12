import * as actionTypes from '../actions/actionTypes';
import {Map} from 'immutable';

const initialState = Map({
    show: false,
    modalData: Map({
        header: null,
        body: null,
        additionalStyle: null
    }),
    style: 'normal'
});

const modalOpen = (state, action) => {
    return state.merge({
        show: true,
        modalData: Map({
            header: action.data.header,
            body: action.data.body,
            additionalStyle: action.data.additionalStyle
        }),
        style: action.style
    });
};

const modalClose = (state, action) => {
    return state.merge({
        show: false,
        modalData: Map({
            header: null,
            body: null
        }),
        style: 'normal'
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MODAL_CLOSE: return modalClose(state, action);
        case actionTypes.MODAL_OPEN: return modalOpen(state, action);
        default: return state;
    }
};

export default reducer;