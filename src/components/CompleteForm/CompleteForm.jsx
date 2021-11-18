import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function CompleteForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const books = useSelector(store => store.books);
    const { book_id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
    }, []);
    
    let selectedBook = books.filter(book => book.id == book_id);
    selectedBook = selectedBook[0]

    const [readingSession, setReadingSession] = useState({ date: '', duration: '', page: selectedBook.page_count});
    const [rating, setRating] = useState('');

    //Sets newBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setReadingSession({ ...readingSession, [property]: event.target.value })
    };

    //Sends new book to the saga
    const addReadingSession = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PROGRESS', payload: { ...readingSession, book_id } });
        dispatch({ type: 'UPDATE_RATING', payload: {rating, book_id} });
        history.push('/homepage');
    };

    console.log('books', books);
    console.log('selectedBook', selectedBook);
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
                    placeholder="Rating"
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