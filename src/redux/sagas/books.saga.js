import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchBooks() {
    try {
        const response = yield axios.get('/api/books')
        yield put({ type: 'SET_BOOKS', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN BOOKS SAGA', err);
    }
};

//saga POST to server
function* addBook(action) {
    try {
        yield axios.post('/api/books', action.payload)
        yield put({ type: 'FETCH_BOOKS' });
    } catch (err) {
        console.log('POST ERROR IN BOOKS SAGA', err);
    }
};

//saga PUT to server for book title, author, and page count
function* updateBook(action) {
    try {
        yield axios.put(`/api/books/${action.payload.book_id}`, action.payload)
        yield put({ type: 'FETCH_BOOKS' });
    } catch (err) {
        console.log('PUT ERROR IN SAGA', err);
    }
}

//saga PUT to server for book rating
function* updateRating(action) {
    try {
        yield axios.put(`/api/books/rating/${action.payload.book_id}`, action.payload)
        yield put({ type: 'FETCH_BOOKS' });
    } catch (err) {
        console.log('PUT ERROR IN SAGA', err);
    }
}

//saga DELETE to server, deletes book from database
function* deleteRating(action) {
    try {
        yield axios.delete(`/api/books/${action.payload.id}`);
        yield put({ type: 'FETCH_BOOKS' })
    } catch (err) {
        console.log('DELETE ERROR IN SAGA', err);
    }
}

//watching for functions to be called
function* booksSaga() {
    yield takeLatest('FETCH_BOOKS', fetchBooks);
    yield takeLatest('ADD_BOOK', addBook);
    yield takeLatest('UPDATE_BOOK', updateBook);
    yield takeLatest('UPDATE_RATING', updateRating);
    yield takeLatest('DELETE_BOOK', deleteRating);
}


export default booksSaga;