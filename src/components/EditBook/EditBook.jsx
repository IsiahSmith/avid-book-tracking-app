import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory, useParams  } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditBook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [updateBook, setUpdateBook] = useState({ title: '', author: '', page_count: '' })
    const {book_id} = useParams();

    //Sets updateBook local state to the passed in inputs
    const handlePropertyChange = (event, property) => {
        setUpdateBook({ ...updateBook, [property]: event.target.value })
    };

    //Sends updated book information to the saga
    const runUpdateBook = (event) => {
        event.preventDefault();
        dispatch({ type: 'UPDATE_BOOK', payload: {...updateBook, book_id }});
        history.push('/homepage');
    };

    return (
        <>
            <Button variant='contained' onClick={() => history.push('/homepage')}>Cancel</Button>
            <h2>Edit Book</h2>
            <form onSubmit={runUpdateBook}>
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Title"
                    type="text"
                    value={updateBook.title}
                    onChange={(event) => handlePropertyChange(event, 'title')}
                />
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Author"
                    type="text"
                    value={updateBook.author}
                    onChange={(event) => handlePropertyChange(event, 'author')}
                />
                <TextField
                    id="outlined-basic" 
                    variant="outlined"
                    label="Page Count"
                    type="number"
                    value={updateBook.page_count}
                    onChange={(event) => handlePropertyChange(event, 'page_count')}
                />
                <Button variant='contained' type="submit">SUBMIT</Button>
            </form>
        </>
    )
}

export default EditBook;