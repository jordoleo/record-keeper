import * as actionTypes from './actionTypes';

export const modalOpen = (data, style) => {
    return {
        type: actionTypes.MODAL_OPEN,
        data,
        style
    }
};

export const modalClose = () => {
    return {
        type: actionTypes.MODAL_CLOSE
    }
};
