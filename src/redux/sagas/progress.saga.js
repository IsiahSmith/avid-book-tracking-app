import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

//saga POST to server
function* addProgress(action) {
    try {
        yield axios.post('/api/books/progress', action.payload)
    } catch (err) {
        console.log('POST ERROR IN PROGRESS SAGA', err);
    }
};

//watching for add progress to be called
function* progressSaga() {
    yield takeLatest('ADD_PROGRESS', addProgress);
} 


export default progressSaga;