import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios/axios-anilist';

export function* anilistSearchSaga(action) {
    let type = '';
    if(action.searchType === 'manga') {
        type = ', type: MANGA, format: MANGA';
    } else if(action.searchType === 'anime') {
        type = ', type: ANIME';
    } else if(action.searchType === 'novel') {
        type = ', type: MANGA, format: NOVEL';
    }

    let query = `
            query ($search: String, $perPage: Int) {
                Page(page: 1, perPage: $perPage) {
                    pageInfo {
                        hasNextPage,
                        currentPage
                    }
                    media (search: $search, isAdult: false${type}) {
                        id
                        description
                        averageScore
                        title {
                            romaji
                            english
                            native
                        }
                        genres
                        coverImage {
                            medium
                        }
                        type
                        format
                        status
                        episodes
                        duration
                        chapters
                        volumes
                        startDate {
                            year
                            month
                            day
                        }
                        endDate {
                            year
                            month
                            day
                        }
                    }
                }
            }
        `;
    yield put(actions.anilistLoading());
    const variables = {
        search: action.search,
        perPage: action.perPage
    };
    const data = {
        query,
        variables
    };
    try{
        const response = yield axios.post('/', data);
        yield put(actions.anilistSearch(response.data.data.Page.media, response.data.data.Page.pageInfo, action.search, action.searchType));

    } catch(error) {
        const modalData = {
            body: 'Server Error'
        };
        yield put(actions.modalOpen(modalData, 'danger'))
    }
}

export function* anilistSearchNextPageSaga(action) {
    let type = '';
    if(action.searchType === 'manga') {
        type = ', type: MANGA, format: MANGA';
    } else if(action.searchType === 'anime') {
        type = ', type: ANIME';
    } else if(action.searchType === 'novel') {
        type = ', type: MANGA, format: NOVEL';
    }
    let query = `
            query ($search: String, $perPage: Int, $page: Int) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        hasNextPage,
                        currentPage
                    }
                    media (search: $search, isAdult: false${type}) {
                        id
                        description
                        averageScore
                        title {
                            romaji
                            english
                            native
                        }
                        genres
                        coverImage {
                            medium
                        }
                        type
                        format
                        status
                        episodes
                        duration
                        chapters
                        volumes
                        startDate {
                            year
                            month
                            day
                        }
                        endDate {
                            year
                            month
                            day
                        }
                    }
                }
            }
        `;
    yield put(actions.anilistLoading());
    const variables = {
        search: action.search,
        perPage: action.perPage,
        page: action.page
    };
    const data = {
        query,
        variables
    };
    try{
        const response = yield axios.post('/', data);
        yield put(actions.anilistSearchNextPage(response.data.data.Page.media, response.data.data.Page.pageInfo, action.search));
    } catch(error) {
        const modalData = {
            body: 'Server Error'
        };
        yield put(actions.modalOpen(modalData, 'danger'))
    }
}
