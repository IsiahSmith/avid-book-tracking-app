import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
        <button onClick={() => history.push('/homepage')}>Cancel</button>
        <h2>Add a Book</h2>
            <form onSubmit={addNewBook}>
                <input
                    placeholder="Title"
                    type="text"
                    value={newBook.title}
                    onChange={(event) => handlePropertyChange(event, 'title')}
                />
                <input
                    placeholder="Author"
                    type="text"
                    value={newBook.author}
                    onChange={(event) => handlePropertyChange(event, 'author')}
                />
                <input
                    placeholder="Page Count"
                    type="text"
                    value={newBook.page_count}
                    onChange={(event) => handlePropertyChange(event, 'page_count')}
                />
                <button type="submit">SUBMIT</button>
            </form>

        </>
    )
}

export default AddBook;