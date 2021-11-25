import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddBook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newBook, setNewBook] = useState({ title: '', author: '', page_count: '' })

    //Sets newBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setNewBook({...newBook, [property]: event.target.value})
    };

    //Sends new book to the saga
    const addNewBook = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_BOOK', payload: newBook});
        history.push('/homepage');
    };

    return (
        <>
        <Button variant='contained' onClick={() => history.push('/homepage')}>Cancel</Button>
        <h2>Add a Book</h2>
            <form onSubmit={addNewBook}>
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Title"
                    type="text"
                    value={newBook.title}
                    onChange={(event) => handlePropertyChange(event, 'title')}
                />
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Author"
                    type="text"
                    value={newBook.author}
                    onChange={(event) => handlePropertyChange(event, 'author')}
                />
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Page Count"
                    type="text"
                    value={newBook.page_count}
                    onChange={(event) => handlePropertyChange(event, 'page_count')}
                />
                <Button variant='contained' type="submit">SUBMIT</Button>
            </form>

        </>
    )
}

export default AddBook;