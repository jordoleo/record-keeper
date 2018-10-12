import * as actionTypes from '../actions/actionTypes';
import {Map} from 'immutable';

const initialState = Map({
    items: Map([]),
    loading: false,
    pageInfo: Map({
        currentPage: 1,
        hasNextPage: false
    }),
    search: '',
    searchType: '',
    detail: {}
});

const anilistSearch = (state, action) => {
    return state.merge({
        items: action.result,
        loading: false,
        pageInfo: action.pageInfo,
        search: action.search,
        searchType: action.searchType
    });
};

const anilistLoading = (state, action) => {
    return state.set('loading', true);
};

const anilistSearchNextPage = (state, action) => {
    const items = state.get('items').toArray();
    return state.merge({
        items: items.concat(action.result),
        loading: false,
        pageInfo: action.pageInfo,
        search: action.search
    });
};

const anilistClearSearch = (state, action) => {
    return state.merge({
        items: Map([]),
        loading: false,
        pageInfo: Map({
            currentPage: 1,
            hasNextPage: false
        }),
        search: ''
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ANILIST_SEARCH: return anilistSearch(state, action);
        case actionTypes.ANILIST_LOADING: return anilistLoading(state, action);
        case actionTypes.ANILIST_SEARCH_NEXT_PAGE: return anilistSearchNextPage(state, action);
        case actionTypes.ANILIST_CLEAR_SEARCH: return anilistClearSearch(state, action);
        default: return state;
    }
};

export default reducer;