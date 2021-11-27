import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

function UpdateProgress() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [readingSession, setReadingSession] = useState({ date: '', duration: '', page: '' });
    const { book_id } = useParams();

    //Sets readingSession local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setReadingSession({ ...readingSession, [property]: event.target.value })
    };

    //Sends reading session to the saga
    const addReadingSession = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PROGRESS', payload: { ...readingSession, book_id } });
        history.push('/homepage');
    };

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
                <h2>Update Progress</h2>
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
                            helperText="Day you read on"
                            value={readingSession.date}
                            onChange={(event) => handlePropertyChange(event, 'date')}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            label="Duration"
                            type="number"
                            helperText="How long you read for (hours)"
                            value={readingSession.duration}
                            onChange={(event) => handlePropertyChange(event, 'duration')}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            label="Page"
                            type="number"
                            helperText="Page number you finished on"
                            value={readingSession.page}
                            onChange={(event) => handlePropertyChange(event, 'page')}
                        />
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
                                type="submit">UPDATE</Button>
                        </Grid>
                    </FormControl>
                </form>
            </Grid>
        </>
    )
}

export default UpdateProgress;