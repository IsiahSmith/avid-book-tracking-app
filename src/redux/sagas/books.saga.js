import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchBooks() {
    try {
        const response = yield axios.get('/api/books')
        yield put({ type: 'SET_BOOKS', payload: response.data});
    } catch (err) {
        yield put({ type: 'FETCH_BOOKS_ERROR' });
        console.log(err);
    }
};

//watching for functions to be called
function* booksSaga() {
    yield takeLatest('FETCH_BOOKS', fetchBooks);
}


export default booksSaga;