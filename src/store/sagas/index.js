import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {
    authLoginSaga,
    authRegisterSaga,
    authInitSaga
} from './auth';
import {
    anilistSearchSaga,
    anilistSearchNextPageSaga,
} from './anilist'
import {
    mangaInsertSaga,
    mangaSearchSaga,
    mangaUpdateSaga
} from './manga'

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INIT_SAGA, authInitSaga);
    yield takeEvery(actionTypes.AUTH_REGISTER_SAGA, authRegisterSaga);
    yield takeEvery(actionTypes.AUTH_LOGIN_SAGA, authLoginSaga);
}
export function* watchAnilist() {
    yield takeEvery(actionTypes.ANILIST_SEARCH_SAGA, anilistSearchSaga);
    yield takeEvery(actionTypes.ANILIST_SEARCH_NEXT_PAGE_SAGA, anilistSearchNextPageSaga);
}

export function* watchManga() {
    yield takeEvery(actionTypes.MANGA_INSERT_SAGA, mangaInsertSaga);
    yield takeEvery(actionTypes.MANGA_SEARCH_SAGA, mangaSearchSaga);
    yield takeEvery(actionTypes.MANGA_UPDATE_SAGA, mangaUpdateSaga);
}
