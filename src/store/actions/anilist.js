import * as actionTypes from './actionTypes';

export const anilistSearchSaga = (search, perPage, searchType) => {
    return {
        type: actionTypes.ANILIST_SEARCH_SAGA,
        search,
        perPage,
        searchType
    };
};

export const anilistSearch = (result, pageInfo, search, searchType) => {
    return {
        type: actionTypes.ANILIST_SEARCH,
        result,
        pageInfo,
        search,
        searchType
    }
};

export const anilistLoading = () => {
    return {
        type: actionTypes.ANILIST_LOADING
    }
};

export const anilistSearchNextPageSaga = (currentPage, search, perPage, searchType) => {
    return {
        type: actionTypes.ANILIST_SEARCH_NEXT_PAGE_SAGA,
        page: currentPage + 1,
        search,
        perPage,
        searchType
    };
};

export const anilistSearchNextPage = (result, pageInfo, search, searchType) => {
    return {
        type: actionTypes.ANILIST_SEARCH_NEXT_PAGE,
        result,
        pageInfo,
        search,
        searchType
    };
};

export const anilistClearSearch = () => {
    return {
        type: actionTypes.ANILIST_CLEAR_SEARCH
    };
};