import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//saga GET to server
function* fetchGoal() {
    try {
        const response = yield axios.get('/api/goal')
        yield put({ type: 'SET_GOAL', payload: response.data });
    } catch (err) {
        console.log('GET ERROR IN GOAL SAGA', err);
    }
};

//saga POST to server
function* addGoal(action) {
    try {
        yield axios.post('/api/goal', action.payload)
        yield put({ type: 'FETCH_GOAL' });
    } catch (err) {
        console.log('POST ERROR IN GOAL SAGA', err);
    }
};

//watching for functions to be called
function* goalSaga() {
    yield takeLatest('FETCH_GOAL', fetchGoal);
    yield takeLatest('ADD_GOAL', addGoal);
}

export default goalSaga;