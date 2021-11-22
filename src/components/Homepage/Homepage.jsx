import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all reading sessions and books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    let currentlyReading = books.filter(book => book.rating === null);
    let progressForBook = progress.filter(session => session.rating === null);

    console.log('progress is', progress);
    return (
        <>
            <h2>Currently Reading</h2>
            {books.length > 0 ? <div>
                {currentlyReading.map((book) => {

                    let bookSessions = progressForBook.filter(session => session.book_id === book.id);
                    let recentSession = bookSessions[bookSessions.length-1]

                    return (
                        <div key={book.id}>
                            <div>{book.title}, by {book.author}
                                <button onClick={() => history.push(`/edit/${book.id}`)}>EDIT</button>
                                <button onClick={() => history.push(`/update/${book.id}`)}>UPDATE PROGRESS</button>
                                <button onClick={() => history.push(`/complete/${book.id}`)}>COMPLETE</button>
                            </div>
                            {/* {progressForBook.map((session, i) => (
                            <div key={i}>
                                {session.book_id === book.id ?
                                    <div>
                                        Currently on page {session.page} { }
                                        Last read on {session.date}
                                    </div> : <div>No progress added yet</div>}
                            </div>
                        ))}  */}

                            {/* {progressForBook.filter(session => session.book_id === book.id)} */}
                            {recentSession && <p>minutes read: {recentSession?.duration}</p>}
                        </div>
                    )
                })}
            </div> : <p> You're not tracking any books yet! Click 'ADD BOOK' to get started!</p>}
            <button onClick={() => history.push('/addbook')}>ADD BOOK</button>
        </>
    );
}

// this allows us to use <App /> in index.js
export default HomePage;