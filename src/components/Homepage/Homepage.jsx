import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);


    console.log('progress is', progress);
    return (
        <>
        <h2>Currently Reading</h2>
            {books.length > 0 ? <div> 
               {books.map((book) => (
                <div key={book.id}>
                    <div>{book.title}, by {book.author} 
                    <button onClick={() => history.push(`/edit/${book.id}`)}>EDIT</button>
                    <button onClick={() => history.push(`/update/${book.id}`)}>UPDATE PROGRESS</button>
                    <button onClick={() => history.push(`/complete/${book.id}`)}>COMPLETE</button>
                    </div>
                </div>
            ))}
            </div> : <p> You're not tracking any books yet! Click 'ADD BOOK' to get started!</p>}
            <button onClick={() => history.push('/addbook')}>ADD BOOK</button>
        </>
    );
}

// this allows us to use <App /> in index.js
export default HomePage;