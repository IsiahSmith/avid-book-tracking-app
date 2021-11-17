import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function CompleteForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const book = useSelector(store => store.progress);
    const [readingSession, setReadingSession] = useState({ date: '', duration: '', page: book.page_count});
    const { book_id } = useParams();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    //Sets newBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setReadingSession({ ...readingSession, [property]: event.target.value })
    };

    //Sends new book to the saga
    const addReadingSession = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PROGRESS', payload: { ...readingSession, book_id } });
        dispatch({ type: 'ADD_RATING', payload: rating });
        history.push('/homepage');
    };

    console.log('book', book);
    return (
        <>
            <button onClick={() => history.push('/homepage')}>Cancel</button>
            <h2>Final Entry</h2>
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
                    placeholder="rating"
                    type="number"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                />
                <button type="submit">UPDATE</button>
            </form>

        </>
    )
}

export default CompleteForm;