import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UpdateProgress() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [readingSession, setReadingSession] = useState({ date: '', duration: '', page: '' })

    //Sets newBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setReadingSession({...readingSession, [property]: event.target.value})
    };

    //Sends new book to the saga
    const addReadingSession = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PROGRESS', payload: readingSession});
        history.push('/homepage');
    };

    return (
        <>
        <button onClick={() => history.push('/homepage')}>Cancel</button>
        <h2>Update Progress</h2>
            <form onSubmit={addReadingSession}>
                <input
                    placeholder="Date"
                    type="date"
                    value={readingSession.date}
                    onChange={(event) => handlePropertyChange(event, 'date')}
                />
                <input
                    placeholder="Duration"
                    type="number"
                    value={readingSession.duration}
                    onChange={(event) => handlePropertyChange(event, 'duration')}
                />
                <input
                    placeholder="Page"
                    type="number"
                    value={readingSession.page}
                    onChange={(event) => handlePropertyChange(event, 'page')}
                />
                <button type="submit">UPDATE</button>
            </form>

        </>
    )
}

export default UpdateProgress;