import * as actionTypes from '../actions/actionTypes';
import {Map, List} from 'immutable';

const initialState = Map({
    loading: false,
    items: List([]),
    pageInfo: Map({
        currentPage: 1,
        hasNextPage: false
    }),
    search: '',
    searchType: ''
});

const mangaDoneLoading = (state, action) => {
    return state.set('loading', false);
};

const mangaLoading = (state, action) => {
    return state.set('loading', true);
};

const mangaSearch = (state, action) => {
    if(action.pageInfo.currentPage === 1) {
        return state.merge({
            items: action.items,
            search: action.search,
            searchType: action.searchType,
            pageInfo: action.pageInfo
        });
    }
    const newItems = state.get('items').concat(action.items).toJSON();
    return state.merge({
        items: newItems,
        search: action.search,
        searchType: action.searchType,
        pageInfo: action.pageInfo
    });

};

const mangaUpdate = (state, action) => {
    const newItems = state.get('items').toJSON().map(i => {
        return i.id === action.item.id ? action.item : i;
    });
    return state.merge({
        items: newItems
    });
};

const mangaClear = (state, action) => {
    return state.merge({
        items: List([]),
        pageInfo: Map({
            currentPage: 1,
            hasNextPage: false
        }),
        search: '',
        searchType: ''
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MANGA_DONE_LOADING: return mangaDoneLoading(state, action);
        case actionTypes.MANGA_LOADING: return mangaLoading(state, action);
        case actionTypes.MANGA_SEARCH: return mangaSearch(state, action);
        case actionTypes.MANGA_UPDATE: return mangaUpdate(state, action);
        case actionTypes.MANGA_CLEAR: return mangaClear(state, action);
        default: return state;
    }
};

export default reducer;