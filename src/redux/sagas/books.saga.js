import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchBooks() {
    try {
        const response = yield axios.get('/api/books')
        yield put({ type: 'SET_BOOKS', payload: response.data});
    } catch (err) {
        console.log('GET ERROR', err);
    }
};

//sage POST to server
function* addBook(action) {
    try {
        yield axios.post('/api/books', action.payload)
        yield put({ type: 'FETCH_BOOKS' })
    } catch (err) {
        console.log('POST ERROR', err);
    }
};

//watching for functions to be called
function* booksSaga() {
    yield takeLatest('FETCH_BOOKS', fetchBooks);
    yield takeLatest('ADD_BOOK', addBook);
}


export default booksSaga;