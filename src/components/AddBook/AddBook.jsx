import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

function AddBook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newBook, setNewBook] = useState({ title: '', author: '', page_count: '' })

    //Sets newBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setNewBook({ ...newBook, [property]: event.target.value })
    };

    //Sends new book to the saga
    const addNewBook = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_BOOK', payload: newBook });
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
                <h2 onClick={() => setNewBook({ title: 'The Catcher in the Rie', author: 'J. D. Salinger', page_count: '277' })}>Add a Book</h2>
                <form onSubmit={addNewBook}>
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
                            value={newBook.title}
                            onChange={(event) => handlePropertyChange(event, 'title')}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            label="Author"
                            type="text"
                            value={newBook.author}
                            onChange={(event) => handlePropertyChange(event, 'author')}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            label="Page Count"
                            type="number"
                            helperText="(How many pages are in the book)"
                            value={newBook.page_count}
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
                                type="submit">ADD</Button>
                        </Grid>
                    </FormControl>
                </form>
            </Grid>
        </>
    )
}

export default AddBook;