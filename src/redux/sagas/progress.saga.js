import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchProgress() {
    try {
        const response = yield axios.get('/api/books/progress')
        yield put({ type: 'SET_PROGRESS', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN PROGRESS SAGA', err);
    }
};

//saga POST to server
function* addProgress(action) {
    try {
        yield axios.post('/api/books/progress', action.payload)
        yield put({ type: 'FETCH_PROGRESS' })
    } catch (err) {
        console.log('POST ERROR IN PROGRESS SAGA', err);
    }
};

//watching for add progress to be called
function* progressSaga() {
    yield takeLatest('FETCH_PROGRESS', fetchProgress);
    yield takeLatest('ADD_PROGRESS', addProgress);
} 


export default progressSaga;