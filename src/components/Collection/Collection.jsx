import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Collection() {
    const dispatch = useDispatch();
    const books = useSelector((store) => store.books);

    // Gets all books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
    }, []);


    return (
        <div>
            <h2>Collection</h2>
            {books.map((book) => (
                <div key={book.id}>
                    <div>{book.title}, by {book.author} || <span>Rating: {book.rating}</span>
                    <button onClick={() => dispatch({ type: "DELETE_BOOK", payload: book })}>DELETE</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default Collection;