import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
            <Button variant='contained' onClick={() => history.push('/homepage')}>Cancel</Button>
            <h2>Final Entry</h2>
            <form onSubmit={addReadingSession}>
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    type="date"
                    value={readingSession.date}
                    onChange={(event) => handlePropertyChange(event, 'date')}
                />
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Duration"
                    type="number"
                    value={readingSession.duration}
                    onChange={(event) => handlePropertyChange(event, 'duration')}
                />
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                />
                <Button variant='contained' type="submit">UPDATE</Button>
            </form>

        </>
    )
}

export default CompleteForm;