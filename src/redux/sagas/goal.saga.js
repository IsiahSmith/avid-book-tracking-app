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

export default goalSaga;