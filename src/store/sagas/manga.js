import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios/axios-manga';
import qs from 'querystring';

export function* mangaInsertSaga(action) {
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + action.token
    };
    yield put(actions.mangaLoading());
    try {
        yield axios.post('', action.manga, {
            headers
        });
        const modalData = {
            body: 'The manga is successfully added'
        };
        yield put(actions.modalOpen(modalData, 'success'))
    } catch (e) {
        let modalData = {};
        if(e.response) {
            modalData = {
                body: 'The manga is already on your list'
            };
        } else {
            modalData = {
                body: 'Server Error'
            };
        }
        yield put(actions.modalOpen(modalData, 'danger'))
    } finally {
        yield put(actions.mangaDoneLoading());
    }
}

export function* mangaSearchSaga(action) {
    yield put(actions.mangaLoading());
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + action.token
    };
    const data = {
        query: action.query,
        perPage: action.page,
        type: action.searchType,
        page: action.currentPage
    };
    try {
        const response = yield axios.get('/search?' + qs.stringify(data), {
            headers,
        });
        const pageInfo = {
            currentPage: response.data.current_page,
            hasNextPage: !!response.data.next_page_url
        };
        yield put(actions.mangaSearch(response.data.data, pageInfo, action.query, action.searchType));
    } catch(err) {
        const modalData = {
            body: 'Server Error'
        };
        yield put(actions.modalOpen(modalData, 'danger'))
    } finally {
        yield put(actions.mangaDoneLoading());
    }
}

export function* mangaUpdateSaga(action) {
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer ' + action.data.token
    };
    yield put(actions.modalClose());
    yield put(actions.mangaLoading());
    try {
        const response = yield axios.put('/' + action.data.id, action.data, {
            headers
        });
        yield put(actions.mangaUpdate(response.data));
    } catch(err) {
        const modalData = {
            body: 'Server Error'
        };
        yield put(actions.modalOpen(modalData, 'danger'))

    }
    yield put(actions.mangaDoneLoading());
}