import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

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

    const [readingSession, setReadingSession] = useState({ date: '', duration: '', page: selectedBook.page_count });
    const [rating, setRating] = useState('');

    //Sets newBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setReadingSession({ ...readingSession, [property]: event.target.value })
    };

    //Sends new book to the saga
    const addReadingSession = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PROGRESS', payload: { ...readingSession, book_id } });
        dispatch({ type: 'UPDATE_RATING', payload: { rating, book_id } });
        history.push('/homepage');
    };

    console.log('books', books);
    console.log('selectedBook', selectedBook);
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '30vh' }}
            >
                <h2>Final Entry</h2>
                <form onSubmit={addReadingSession}>
                    <FormControl
                        sx={{
                            width: '40ch',
                        }}
                    >
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            type="date"
                            helperText="(Day you finished the book)"
                            value={readingSession.date}
                            onChange={(event) => handlePropertyChange(event, 'date')}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            label="Duration"
                            type="number"
                            helperText="(How long you read for [hours])"
                            value={readingSession.duration}
                            onChange={(event) => handlePropertyChange(event, 'duration')}
                        />
                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <p>Rate the Book: </p>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event) => setRating(event.target.value)}
                            />
                        </Grid>
                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Button
                                variant='contained'
                                sx={{
                                    m: .5,
                                    width: '21ch',
                                }}
                                onClick={() => history.push('/homepage')}>Cancel</Button>
                            <Button
                                variant='contained'
                                sx={{
                                    m: .5,
                                    width: '21ch',
                                }}
                                type="submit">COMPLETE</Button>
                        </Grid>
                    </FormControl>
                </form>
            </Grid>
        </>
    )
}

export default CompleteForm;