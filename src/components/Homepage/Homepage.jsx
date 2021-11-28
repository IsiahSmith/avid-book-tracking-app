import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

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
                <h2>Currently Reading</h2>
                {books.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Page#</th>
                            <th>Last Read</th>
                            <th>%Complete</th>
                            <th>Edit</th>
                            <th>Update Progress</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentlyReading.map((book) => {

                            let bookSessions = progressForBook.filter(session => session.book_id === book.id);
                            let recentSession = bookSessions[bookSessions.length - 1];

                            return (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{recentSession ? recentSession.page : <span>---</span>}</td>
                                    <td>{recentSession ? recentSession.date.split('T')[0] : <span>---</span>}</td>
                                    <td>CHANGE THIS</td>
                                    <td><Button variant='outlined' onClick={() => history.push(`/edit/${book.id}`)}>EDIT</Button></td>
                                    <td><Button variant='outlined' onClick={() => history.push(`/update/${book.id}`)}>UPDATE PROGRESS</Button></td>
                                    <td><Button variant='outlined' onClick={() => history.push(`/complete/${book.id}`)}>COMPLETE</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : <p> You're not tracking any books yet! Click 'ADD BOOK' to get started!</p>}
                <Button variant='contained' onClick={() => history.push('/addbook')}>ADD BOOK</Button>
            </Grid>
        </>
    );
}

// this allows us to use <App /> in index.js
export default HomePage;