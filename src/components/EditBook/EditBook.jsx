import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

function EditBook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [updateBook, setUpdateBook] = useState({ title: '', author: '', page_count: '' })
    const { book_id } = useParams();

    //Sets updateBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setUpdateBook({ ...updateBook, [property]: event.target.value })
    };

    //Sends updated book information to the saga
    const runUpdateBook = (event) => {
        event.preventDefault();
        dispatch({ type: 'UPDATE_BOOK', payload: { ...updateBook, book_id } });
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
                <h2>Edit Book</h2>
                <form onSubmit={runUpdateBook}>
                <FormControl
                    sx={{
                        width: '40ch',
                    }}
                >
                    <TextField
                        sx={{ m: 1 }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Title"
                        type="text"
                        value={updateBook.title}
                        onChange={(event) => handlePropertyChange(event, 'title')}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Author"
                        type="text"
                        value={updateBook.author}
                        onChange={(event) => handlePropertyChange(event, 'author')}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        id="outlined-basic"
                        variant="outlined"
                        label="Page Count"
                        type="number"
                        helperText="(How many pages are in the book)"
                        value={updateBook.page_count}
                        onChange={(event) => handlePropertyChange(event, 'page_count')}
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
                            type="submit">SAVE</Button>
                    </Grid>
                </FormControl>
                </form>
            </Grid>
        </>
    )
}

export default EditBook;