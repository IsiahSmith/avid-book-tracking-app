import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Collection() {
    const dispatch = useDispatch();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    let completedBooks = books.filter(book => book.rating > 0);
    let progressForBook = progress.filter(session => session.rating > 0);

    return (
        <div>
            <h2>Collection</h2>
            {completedBooks.map((book) => {

                let completedBookSessions = progressForBook.filter(session => session.book_id === book.id);
                let finalSession = completedBookSessions[completedBookSessions.length - 1];

                return (
                    <div key={book.id}>
                        <div>{book.title}, by {book.author} || <span>Rating: {book.rating}</span>
                            <button onClick={() => dispatch({ type: "DELETE_BOOK", payload: book })}>DELETE</button>
                        </div>
                        <div>
                            <p>Read Book in -total hours-</p>
                            <p>Finished on {finalSession.date.split('T')[0]}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default Collection;