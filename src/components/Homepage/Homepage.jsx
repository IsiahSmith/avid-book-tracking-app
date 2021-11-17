import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const books = useSelector((store) => store.books);

    // Gets all books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
    }, []);


    return (
        <div>
            <h2>Currently Reading</h2>
            {books.map((book) => (
                <div key={book.id}>
                    <div>{book.title}, by {book.author} 
                    <button onClick={() => history.push(`/edit/${book.id}`)}>EDIT</button>
                    <button onClick={() => history.push(`/update/${book.id}`)}>UPDATE PROGRESS</button>
                    <button onClick={() => history.push('/complete')}>COMPLETE</button>
                    </div>
                </div>
            ))}
            <button onClick={() => history.push('/addbook')}>ADD BOOK</button>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default HomePage;