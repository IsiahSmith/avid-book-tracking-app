import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Material-UI imports
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { Book } from '@mui/icons-material';

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
            {completedBooks.length > 0 ? <div>
                {completedBooks.map((book) => {

                    let completedBookSessions = progressForBook.filter(session => session.book_id === book.id);
                    let finalSession = completedBookSessions[completedBookSessions.length - 1];
                    let sum = 0;
                    for (let i = 0; i < completedBookSessions.length; i++) {
                        sum += Number(completedBookSessions[i].duration)
                    }

                    return (
                        <div key={book.id}>
                            <div>{book.title}, by {book.author} <Rating name="read-only" value={book.rating} readOnly />
                                <Button variant='contained' onClick={() => dispatch({ type: "DELETE_BOOK", payload: book })}>DELETE</Button>
                            </div>
                            <div>
                                <p>Book completed in {sum} hours</p>
                                <p>Finished on {finalSession?.date.split('T')[0]}</p>
                            </div>
                        </div>
                    )
                })}
            </div> : <p>You haven't completed any books yet! Complete a book to see it added here.</p>}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default Collection;