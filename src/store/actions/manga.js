import * as actionTypes from './actionTypes';

export const mangaInsertSaga = (manga, token) => {
    return {
        type: actionTypes.MANGA_INSERT_SAGA,
        manga,
        token
    };
};

export const mangaLoading = () => {
    return {
        type: actionTypes.MANGA_LOADING
    }
};

export const mangaDoneLoading = () => {
    return {
        type: actionTypes.MANGA_DONE_LOADING
    }
};

export const mangaSearchSaga = (query, page, token, searchType, currentPage) => {
    return {
        type: actionTypes.MANGA_SEARCH_SAGA,
        query,
        page,
        token,
        searchType,
        currentPage
    }
};

export const mangaSearch = (items, pageInfo, search, searchType) => {
    return {
        type: actionTypes.MANGA_SEARCH,
        items,
        pageInfo,
        search,
        searchType
    }
};

export const mangaUpdateSaga = (data) => {
    return {
        type: actionTypes.MANGA_UPDATE_SAGA,
        data
    }
};

export const mangaUpdate = (item) => {
    return {
        type: actionTypes.MANGA_UPDATE,
        item
    }
};

export const mangaClear = () => {
    return {
        type: actionTypes.MANGA_CLEAR
    }
};
