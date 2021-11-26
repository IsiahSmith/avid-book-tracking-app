import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function UpdateProgress() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [readingSession, setReadingSession] = useState({ date: '', duration: '', page: '' });
    const {book_id} = useParams();

    //Sets readingSession local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setReadingSession({...readingSession, [property]: event.target.value})
    };

    //Sends reading session to the saga
    const addReadingSession = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PROGRESS', payload: {...readingSession, book_id}});
        history.push('/homepage');
    };

    return (
        <>
        <Button variant='contained' onClick={() => history.push('/homepage')}>Cancel</Button>
        <h2>Update Progress</h2>
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
                    label="Page"
                    type="number"
                    value={readingSession.page}
                    onChange={(event) => handlePropertyChange(event, 'page')}
                />
                <Button variant='contained' type="submit">UPDATE</Button>
            </form>

        </>
    )
}

export default UpdateProgress;